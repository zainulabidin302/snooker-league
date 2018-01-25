import React from 'react';
import { DatePickerAndroid,  ToastAndroid, StyleSheet, Text, View, TextInput, Button, Image, Alert, DrawerLayoutAndroid, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import _ from 'lodash';
import {inject, observer } from 'mobx-react'
import {observable} from 'mobx'
import Row from '../DumbComponents/Row'
import TouchableRow from '../DumbComponents/TouchableRow'
import HeadingRow from '../DumbComponents/HeadingRow'
import Match from '../../Store/Match'

@inject('store') @observer
class MatchHistory extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    try {
        const {action, year, month, day} =  DatePickerAndroid.open({
            // Use `new Date()` for current date.
            // May 25 2020. Month 0 is January.
            date: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
            // Selected year, month (0-11), day
        }
    } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
    }
        
    
    return (
    <View style={style.container}>
      <Text>Hello</Text>
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

  }
})


export default MatchHistory;