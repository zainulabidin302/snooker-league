import {observable, computed, action} from "mobx";
import _ from 'lodash'
import Match from './Match'
import Player from './Player'

export default class Balance {

  @observable player;
  @observable match;
  @observable amount;

  // match, membership, transfer, frame_conversion
  @observable method;

  constructor(data) {
    this.match = (data.match && new Match(data.match)) || null;
    this.player = (data.player && new Player(data.player)) || null;
    this.method = data.method || null;
    this.amount = data.amount || null;
  }
}