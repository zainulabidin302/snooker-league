import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';



export default class Home extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      tables: [{
        id: 1,
        title: 'One',
        status: 'UNAVAILABLE'
      }, {
        id: 2,
        title: 'Two',
        status: 'PLAYING',
        players: [{
          name: 'Saad khan',
          id  : 13234,
          mobile: '03009597001'
        },
        {
          name: 'Hassan ALi',
          id  : 13234,
          mobile: '03009597002'
        }]
      }, {
        id: 3,
        title: 'Three',
        status: 'FREE'
      }]
    }  

  }
  status = ['UNAVAILABLE', 'PLAYING', 'FREE'];
  static navigationOptions = {
    title: 'Home'
  }    

  tableAction(table) {
    console.log(table)
    switch(table.status) {
      case 'UNAVAILABLE':
        Alert.alert(
          `Table ${table.title}`,
          'The table is currently unavailable for playing.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')},]
        )
      break;

      case 'PLAYING':
        
        players_text = table.players.map((player) => player.name ).join(' vs ')
        Alert.alert(
          `Table ${table.title}`,
          `${players_text}`,
          [{text: 'End Match', onPress: () => {

            tableId = this.state.tables.findIndex((_table) => table.id == _table.id)

            this.setState(prevState => {
              prevState.tables[tableId].status = 'FREE'
              return prevState;
            })


          }},]
        )
        
       
      break;

      case 'FREE':

        Alert.alert(
          `Table ${table.title}`,
          `Create a match`,
          [{text: 'Add Players', onPress: () => { this.props.navigation.navigate('AddPlayersForMatchPage', {table: table}) }},
          {text: 'Cancel', onPress: () => console.log('OK Pressed')},]
        )
      break;

    }
  }
  render() {
    const { navigate } = this.props.navigation;

    
   

    return (
      <View style={styles.poolGrid}>
        {
          this.state.tables.map((table) => {
            
            let vs_txt = '';
            if (table.status == 'PLAYING') {
              vs_txt = <Text>{ table.players.map((player) => player.name ).join(' vs ') }</Text>
            }

            return <View key={table.id} style={styles.tableView}>
              
              <Text onPress={() => {this.tableAction(table)} }  style={styles.tableText} > {table.title} - {vs_txt} - {table.status} </Text>
              
              
            </View>
          })
        }        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    display: 'flex',
    justifyContent: 'center'
  },
  
  tableView: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    
    borderBottomWidth: 2,
    borderBottomColor: '#eee' 

  },
  tableText: {
    textAlign: 'center'
  },
});
