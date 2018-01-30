import {observable, computed, action} from "mobx";
import _ from 'lodash'
import Player from './Player'
import Table from './Table'
import Team from './Team'
export default class Match {

  @observable table;
  @observable id;
  @observable start_time;
  @observable end_time;
  @observable players;
  @observable status;
  @observable winner;
  @observable account;
  @observable match_type;
  @observable paid;
  @observable paid_amount;
  @observable payment_status;
  @observable pending_ammount;
  @observable total_to_pay;
  @observable over_paid;
  @observable time_in_mins;
  @observable teams;
  @observable frames;

  constructor(data) {

    this.id = data.id || null;
    this.start_time = data.start_time || null;
    this.end_time = data.end_time || null;

    this.status = data.status || null
    this.winner = data.winner || null
    this.account = data.account || null;
    this.match_type = data.match_type || null

    this.paid = data.paid || null
    this.paid_amount = data.paid_amount || null
    this.payment_status = data.payment_status || null
    this.pending_ammount = data.pending_ammount || null
    this.total_to_pay = data.total_to_pay || null
    this.over_paid = data.over_paid || null
    this.time_in_mins = data.time_in_mins

    
    this.frames = data.frames || null;

    if (data.table) {
      this.table = new Table(data.table);
    } else {
      data.table || null
    }

    if (data.players && data.players.length > 0) {
      this.players = data
        .players
        .map(player => new Player(player))
    } else {
      this.players = data.players || null;
    }
    if (data.teams) {
      this.teams = data.teams.map(_team => new Team(_team)) || null;
    } else {
      this.teams = data.teams || null;
    }

  }

  getPersistingProperties() {
    return {
      id: this.id,
      start_time: this.start_time,
      end_time: this.end_time,
      status: this.status,
      match_type: this.match_type,
      time_in_mins: this.time_in_mins,
      frames: this.frames,
      table: this.table,
      players: this.players,
      teams: this.teams,
    }

  }
  @computed get flat_players() {
    
    let type = this.match_type.type;
    if (type == 'single' || type == 'century') {
      return this.players;
    } else if (type == 'double') {
      let players = []
      this.teams.forEach(team => {
        team.players.map(player => {
          players.push(new Player(player));
        })
      });
      return players;
    }
  }

  balance_by_player(player) {
    return this.total_by_player(player) - player.unconfirm_paid_amount
  }

  balance_by_player_confirmed(player) {
    return this.total_by_player(player) - (player.paid_amount || 0)
  }


  total_by_player(player) {

    if (this.match_type.type == 'single') {
      return player.lost * this.match_type.price;
    } else if (this.match_type.type == 'double') {
      return (player.lost * this.match_type.price) / 2 ;
    } else if (this.match_type.type == 'century') {
      console.log('this.match_type.price ',this.match_type.price ,  ' this.time_in_mins', this.time_in_mins)
      return this.match_type.price * this.time_in_mins;
    }
  }
  get paid_by() {
    var id = this.account;
    let players = this
      .players
      .filter((_player) => _player.id == id);
    if (players.length > 0) {
      return players[0]
    }
    return null
  }

  setMatchType(type) {
    this.match_type = {
      'price': (this.table && this.table.price[type]),
      'type': type
    }
  }

  getUserAccountsAsArray() {
      
    let type = this.match_type.type;
    if (type == 'single' || type == 'century') {
      return this.players;
    } else if (type == 'double') {
      let players = []
      this.teams.forEach(team => {
        team.players.map(player => {
          players.push(player);
        })
      });
      return players;
    }
  }

  getuserById(id) {
    return this
      .getUserAccountsAsArray()
      .find((player) => player.id == id);
  }

  @computed get totals() {
    let type = this.type;
    let total = 0;

    if (type == 'single') {
      total = this.match_type.price * this
        .getuserById(id)
        .lost
    } else if (type == 'double') {
      total = this.match_type.price * this.teams[id].lost
    } else if (type == 'century') {
      total = this.match_type.price * this.time_in_mins
    }
    return total;
  }

  getMatchType() {
    return this.match_type || null
  }

  addPlayer(player) {
    if (!_.find(this.players, {id: player.id})) {
      this
        .players
        .push(player);
    }
  }

  getMatchInfo() {
    if (this.match_type.type == 'single' || this.match_type.type == 'century') {
      return this.players.map(player => player.name).join(' vs ')
    } else if (this.match_type.type == 'double') {
      return this.teams.map(_team => _team.getName).join(' vs ')
    } 
  }
}