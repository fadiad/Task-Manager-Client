import { observable, action, makeAutoObservable } from "mobx";

export class AuthStore {
  constructor() {
    this.userData = {};
    this.listOfBoards = []

    makeAutoObservable(this, {
      userData: observable,
      listOfBoards: observable,
      setListOfBoards: action,
      setAuth: action,
    });
  }

  setAuth = (data) => {
    const newData={}
    const { userDTO, token } = data;
    newData.userDTO=userDTO
    newData.token=token 
    console.log(newData);
    this.userData=newData
  }

  setListOfBoards=(boards)=>{
      this.listOfBoards=boards
  }

}
