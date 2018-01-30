import {observable, computed, action} from "mobx";

import Match from '../Store/Match';
import Player from '../Store/Player';
import Balance from '../Store/Balance';

import firebase from 'react-native-firebase';
import _ from 'lodash';

export default class BalanceStore {
    rootStore;
    @observable balanceOf;
    @observable fetching = false;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

 

}