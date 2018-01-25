import { observable, computed, action } from "mobx";
import Table from "./Table";
import Match from '../Store/Match'
import Player from '../Store/Player'
import _ from 'lodash';
import firebase from 'react-native-firebase';

export default class TableStore {
  rootStore;
  
  @observable tables = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  fetch() {
    this.tables.replace([]);
    let ref = firebase.database().ref('tables')
    ref.once('value', (snapShot) => {
      _.each(snapShot.toJSON(), (item, key) => {
        this.tables.push(new Table({
          title: item.title,
          status: item.status,
          id: key
        }));
      })

    }, (err) => {
      console.log('could not fetch!')
    })
  }

  @computed get getTables() {
    let matches = this.rootStore.matchStore.getPlaying;
    let curated_list = this.tables.map(table => {
       let match = _.find(matches, {table_id: table.id, status: 'PLAYING'});
       
       if (!match) {
         return table;
       }
       return {...table, Match: match, status: match.status}
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