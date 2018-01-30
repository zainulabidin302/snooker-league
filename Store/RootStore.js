import {observable, computed, action} from "mobx";
import TableStore from "./TableStore";
import PlayerStore from "./PlayerStore";
import MatchStore from './MatchStore';
import BalanceStore from './BalanceStore';
import User from './User'
import {NetInfo} from 'react-native';
import firebase from 'react-native-firebase';

class Config {
    @observable title;
    @observable match_types;
}

export default class RootStore {
    @observable netinfo;
    @observable config = new Config();
    constructor() {
        this.currentUser = null;
        this.matchStore = new MatchStore(this);
        this.tableStore = new TableStore(this);
        this.playerStore = new PlayerStore(this);
        this.balanceStore = new BalanceStore(this);

        NetInfo.addEventListener('connectionChange', this.onNetworkChange)
    }

    fetchConfiguration() {
        firebase
            .database()
            .ref('clubs/' + this.currentUser.user.uid)
            .once('value', (snapShot) => {
                this.config.title = snapShot
                    .toJSON()
                    .title;
                this.config.match_types = snapShot
                    .toJSON()
                    .match_types;
                    
            })
    }
    onNetworkChange(type) {
        this.netinfo = type;
    }
}
