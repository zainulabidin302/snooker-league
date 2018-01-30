import React from 'react';
// import { ListView, StyleSheet, Text, View, TextInput, Button, Image, Alert,
// DrawerLayoutAndroid, TouchableOpacity, TouchableHighlight, ScrollView } from
// 'react-native';
import {
  Container,
  Content,
  Text,
  ListItem,
  Right,
  Radio,
  Body,
  Button,
  Left,
  Toast
} from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import {inject, observer} from 'mobx-react'
import {observable} from 'mobx'
import Fuse from 'fuse.js';
import _ from 'lodash';

import Match from '../../Store/Match'
import MatchTypeSelector from './MatchTypeSelector';
import SingleSelection from './SingleSelection';
import DoubleSelection from './DoubleSelection';
import CenturySelection from './CenturySelection';

@inject('store')@observer
class AddPlayersForMatch extends React.Component {

  @observable match;
  @observable players = [];

  match_types = [];
  constructor(props) {
    super(props);
    this.match = new Match({});

    _.each(this.props.store.config.match_types, type => {
      this
        .match_types
        .push(type);
    });

    let selector = null;
    this.state = {
      'type': 0,
      'players': [],
      'teams': []
    }
  }

  createNewMatch() {

    let {type} = this.state;
    let {table} = this.props;
    
    this.match.table = table;
    this.match.club_id = this.props.store.currentUser.user.uid;
    this.match.status = 'PLAYING';
    this.match.start_time = Date.now()
    this
      .match
      .setMatchType(this.match_types[type]);
    console.log(this.state.players)
    if (this.match.match_type.type == 'single') {
      if (this.state.players.length < 2 || this.state.players.length > 2) {
        Toast.show({text: 'Atleast Two players should be added .', position: 'top', buttonText: 'Ok'});
        return;
      }
      this.match.players = this.state.players;

    } else if (this.match.match_type.type == 'double') {

      let player_lengths = this
        .state
        .teams
        .map((_team) => _team.players.length);

      if (player_lengths[0] == player_lengths[1] && player_lengths[1] == 2) {
        this.match.teams = this.state.teams.map(team => {return {players: team.players}});
      } else {
        Toast.show({text: 'Atleast Two players should be added for each team.', position: 'top', buttonText: 'Ok'});
        return;
      }

    } else if (this.match.match_type.type == 'century') {
      console.log('i am in century', this.state.players)
      if (this.state.players.length < 2) {
        Toast.show({text: 'Atleast two players should be added.', position: 'top', buttonText: 'Ok'});
        return;
      }
      this.match.players = this.state.players;
    } else {
      console.log('For some bad reason I have no match TYPE, please correct me!!! AddPlayersForMatc' +
          'h.js')
    }

    this
      .props
      .store
      .matchStore
      .addMatch(this.match, (e) => {
         
  
      });

      this
      .props
      .onChange()

    }
  render() {
    // "list" is the item array

    if (this.match_types[this.state.type] == 'single') {
      selector = <SingleSelection onChange={(players) => this.setState({players})}/>
    } else if (this.match_types[this.state.type] == 'double') {
      selector = <DoubleSelection onChange={(teams) => this.setState({teams})}/>
    } else {
      selector = <CenturySelection onChange={(players) => this.setState({players})}/>
    }

    return (
      <Container style={{
        height: 900
      }}>
        <Content itemDivider>
          <ListItem >
            <Text>
              Match Type:
            </Text>
          </ListItem>
          <MatchTypeSelector
            types={this.match_types}
            onChange={(id) => this.setState({type: id})}/>
          <ListItem itemDivider>
            <Text>
              Select Players:
            </Text>
          </ListItem>
          {selector}
          <ListItem>
            <Left>
              <Button onPress={() => this.createNewMatch()}>
                <Text>Add Match</Text>
              </Button>
            </Left>
            <Body>

              <Button onPress={() => this.props.onChange()}>
                <Text>Cancel Match</Text>
              </Button>
            </Body>
          </ListItem>
        </Content>
      </Container>
    )
  }
}

export default AddPlayersForMatch;