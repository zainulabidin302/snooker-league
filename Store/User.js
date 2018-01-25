import { observable} from "mobx";

export default class User {
  @observable user = {};

  constructor(_user) {
    this.user.displayName = _user.displayName
    this.user.photoURL = _user.photoURL
  }

}