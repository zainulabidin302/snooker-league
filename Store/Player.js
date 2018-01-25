import { observable, computed, action } from "mobx";
import _ from 'lodash'

export default class Player {
  id;
  @observable name;
  @observable age;
  @observable phone;
  @observable email;
  @observable address;

  constructor(data) {
      this.id = data.id || null;
      this.age = data.age || null;
      this.name = data.name || null;
      this.phone = data.phone || null;
      this.email = data.email || null;
      this.address = data.address || null;
  }
}