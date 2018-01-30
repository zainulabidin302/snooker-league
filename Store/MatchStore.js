import {observable, computed, action} from "mobx";

import Table from "./Table";
import Match from '../Store/Match';
import Player from '../Store/Player';
import Balance from './Balance'
import firebase from 'react-native-firebase';

import _ from 'lodash';

export default class MatchStore {
  rootStore;

  @observable matches = [];

  @observable history = [];
  @observable fetching = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.ref = firebase
      .database()
      .ref('matches');
  }
  childAdd(snapShop) {
    this
      .matches
      .push(new Match({
        ...snapShop.toJSON(),
        id: snapShop.key
      }))
  }

  childChange(snapShop, prevChildKey) {
    let index = _.findIndex(this.matches, {id: snapShop.key});
    this.matches[index] = new Match({
      ...snapShop.toJSON(),
      id: snapShop.key
    });
  }

  fetch() {
    this.fetching = true;

    this
      .matches
      .replace([]);
    this
      .ref
      .on('child_added', this.childAdd.bind(this));
    this
      .ref
      .on('child_changed', this.childChange.bind(this));
    this
      .ref
      .once('value', () => this.fetching = false);
  }

  @computed get getPlaying() {

    return this
      .matches
      .filter(_match => _match.status == 'PLAYING')
  }

  loadHistory(date) {
    if (!date) {
      throw new Error('date not found');
    }
    console.log('load history')
    //'assuming 10000 there will be no more then 10000 matches a day'
    this
      .history
      .replace([]);
      console.log('start time', date.getTime())
      let startTime = date.getTime();
      let endTime = date.setDate(date.getDate()+1)
      
    let history = this
      .ref
      .orderByChild('start_time')
      .startAt(startTime)
      .limitToFirst(1000)
      .on('value', (snapShot) => {
        console.log(snapShot)
        snapShot.forEach((item) => {
          if (item.toJSON().end_time < endTime) {
            this
            .history
            .push(new Match({
              ...item.toJSON(),
              id: item.key
            }))
          }
        })
      })
  }

  addMatch(match, onError) {
    let ref = this
      .ref
      .push();

    
    ref.set(match.getPersistingProperties());

    match
      .flat_players
      .forEach(player => {
        this
          .rootStore
          .playerStore
          .addMatchToPlayer(player, ref.key)
      })
  }

  endMatch(match, onError) {

    match.status = 'PLAYED';

    firebase
      .database()
      .ref('matches/' + match.id)
      .update(match.getPersistingProperties(), (err) => {
        if (err != null) {
          onError(err);
        }
        return null;
      })

  }

}