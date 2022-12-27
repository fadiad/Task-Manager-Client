import { useEffect, useState } from "react";
import Board from "../../components/Board/Board";
import "./Dashboard.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { observer, inject } from 'mobx-react'

import axios from '../../api/axios'
import ChoseNotifications from "./ChoseItemTypes";

function Dashboard(props) {

  const [stauses, setStatuses] = useState([]);
  const [boardData, setBoardData] = useState({});
  const [useresOnBoard, setUseresOnBoard] = useState([]);

  useEffect(() => {

    const getBoardDetails = async () => { //props.boardStore.clickedBoardId

      const response = await axios('/board/4');

      let myList = []
      response.data.board.statues.forEach(status => myList.push(status));
      myList.forEach(status => status['cards'] = response.data.itemFilteredByStatus[status.id]);
      setStatuses([...myList]);

      console.log("response : ", response);
      console.log("myList : ", myList);

      setUseresOnBoard([...response.data.usersOnBoard])
      setBoardData({ ...response.data.board })
    }

    // if (props.boardStore.clickedBoardId != 0) {
    getBoardDetails();
    //}

  }, []);

  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  const addboardHandler = async (name) => {
    const response = await axios.post('/board/add-statues/4', {
      name: name
    }).then(function (response) {
      if (response.status >= 200 && response.status <= 400) {
        const tempBoardsList = [...stauses];
        tempBoardsList.push({
          id: Date.now() + Math.random() * 2,
          name: name,
          cards: [],
        });
        setStatuses(tempBoardsList);
      } else {
        console.log("fail to add");
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeBoard = (nameT, boardId) => {
    console.log(nameT, boardId);

    let status = {
      id: boardId,
      name: nameT
    }

    const response = axios.put('/board/delete-statues/4', status)
      .then(function (response) {
        if (response.status >= 200 && response.status <= 400) {
          const boardIndex = stauses.findIndex((item) => item.id === boardId);
          if (boardIndex < 0) return;

          const tempBoardsList = [...stauses];
          tempBoardsList.splice(boardIndex, 1);
          setStatuses(tempBoardsList);
        } else {
          console.log("fail to delete");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addCardHandler = async (boardId, title) => {

    const response = await axios.post('/item/item-create', {
      "title": title,
      boardId: 4,
      statusId: boardId,
      creator: { "id": 1 }
    }).then(function (response) {
      console.log(response);
      if (response.status >= 200 && response.status <= 400) {
        const boardIndex = stauses.findIndex((item) => item.id === boardId);
        if (boardIndex < 0) return;

        const tempBoardsList = [...stauses];
        tempBoardsList[boardIndex].cards.push(response.data);
        setStatuses(tempBoardsList);
      } else {
        console.log("fail to add");
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeCard = async (boardId, cardId) => {
    const response = await axios.delete(`/item/item-delete/${cardId}`,)
      .then(function (response) {
        if (response.status >= 200 && response.status <= 400) {
          const boardIndex = stauses.findIndex((item) => item.id === boardId);
          if (boardIndex < 0) return;

          const tempBoardsList = [...stauses];
          const cards = tempBoardsList[boardIndex].cards;

          const cardIndex = cards.findIndex((item) => item.id === cardId);
          if (cardIndex < 0) return;

          cards.splice(cardIndex, 1);
          setStatuses(tempBoardsList);
        } else {
          console.log("fail to delete");
        }

      })
      .catch(function (error) {
        console.log(error);
      });

  };

  const updateCard = async (boardId, cardId, card) => {
    console.log("card : ", card);
    const response = await axios.put(`/item/item-update/${cardId}`, card).then(function (response) {
      if (response.status >= 200 && response.status <= 400) {
        console.log(card);

        const boardIndex = stauses.findIndex((item) => item.id === boardId);
        if (boardIndex < 0) return;

        const tempBoardsList = [...stauses];
        const cards = tempBoardsList[boardIndex].cards;

        const cardIndex = cards.findIndex((item) => item.id === cardId);
        if (cardIndex < 0) return;

        tempBoardsList[boardIndex].cards[cardIndex] = card;

        setStatuses(tempBoardsList);
      } else {
        console.log("fail to add");
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDragEnd = (boardId, cardId) => {
    const sourceBoardIndex = stauses.findIndex(
      (item) => item.id === boardId
    );
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = stauses[sourceBoardIndex]?.cards?.findIndex(
      (item) => item.id === cardId
    );
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = stauses.findIndex(
      (item) => item.id === targetCard.boardId
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = stauses[targetBoardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cardId
    );
    if (targetCardIndex < 0) return;

    const tempBoardsList = [...stauses];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard
    );
    setStatuses(tempBoardsList);

    setTargetCard({
      boardId: 0,
      cardId: 0,
    });
  };

  const onDragEnter = (boardId, cardId) => {
    console.log(boardId, cardId);
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  // useEffect(() => {
  //   updateLocalStorageBoards(boards);
  // }, [boards]);

  return (
    <div className="app">
      <div className="app-nav">
        <h1>{boardData.title}</h1>
      </div>

      <ChoseNotifications types={['ITEM_ASSIGNED_TO_ME']} typesWays={['EMAIL']} />

      <div className="app-boards-container">
        <div className="app-boards">
          {stauses.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.name, item.id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCard}
              itemTypes={boardData.itemTypes}
              useresOnBoard={useresOnBoard}
            />
          ))}
          <div className="app-boards-last">
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Enter Board Name"
              text="Add Status"
              buttonText="Add Status"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default inject("boardStore")(observer(Dashboard))

