import { observable, computed, action } from "mobx";
import Table from "./Table";
import Match from '../Store/Match'
import Player from '../Store/Player'
import _ from 'lodash';
import firebase from 'react-native-firebase';

export default class TableStore {
  rootStore;
  
  @observable tables = [];
  @observable fetching = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  fetch() {
    this.fetching = true;
    this.tables = observable([]);
    let ref = firebase.database().ref('clubs/' + this.rootStore.currentUser.user.uid + '/tables')

    ref.orderByChild('title').once('value', (snapShot) => {
      snapShot.forEach((child) => {
        let item = child.val()
        this.tables.push(new Table({
          ...child.toJSON(),
          id: child.key
        }));
      });
      this.fetching = false;
    }, (err) => {
      if (null) {
      } else {
        console.log('could not fetch!', error)
      }
    })
  }

  @computed get getTables() {
    if (this.fetching) {
      return this.tables;
    }

    let matches = this.rootStore.matchStore.getPlaying;

    let curated_list = this.tables.map(table => {
       
      let match = matches.filter((_match) => {
       return _match.table.id == table.id && _match.status == 'PLAYING'
      });

       if (match.length < 1) {
         return {...table};
       }
       
       return {...table, Match: match[0], status: match[0].status}
    })

    return curated_list;

  }

  status(_status) {
      switch(_status) {
        case 'PLAYING': {
          return 'PLAYING';
          break;
        }
        case 'UNAVAILABLE': {
          return 'UNAVAILABLE';
          break;
        }
        case 'FREE': {
          return 'FREE';
          break;
        }
        default:
          throw Error('no status found')
      }
  }

}