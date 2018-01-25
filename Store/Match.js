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
     
      this.table = data.table || null
      this.id = data.id || null;
      this.start_time = data.start_time || null;
      this.end_time = data.end_time || null;
      this.players = data.players || observable([]);
      this.status = data.status || null
      this.winner = data.winner || null
      this.account = data.account || null;
      this.match_type = this.getMatchType()

      
      this.paid = data.paid || null
      this.paid_amount = data.paid_amount || null
      this.payment_status = data.payment_status || null
      this.pending_ammount = data.pending_ammount || null
      this.total_to_pay = data.total_to_pay || null
      this.over_paid = data.over_paid || null
      this.time_in_mins = data.time_in_mins
  }

  get paid_by() {
    var id = this.account;
    let players = this.players.filter((_player) => _player.id == id);
    console.log(players)
    if (players.length > 0) {
      return players[0]
    }
    return null
  }  

  setMatchType(type) {
      if (type != 'century') {
        type = 'sinlge';

        if (this.players.length <= 2) {
          type = 'single';
        } else if (this.players.length > 2) {
          type = 'double';
        }
      }
      console.log('setting match type to ', type)
      this.match_type = {
        'price': (this.table && this.table.price[type]),
        'type': type
      }
    }

  getMatchType() {
    let match = this
    if (match.match_type) {
      return match.match_type;
    }

    let type = 'sinlge';

    if (match.players.length <= 2) {
      type = 'single';
    } else if (match.players.length > 2) {
      type = 'double';
    }
    return {
      'price': (this.table && this.table.price[type]),
      'type': type
    }
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