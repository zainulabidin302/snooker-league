import { observable, computed, action } from "mobx";
import Table from "./Table";
import Match from '../Store/Match'
import Player from '../Store/Player'
import firebase from 'react-native-firebase';
import _ from 'lodash'

export default class PlayerStore {
  rootStore;
  
  @observable players = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  fetch() {
    let ref = firebase.database().ref('players')
    this.players = observable([]);
    ref.once('value', (snapShot) => {
      _.each(snapShot.toJSON(), (item, key) => {
        this.players.push(new Player({
          name: item.name,
          age: item.age,
          phone: item.phone,
          id: key
        }));
      })

    }, (err) => {
      console.log('could not fetch players', err)
    })
  }

  addPlayer(player) {
    let ref = firebase.database().ref('players')
    ref.push().set(player);
  }
}