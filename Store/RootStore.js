import { observable, computed, action } from "mobx";
import TableStore from "./TableStore";
import PlayerStore from "./PlayerStore";
import MatchStore from './MatchStore';
import User from './User'
import { NetInfo } from 'react-native';

export default class RootStore {
    @observable netinfo;    
    constructor() {
        this.currentUser = null;
        this.matchStore = new MatchStore(this);
        this.tableStore = new TableStore(this);
        this.playerStore = new PlayerStore(this);

        NetInfo.addEventListener('connectionChange', this.onNetworkChange)

  }

  onNetworkChange(type) {
      console.log('NETWORK CHANGED',type)
      this.netinfo = type;
  }
}




