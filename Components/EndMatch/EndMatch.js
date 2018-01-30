import React from 'react';
// import { CheckBox, Picker, ToastAndroid, ListView, StyleSheet, Text, View,
// TextInput, Button, Image, Alert, DrawerLayoutAndroid, TouchableOpacity,
// TouchableHighlight, ScrollView } from 'react-native';
import {View, Content, Container, ListItem, Text, Body} from 'native-base';
import {inject, observer} from 'mobx-react'
import {observable} from 'mobx'
import moment from 'moment';

import SingleEndMatch from './SingleEndMatch';
import DoubleEndMatch from './DoubleEndMatch';
import CenturyEndMatch from './CenturyEndMatch';

@inject('store') @observer
class EndMatch extends React.Component {
  constructor(props) {
    super(props);
    try {
      this.props.match.frames = this.props.match.frames || 1;
      this.props.match.end_time = this.props.match.end_time || Math.floor(Date.now());
      this.props.match.time_in_mins = this.props.match.time_in_mins || Math.floor(((this.props.match.end_time / 1000) - (this.props.match.start_time / 1000)) / 60)
  } catch (e) {
      console.log ('ending match, ', e)
  }
}

  render() {
    let {type} = this.props.match.match_type;
    let output = null;
    
    if (type == 'single') {
      output = <SingleEndMatch match={this.props.match} onChange={() => this.props.onChange()} />
    } else if (type == 'double') {
      output = <DoubleEndMatch match={this.props.match} onChange={() => this.props.onChange()}  />
    } else if (type == 'century') {
      output = <CenturyEndMatch match={this.props.match} onChange={() => this.props.onChange()} />
    }

    return (
      <Container style={{
        height: 1800
      }}>
        <Content>
          <ListItem itemDivider><Text>End Match</Text></ListItem>
          <ListItem itemDivider><Text>Match Time ({this.props.match.time_in_mins}) mintues</Text></ListItem>
          {output}
        </Content>
      </Container>
    );
  }
}
export default EndMatch;