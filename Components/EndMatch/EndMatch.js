import React from 'react';
import { Picker, ToastAndroid, ListView, StyleSheet, Text, View, TextInput, Button, Image, Alert, DrawerLayoutAndroid, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import Fuse from 'fuse.js';
import _ from 'lodash';
import Autocomplete from 'react-native-autocomplete-input';
import {inject, observer } from 'mobx-react'
import {observable} from 'mobx'
import Row from '../DumbComponents/Row'
import TouchableRow from '../DumbComponents/TouchableRow'
import HeadingRow from '../DumbComponents/HeadingRow'
import Match from '../../Store/Match'
import { MyPicker } from '../MyPicker';

@inject('store') @observer
class EndMatch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      winner: ''
    }
    this.props.store.playerStore.fetch()
    
  }

  updateScore(key, score) {
      this.props.match.players[key].score = score;
  }

  endMatch() {
    this.props.onMatchEnded(this.props.match.table_id);
    this.props.match.winner = this.state.winner;
    this.props.store.matchStore.endMatch(this.props.match, (error) => {
        if (error != null) {
          ToastAndroid.showWithGravity(
            'Could not update, please try again.',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
    });
  }

  render() {
    return (
    <View style={style.container}>
      <HeadingRow>End Match Match:</HeadingRow>
      <ScrollView style={{width: '100%', height: 600}} keyboardShouldPersistTaps='always'>
      <Picker
        selectedValue={this.state.winner}
        onValueChange={(itemValue, itemPosition) => {
          this.setState({winner: itemValue});
          console.log('this.props.match.winner' )
        }}>
        {
            this.props.match && this.props.match.players.map((_player, key) => (
              <Picker.Item key={_player.id} label={`${_player.name} Won`}   value={_player.id} />
              )
          )
        }
      </Picker>

      
         {
             this.props.match && this.props.match.players.map((player, key) => (
                <View key={key}>
                    <TextInput placeholder={`Enter ${player.name}'s score`} onChangeText={(text) => this.updateScore(key, text) } ></TextInput>
                </View>
             )
            )
         }

        <View style={{margin: 10}} >
          <Button  title="End Match" onPress={ this.endMatch.bind(this) }></Button>
        </View>

         <View style={{margin: 10}} >
          <Button  title="Cancel" onPress={() => this.props.onMatchEnded(this.props.match.table_id) }></Button>
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


export default EndMatch;