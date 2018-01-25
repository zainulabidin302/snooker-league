import { observable, computed, action } from "mobx";

import Table from "./Table";
import Match from '../Store/Match';
import Player from '../Store/Player';
import firebase from 'react-native-firebase';
import _ from 'lodash';


export default class MatchStore {
  rootStore;
  
  @observable matches = [];
  @observable history = [];

  fetching;
  fetched;
  ref;
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.fetched = false;
    this.fetching = false;
    this.ref = firebase.database().ref('matches');


  }
  childAdd(snapShop) {
    this.matches.push(new Match({...snapShop.toJSON(), id: snapShop.key}))
  }

  childChange(snapShop, prevChildKey) {
    let index = _.findIndex(this.matches, {id: snapShop.key});
    this.matches[index] = new Match({...snapShop.toJSON(), id: snapShop.key});
  }

  fetch() {
    this.matches.replace([]);
    this.ref.on('child_added', this.childAdd.bind(this));
    this.ref.on('child_changed', this.childChange.bind(this));
  }

  @computed get getPlaying() {

    console.log('I am playing:', this.matches)
    return this.matches.filter(_match => _match.status == 'PLAYING')
  }

  loadHistory(date) {
    if (!date) { throw new Error('date not found'); }

    //'assuming 10000 there will be no more then 10000 matches a day'
    this.history.replace([]);
    let history = this.ref.orderByChild('start_time').startAt(Math.floor(date.getTime()/1000)).limitToLast(1000).on('value', (snapShot) => {
      snapShot.forEach((item) => {
        this.history.push(new Match({...item.toJSON(), id: item.key}))
      })
    })
  }


  addMatch(match) {
      this.ref.push().set(match);
    }

  endMatch(match, onError) {
    let _match = {...match, status: 'PLAYED'};
    firebase.database().ref('matches/' + match.id).update(_match, onError)
  }

}