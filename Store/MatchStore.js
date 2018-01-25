import { observable, computed, action } from "mobx";

import Table from "./Table";
import Match from '../Store/Match';
import Player from '../Store/Player';
import firebase from 'react-native-firebase';
import _ from 'lodash';

export default class MatchStore {
  rootStore;
  
  @observable matches = [];
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
    this.matches.push(new Match({...snapShop.toJSON(), id: snapShop.key,}))
  }
  childChange(snapShop, prevChildKey) {
    console.log('updating CHILD', snapShop)
    let index = _.findIndex(this.matches, {id: snapShop.key});
    this.matches[index] = new Match({...snapShop.toJSON(), id: snapShop.key,});
  }

  fetch() {
    this.ref.on('child_added', this.childAdd.bind(this));
    this.ref.on('child_changed', this.childChange.bind(this));
  }

  @computed get getPlaying() {
    return this.matches.filter(_match => _match.status == 'PLAYING')
  }

  
  addMatch(match) {
      this.ref.push().set(match);
    }

  endMatch(match, onError) {
    let _match = {...match, status: 'PLAYED'};
    
    firebase.database().ref('matches/' + match.id).update(_match, onError)
  }

}