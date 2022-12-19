import { observable, action, makeAutoObservable } from "mobx";

export class AuthStore {
  constructor() {
    this.userDate = {};

    makeAutoObservable(this, {
      userDate: observable,
      setAuth:action,
    });
  }
 
  setAuth=(data)=>{
      const {userDTO,token}=data;
      console.log(userDTO,token);
  }
}
