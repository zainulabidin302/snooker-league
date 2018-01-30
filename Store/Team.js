import { observable, computed, action } from "mobx";
import _ from 'lodash'
import Player from './Player';
export default class Team {
  id;
  @observable players
  //   @observable age;
//   @observable phone;
//   @observable email;
//   @observable address;

  // Match Properties
//   @observable selected_account;
//   @observable unconfirm_paid_amount;
//   @observable paid_amount;
  

  constructor(data) {
      this.players = data.players.map(player => new Player(player)) || null;
    }

    @computed get getName() {
        return this.players.map(player => player.name).join(' & ')
    }

    @computed get lost() {
        return (this.players.reduce((a,b) => a + b.lost, 0) / 2)
    }
}