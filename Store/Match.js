import { observable, computed, action } from "mobx";
import _ from 'lodash'

export default class Match {
  id;
  @observable players = [];

  @observable start_time;
  @observable end_time;

  @observable table_id;
  @observable status;


  constructor(data) {
      
      this.id = data.id || null;
      this.start_time = data.start_time || null;
      this.end_time = data.end_time || null;
      this.table_id = data.table_id || null;
      this.players = data.players || observable([]);
      this.status = data.status || null
      this.winner = data.winner || null
  }

  addPlayer(player) {
      if (!_.find(this.players, {id: player.id})) {
        this.players.push(player);
      }
  }

  getMatchInfo() {
    let a = []
    _.each(this.players, (_player, key) => a.push(_player.name))
    return a.join(' vs ')
    
  }
  

}