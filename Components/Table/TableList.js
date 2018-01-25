import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';
import {observer,  inject} from 'mobx-react';
import {observable} from 'mobx';
import TableRow from './TableRow';
import AddPlayersForMatch from './../AddPlayersForMatch/AddPlayersForMatch'
import EndMatch from './../EndMatch/EndMatch'
import _ from 'lodash'
import firebase from 'react-native-firebase'
import TableStore from '../../Store/TableStore'
import Table from '../../Store/Table'

@inject('store') @observer
class TableList extends React.Component {
  @observable addNewMatch = [];
  @observable addEndMatch = [];
  tables;

  constructor(props) {
    super(props)
    this.props.store.matchStore.fetch();
    this.props.store.tableStore.fetch();
    this.tables = this.props.store.tableStore.getTables
  }

  

  onMatchCreated(table_id) {
    let index = _.findIndex(this.addNewMatch, table_id);
    this.addNewMatch.splice(index, 1);
  }
  
  onMatchEnded(table_id) {
    let index = _.findIndex(this.addEndMatch, table_id);
    this.addEndMatch.splice(index, 1);
  }
  


  tableAction(table) {
    switch(table.status) {
      case 'UNAVAILABLE':
        Alert.alert(
          `Table ${table.title}`,
          'The table is currently unavailable for playing.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')},]
        )
      break;

      case 'PLAYING':
        this.addEndMatch.push(table.id);
      break;

      case 'FREE':
        this.addNewMatch.push(table.id);
      break;

    }
  }
  render() {
    let tables = this.props.store.tableStore.getTables
    
    let rows = tables.map((table, idx) => {
      
      let addPlayerForm = null;
      let endPlayerForm = null;
      if (_.includes(this.addNewMatch, table.id)) {
        addPlayerForm = <AddPlayersForMatch onMatchCreated={this.onMatchCreated.bind(this)} table={table} />
      } else if (_.includes(this.addEndMatch, table.id)) {
        endPlayerForm = <EndMatch onMatchEnded={this.onMatchEnded.bind(this)} onCancel={() => this.addEndMatch.splice(table.id, 1) } match={table.Match} />
      }

      return (
        <View key={table.id}>
          <TableRow tableAction={this.tableAction.bind(this)}  table={table} />
          {addPlayerForm}
          {endPlayerForm} 
        </View>
      )
  
    })
    return (<ScrollView keyboardShouldPersistTaps='always' style={{height: 600 }}>{rows}</ScrollView>) 

  }
}


export default TableList;