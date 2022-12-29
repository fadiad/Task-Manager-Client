
import { observable, action, makeAutoObservable, toJS } from "mobx";
import axios from "../api/axios";

export class BoardStore {
  constructor() {
    this.listOfStatuses = [];
    this.clickedBoardId = 0;

    this.board = {};
    this.usersOnBoard = [];
    this.itemFilteredByStatus = {};

    makeAutoObservable(this, {
      listOfStatuses: observable,
      clickedBoard: observable,
      board: observable,
      setBoard: action,
      getStatusesList: action,
      addCard: action,
      addStatus: action,
      deleteStatusFromBoard: action,
      deleteItemFromStatus: action,
      updateItem: action,
      passItem: action,
    });
  }

  // setBoard = (boardDetails) => {

  //   this.board = boardDetails.board;
  //   this.usersOnBoard = boardDetails.usersOnBoard;
  //   console.log("console.log(boardDetails.usersOnBoard) : " , boardDetails.usersOnBoard);
  //   console.log("boardDetails.useresOnBoard : ", boardDetails.usersOnBoard);
  //   this.itemFilteredByStatus = boardDetails.itemFilteredByStatus;
  // };

  setClickedBoard = (clickedBoardId) => {
    this.clickedBoardId = clickedBoardId;
    console.log(this.clickedBoardId);
  };

  getStatusesList = () => {
    let list = [
      {
        title: "TODO",
        id: 0,
        cards: [
          {
            id: 2,
            text: "login front and back ends",
          },
          {
            id: 3,
            text: "registration",
          },
        ],
      },
      {
        title: "INPROGRESS",
        id: 1,
        cards: [
          {
            id: 4,
            text: "abdasdasdasd",
          },
          {
            id: 5,
            text: "weqweqweqwe",
          },
        ],
      },
    ];

    this.listOfStatuses = [...list];
  };





  createBoard = async (title, types) => {
    console.log(title, types);
    const body = {
      title: title,
      types: types,
    };
  };


  updateItem = (statusId, itemId, updatedItem) => {
    console.log(statusId, itemId, updatedItem);
    const items = this.itemFilteredByStatus[statusId].filter(i => i.id !== itemId)
    items.push(updatedItem)
    this.itemFilteredByStatus[statusId] = items
  }

  deleteItemType = (type) => {
    const boardTemp = JSON.parse(JSON.stringify(this.board));
    boardTemp.itemTypes = boardTemp.itemTypes.filter((i) => i != type);
    this.board = boardTemp;
  }

  addItemType = (type) => {
    const boardTemp = JSON.parse(JSON.stringify(this.board));
    boardTemp.itemTypes.push(type)
    this.board = boardTemp;
  }




  passItem = (source, destination, item) => {
    console.log(source, destination);
    //droppableId
    //index
    console.log(item);
    const itemBystatuses = JSON.parse(JSON.stringify(this.itemFilteredByStatus));
    const itemsAfterMoveItem = itemBystatuses[source.droppableId].filter(i => i.id !== source.index)
    itemBystatuses[source.droppableId] = itemsAfterMoveItem;
    itemBystatuses[destination.droppableId].push(item)

    this.itemFilteredByStatus = itemBystatuses;
  }

  setBoard = (boardDetails) => {
    this.board = boardDetails.board;
    this.usersOnBoard = boardDetails.usersOnBoard;
    this.itemFilteredByStatus = boardDetails.itemFilteredByStatus;
  };

  setClickedBoard = (clickedBoardId) => {
    this.clickedBoardId = clickedBoardId;
    console.log(this.clickedBoardId);
  };



  addCard = (id, text) => {
    const newList = [...this.listOfStatuses];
    const section = newList.find((s) => s.id === id);
    section.cards.push({ id, text });
    this.listOfStatuses = newList;
  };

  addStatus = (statuses) => {
    const boardTemp = JSON.parse(JSON.stringify(this.board));
    boardTemp["statues"] = statuses;
    statuses.forEach((status) => {
      if (!this.itemFilteredByStatus[status.id]) {
        this.itemFilteredByStatus[status.id] = [];
      }
    });
    this.board = boardTemp;
  };

  addItemToStatus = (item) => {
    const items = JSON.parse(
      JSON.stringify(this.itemFilteredByStatus[item.statusId])
    );
    items.push(item);
    this.itemFilteredByStatus[item.statusId] = items;
  };

  deleteStatusFromBoard = (status) => {
    const newStatues = this.board.statues.filter((s) => s.id !== status.id);
    const tempItemFilteredByStatus = JSON.parse(
      JSON.stringify(this.itemFilteredByStatus)
    );
    delete tempItemFilteredByStatus[status.id];
    this.board.statues = newStatues;
  };

  getStatus = () => {
    console.log(this.board);
    return toJS(this.board.statues)
  }

  deleteItemFromStatus = (statusId, itemId) => {
    const items = this.itemFilteredByStatus[statusId].filter(i => i.id !== itemId)
    this.itemFilteredByStatus[statusId] = items;
  }
}
