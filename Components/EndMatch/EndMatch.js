import React from 'react';
import { CheckBox, Picker, ToastAndroid, ListView, StyleSheet, Text, View, TextInput, Button, Image, Alert, DrawerLayoutAndroid, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import Fuse from 'fuse.js';
import _ from 'lodash';
import Autocomplete from 'react-native-autocomplete-input';
import {inject, observer } from 'mobx-react'
import {observable} from 'mobx'
import Row from '../DumbComponents/Row'
import TouchableRow from '../DumbComponents/TouchableRow'
import HeadingRow from '../DumbComponents/HeadingRow'
import Match from '../../Store/Match'
import { MKRadioButton } from 'react-native-material-kit';
import moment from 'moment';
@inject('store') @observer
class EndMatch extends React.Component {
  end_time;
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      account: null,
      paid: false,
      paid_amount: '',
      is_century: false,
    }
   
    this.props.store.playerStore.fetch()
    this.end_time = Math.floor(Date.now())
    this.display_end_time = moment(new Date(this.end_time)).format('hh:mm:ss');
    this.display_start_time = moment(new Date(this.props.match.start_time)).format('hh:mm:ss');
    this.display_match_time =   Math.floor(((this.end_time / 1000) - (this.props.match.start_time / 1000)) / 60)
  }

  get getTotalBill() {
    console.log('Match Type is : <', this.props.match.match_type)
    if (this.state.is_century) {
        console.log(this.display_match_time, this.props.match.match_type.price)
        return this.display_match_time * this.props.match.match_type.price
    } else {
        return this.props.match.match_type.price
    }
  }

  updateScore(key, score) {
      this.props.match.players[key].score = score;
  }


  endMatch() {
    if (!this.state.account) {
      ToastAndroid.showWithGravity(
        'Select a winner first',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }

    let index = _.findIndex(this.props.match.players, this.state.account);
    
    if (!index) {
      ToastAndroid.showWithGravity(
        'Select a winner first',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }


    this.props.onMatchEnded(this.props.match.table.id);
    


    this.props.match.paid_amount = this.state.paid_amount
    this.props.match.pending_ammount =  this.getTotalBill - this.state.paid_amount
    this.props.match.total_to_pay = this.getTotalBill;
    this.props.match.paid = this.state.paid;
    
    if (this.getTotalBill < this.state.paid_amount) {
      this.props.match.over_paid =  this.state.paid_amount - this.getTotalBill;
    }

    this.props.match.paid = this.state.paid;

    this.props.match.winner = this.state.winner;
    this.props.match.account = this.state.account;
    this.props.match.end_time = this.end_time; // for congruence

    this.props.match.time_in_mins = this.display_match_time

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

    let conditional_view_of_match_type = null;
    if (!this.state.is_century) {
      conditional_view_of_match_type = <View style={{margin: 10, flexDirection: 'row'}}  >
        <Text style={{padding: 5}}>{this.props.match.match_type.type}  </Text>
    </View>
    }
  
    return (
    <View style={style.container}>
      <HeadingRow>End Match Match:</HeadingRow>
      <Text>{`Match Time ${this.display_start_time} - ${this.display_end_time} (${this.display_match_time}) `}</Text>
      <ScrollView style={{width: '100%', height: 600}} keyboardShouldPersistTaps='always'>
      
      <Picker
        selectedValue={this.state.winner}
        onValueChange={(itemValue, itemPosition) => {
          this.setState({winner: itemValue});
          let account = this.props.match.players.filter((acount) => acount.id != itemValue);
          if (account) {
            this.setState({account: account[0].id});
          }
        }}>
          <Picker.Item key={-1} label={`Select a Winner`}   value={null} />
        {
            this.props.match && this.props.match.players.map((_player, key) => (
              <Picker.Item key={_player.id} label={`${_player.name} Won`}   value={_player.id} />
              )
          )
        }
      </Picker>

      <Picker
        selectedValue={this.state.account }

        onValueChange={(itemValue, itemPosition) => {
          this.setState({account: itemValue});
        }}>
      <Picker.Item key={-1} label={`Select a payment account`}   value={null} />

        {
            this.props.match && this.props.match.players.map((_player, key) => (
              <Picker.Item key={_player.id} label={`Use payment account of ${_player.name} `}   value={_player.id} />
              )
          )
        }
      </Picker>



      <View style={{margin: 10, flexDirection: 'row'}} >
          <Text style={{padding: 5}}>Paid: </Text>
          <CheckBox
            value={this.state.paid}
            onChange={(curValue) => {
              this.setState({paid: !this.state.paid})
            }}
          />
      </View>

      {conditional_view_of_match_type}


      <View style={{margin: 10, flexDirection: 'row'}} >
          <Text style={{padding: 5}}>Century: </Text>
           <CheckBox
            value={this.state.is_century}
            onValueChange={( value) => {
              
              if (value) {
                this.props.match.setMatchType('century')
              } else {
                this.props.match.setMatchType('other')
              }
              this.setState({is_century: !this.state.is_century})
            }}
          />
      </View>



      <View >
            <TextInput placeholder={`Enter paid amount in RS.`} onChangeText={(text) => this.setState({paid_amount: text, paid: text >= this.getTotalBill }) } ></TextInput>
      </View>
         {
             this.props.match && this.props.match.players.map((player, key) => (
                <View key={key}>
                    <TextInput placeholder={`Enter ${player.name}'s score`} onChangeText={(text) => this.updateScore(key, text) } ></TextInput>
                </View>
             )
            )
         }

        <View style={{margin: 10}} >
         <Text style={{fontSize: 32, }}>Total: {this.getTotalBill}</Text>
         <Text style={{fontSize: 32, }}>Paid: {this.state.paid_amount}</Text>
         <Text style={{fontSize: 32, }}>Balance: {this.getTotalBill - this.state.paid_amount}</Text>
        </View>
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