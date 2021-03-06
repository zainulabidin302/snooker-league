import { observable, computed, action } from "mobx";


export default class Table {
  id;
  @observable title;
  @observable Match;
  @observable status;

  constructor(data) {
      
      this.title = data.title || null
      this.status = data.status || null
      this.id = data.id || null
      this.Match = data.Match || null
      this.price = data.price || null
    }

}