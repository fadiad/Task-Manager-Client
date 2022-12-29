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
    this.userData=newData
    
  }

  setListOfBoards=(boards)=>{
      this.listOfBoards=boards
  }

  createBoard = (board) => {
    const tempBoardList= JSON.parse(JSON.stringify(this.listOfBoards))
    tempBoardList.push(board);
    this.listOfBoards=tempBoardList 
  }; 

  setUser=(user)=>{
    const newUser={
      ...this.userData,
      userDTO:user
    }
    this.userData=newUser;
  }
}
