import React from 'react';
import { ListView, StyleSheet, Text, View, TextInput, Button, Image, Alert, DrawerLayoutAndroid, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import Fuse from 'fuse.js';
import _ from 'lodash';
import Autocomplete from 'react-native-autocomplete-input';
import {inject, observer } from 'mobx-react'
import {observable} from 'mobx'
import Row from '../DumbComponents/Row'
import TouchableRow from '../DumbComponents/TouchableRow'

import HeadingRow from '../DumbComponents/HeadingRow'

import Match from '../../Store/Match'
@inject('store') @observer
class AddPlayersForMatch extends React.Component {
  
  @observable query;
  @observable match;

  fuse;
  options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "name",
      "phone",
      "username"
    ]
  };
  constructor(props) {
    super(props);
    this.props.store.playerStore.fetch()
    this.match = new Match({})
  }
 
  createNewMatch() {
    let table_id = this.props.table.id;
    this.match.table_id = table_id;
    this.match.status = 'PLAYING';
    this.props.store.matchStore.addMatch(this.match);
    this.props.onMatchCreated(table_id)
  }

  render() {
     // "list" is the item array
     
     const { players } = this.props.store.playerStore;
     this.fuse = new Fuse(players, this.options);
     let result = this.fuse.search(this.query);
    
    return (
    <View style={style.container}>
      <View style={{margin: 30}} >
        <HeadingRow>Create a Match:</HeadingRow>
      </View>
      <ScrollView style={{width: '100%', height: 600}} keyboardShouldPersistTaps='always'>
        
        <Autocomplete
          style={{padding: 10}}
          placeholder="Select Player 1"
          data={result}
          defaultValue={this.query}
          onChangeText={text => this.query = text }
          renderItem={item => (

            <TouchableRow  onPress={() => {
              this.match.addPlayer(item);
              this.query = '';
            }}>
              <Text >{item.name} - {item.phone}</Text>
            </TouchableRow>
          )}
        />
      <View style={{margin: 20}}>
        {this.match.players.map((_player) => {
          return <Row key={_player.id}  ><Text>{_player.name}</Text></Row>
        })}
      </View>
      
      <View style={{margin: 10}}>
        <Button  title="Start Match" onPress={this.createNewMatch.bind(this) }></Button>
      </View>
      <View style={{margin: 10}}>
        <Button  title="Cancel" onPress={() => this.props.onMatchCreated(this.props.table.id) }></Button>
      </View>

    </ScrollView>

     
    </View>
    );
  }
}


const style = StyleSheet.create({
  container: {
    width: '100%', 
    display: 'flex',
    flexDirection: 'column',
    padding: 10,

  },

  tableText: {
    textAlign: 'center'
  },
})

export default AddPlayersForMatch;