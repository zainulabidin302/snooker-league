import { observable, computed, action } from "mobx";
import TableStore from "./TableStore";
import PlayerStore from "./PlayerStore";
import MatchStore from './MatchStore';
import User from './User'
export default class RootStore {
    
    constructor() {
        this.currentUser = null;
        this.matchStore = new MatchStore(this);
        this.tableStore = new TableStore(this);
        this.playerStore = new PlayerStore(this);
        
  }
}