import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert } from 'react-native';
import {inject, observer } from 'mobx-react'
import {observable} from 'mobx'
import Row from '../DumbComponents/Row'
import HeadingRow from '../DumbComponents/HeadingRow'

import Player from '../../Store/Player'

@inject('store') @observer

class AddPlayer extends React.Component {
  
  @observable player;

  constructor(props) {
    super(props);
    this.props.store.playerStore.fetch()
    this.player = new Player({})
    }
addMore() {
    this.player = new Player({})
}
  addPlayer() {
    
    this.props.store.playerStore.addPlayer(this.player);
    let { navigate } = this.props.navigation;

    Alert.alert(
        `Player added.`,
        '',
        [
            {text: 'Add More', onPress: this.addMore.bind(this)},
            {text: 'Go to Home', onPress: () => navigate('HomePage')},
        ]
      );
  }
  render() {
     let { navigate } = this.props.navigation;
    
    return (
    <View style={style.container}>
      <HeadingRow>Create a Player:</HeadingRow>
        <Row><Text>Phone Number:</Text></Row>
        <TextInput value={this.player.phone} onChangeText={(text) => this.player.phone = text } ></TextInput>

        <Row><Text>Name:</Text></Row>
        <TextInput value={this.player.name} onChangeText={(text) => this.player.name = text } ></TextInput>

        <Row><Text>Date of Birth (yyyy-mm-dd):</Text></Row>
        <TextInput value={this.player.dob} onChangeText={(text) => this.player.dob = text } ></TextInput>
        <View style={{margin: 10}} >
            <Button  title="Add player" onPress={this.addPlayer.bind(this) }></Button>
        </View>

        <View style={{margin: 10}} >
            <Button title="Cancel" style={{margin: 120}} onPress={ () => navigate('HomePage') }></Button>
        </View>
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

export default AddPlayer;