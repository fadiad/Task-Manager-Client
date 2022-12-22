import { useEffect, useState } from "react";
import Board from "../../components/Board/Board";
import "./Dashboard.css";
import CustomInput from "../../components/CustomInput/CustomInput";

import axios from '../../api/axios'
import ChoseNotifications from "./ChoseNotifications";

function Dashboard() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Discover",
      cards: [
        {
          id: 2,
          title: "Task1",
          type: "BUG",
          date: "2022-05-05",
          importance: 1,
          assignTo: { id: 1, name: "Fadi Id" },
          tasks: [
            { id: 1651319625559.8025, completed: true, text: "Task1_subtask1" },
            { id: 1651319629650.8945, completed: true, text: "Task1_subtask2" },
            { id: 1651319633774.9905, completed: true, text: "Task1_subtask3" },
          ],
          desc: "Task1 Detail Description",
        },
        {
          id: 3,
          title: "Task2",
          assignTo: { id: 1, name: "khaled wany" },
          importance: 3,
          type: "TESTING",
          date: "2022-05-01",
          tasks: [],
        },
      ],
    }, {
      id: 6,
      title: "Discover",
      cards: [
        {
          id: 6,
          title: "Task1",
          type: "BUG",
          date: "2022-05-05",
          importance: 1,
          assignTo: { id: 112, name: "Fadi Id" },
          tasks: [
            { id: 1651319625559.8025, completed: true, text: "Task1_subtask1" },
            { id: 1651319629650.8945, completed: true, text: "Task1_subtask2" },
            { id: 1651319633774.9905, completed: true, text: "Task1_subtask3" },
          ],
          desc: "Task1 Detail Description",
        },
        {
          id: 83,
          title: "Task2",
          assignTo: { id: 24, name: "khaled wany" },
          importance: 3,
          type: "TESTING",
          date: "2022-05-01",
          tasks: [],
        },
      ],
    },
  ]);

  useEffect(() => { }, []);

  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  const addboardHandler = (name) => {
    const tempBoardsList = [...boards];
    tempBoardsList.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoardsList);
  };

  const removeBoard = (boardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList.splice(boardIndex, 1);
    setBoards(tempBoardsList);
  };

  const addCardHandler = async (boardId, title) => {

    // let res = await axios.post('/item/item-creat', {
    //   Title: title,
    //   boardId: boardId
    // });

    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      type: "",
      date: "",
      tasks: [],
      desc: "",
    });
    setBoards(tempBoardsList);
  };

  const removeCard = (boardId, cardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoardsList);
  };

  const updateCard = (boardId, cardId, card) => {
    console.log("shit");
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].cards[cardIndex] = card;

    setBoards(tempBoardsList);
  };

  const onDragEnd = (boardId, cardId) => {
    const sourceBoardIndex = boards.findIndex(
      (item) => item.id === boardId
    );
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
      (item) => item.id === cardId
    );
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex(
      (item) => item.id === targetCard.boardId
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cardId
    );
    if (targetCardIndex < 0) return;

    const tempBoardsList = [...boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(
      targetCardIndex,
      0,
      sourceCard
    );
    setBoards(tempBoardsList);

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
        <h1>Trello Board</h1>
      </div>

      <ChoseNotifications types={['ITEM_ASSIGNED_TO_ME']} typesWays={['EMAIL']} />

      <div className="app-boards-container">
        <div className="app-boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCard}
            />
          ))}
          <div className="app-boards-last">
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
