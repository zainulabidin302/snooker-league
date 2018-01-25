import React from 'react';
import { DatePickerAndroid,  ToastAndroid, StyleSheet, Text, View, TextInput, Button, Image, Alert, DrawerLayoutAndroid, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import _ from 'lodash';
import {inject, observer } from 'mobx-react'
import {observable} from 'mobx'
import Row from '../DumbComponents/Row'
import TouchableRow from '../DumbComponents/TouchableRow'
import HeadingRow from '../DumbComponents/HeadingRow'
import Match from '../../Store/Match'
import { MKButton } from 'react-native-material-kit';



@inject('store') @observer
class MatchHistory extends React.Component {
  @observable date;
  once = false;
  constructor(props) {
  super(props);
  }

  async datePicker() {
    try {
      const {action, year, month, day} = await  DatePickerAndroid.open({
          // Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          date: new Date(Date.now()),
          onDateChange: (date) => {console.log(date) }
      });



      if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
          let data = await this.props.store.matchStore.loadHistory(new Date(year, month, day));
          this.date = `${day}-${month}-${year}`
        }
  } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
  }

  } 

  render() {
    if (!this.once) {
      this.datePicker();
      this.once = true;
    }
        
    
    return (
    <ScrollView style={style.container}>
      <HeadingRow>Match History (date: {this.date})</HeadingRow>
      {this.props.store.matchStore.history.map((item) => {
        let payment_badge = null;
        if (item.paid && item.paid_by != null) {
          payment_badge = <Text>Paid by : {item.paid_by.name}</Text>
        } else {
          if (item.status == 'PLAYING') {
            payment_badge =  <Text>Match in Progress</Text>
          } else {
            payment_badge =  <Text>(Unpaid by {item.paid_by.name})</Text>
          }
  
        }

      return (<Row>
        <Text>{item.getMatchInfo()} - {payment_badge}</Text>
      </Row>)
      }
        
      )}
    </ScrollView>
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