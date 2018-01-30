import {observable, computed, action} from "mobx";
import _ from 'lodash'
import firebase from 'react-native-firebase'
import Match from './Match';

export default class Player {
  id;
  @observable name;
  @observable age;
  @observable phone;
  @observable email;
  @observable address;

  // Match Properties
  @observable lost;
  @observable selected_account;
  @observable unconfirm_paid_amount;
  @observable paid_amount;
  @observable matches;
  @observable single_match_net_balance;


  @observable balance;
  @observable balance_history = []

  constructor(data) {

    this.id = data.id || null;
    this.age = data.age || null;
    this.name = data.name || null;
    this.phone = data.phone || null;
    this.email = data.email || null;
    this.address = data.address || null;
    this.lost = data.lost || null;
    this.selected_account = data.selected_account || null;
    this.unconfirm_paid_amount = data.unconfirm_paid_amount || null;
    this.paid_amount = data.paid_amount || null;
    this.matches = data.matches || null;
    this.single_match_net_balance = data.single_match_net_balance || null;
    this.balance_history = data.balance_history || [];
  }

  fetchBalance() {
    if (this.matches && this.matches.length > 0) {
      Promise.all(this.matches.map((matchKey) => firebase.database().ref('matches/' + matchKey).once('value'))).then(result => {
        let matches = result
          .map(match => {
            let _m = new Match(match.toJSON())
            this.balance_history.push(_m);
            return _m;
          })
          .filter(match => match['status'] == 'PLAYED')


          this.balance = matches.reduce((a, match) => {
            let total = 0;
            let player = match
              .flat_players
              .find(_player => _player.id == this.id)
              

            if (player.selected_account == 'cash') {
              total += (-player.single_match_net_balance);
            } else if (player.selected_account == 'balance') {
              total -= player.paid_amount;
            } else if (player.selected_account == 'frame') {

            }
            return a + total; 
        }, 0);
      }).catch(err => {
        console.log('fething balance ', err)
      })
        
    } else {
      this.balance = 0;
    }
  }

}