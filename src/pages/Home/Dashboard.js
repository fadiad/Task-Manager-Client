import { useEffect, useState } from "react";
import Board from "../../components/Board/Board";
import "./Dashboard.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { observer, inject } from "mobx-react";

import axios from "../../api/axios";
import ChoseItemTypes from "./ChoseItemTypes";
import { useParams } from "react-router-dom";

function Dashboard(props) {
  const [stauses, setStatuses] = useState([]);

  const { boardId } = useParams();
  console.log(boardId);

  useEffect(() => {
    const getBoardDetails = async () => {
      console.log(props.authStore.userData.token);
      try {
        const response = await axios("/board?boardId=" + boardId, {
          headers: {
            Authorization: "Bearer " + props.authStore.userData.token,
          },
        });
        console.log(response.data);
        props.boardStore.setBoard(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBoardDetails();
  }, []);

  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  const addboardHandler = async (name) => {
    await axios
      .post(
        "/board/add-statues?boardId=" + boardId,
        {
          name: name,
        },
        {
          headers: {
            Authorization: "Bearer " + props.authStore.userData.token,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.status >= 200 && response.status < 400) {
          props.boardStore.addStatus(response.data.statues);
        } else {
          console.log("fail to add");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeBoard = async (nameT, statusId) => {
    let status = {
      id: statusId,
      name: nameT,
    };

    try {
      await axios.delete(
        `/board/delete-statues?boardId=${boardId}&statusId=${statusId}`,
        {
          headers: {
            Authorization: "Bearer " + props.authStore.userData.token,
          },
        }
      );
      console.log(status);
      props.boardStore.deleteStatusFromBoard(status);
    } catch (error) {
      console.log(error);
    }
  };

  const addCardHandler = (statusId, title) => {
    axios
      .post(
        "/item/item-create?boardId=" + boardId,
        {
          title: title,
          boardId: boardId,
          statusId: statusId,
          creator: { id: 1 },
        },
        {
          headers: {
            Authorization: "Bearer " + props.authStore.userData.token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.status >= 200 && response.status < 400) {
          props.boardStore.addItemToStatus(response.data);
        } else {
          console.log("fail to add");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeCard = async (statusId, cardId) => {
    try {
      await axios.delete(`/item/item-delete?itemId=${cardId}&boardId=${boardId}`,
        {
          headers: {
            Authorization: "Bearer " + props.authStore.userData.token,
          },
        }
      )
      props.boardStore.deleteItemFromStatus(statusId, cardId)
    } catch (error) {
      console.log(error);
    }

  };

  const updateCard = async (statusId, cardId, card) => {
    console.log("card : ", card);

    axios.put(`/item/item-update?itemId=${cardId}`, card,
      {
        headers: {
          Authorization: "Bearer " + props.authStore.userData.token,
        }
      })
      .then(function (response) {

        if (response.status >= 200 && response.status <= 400) {
          let updatedItem = response.data;
          props.boardStore.updateItem(statusId, cardId, updatedItem)

          // console.log(card);

          // const boardIndex = stauses.findIndex((item) => item.id === boardId);
          // if (boardIndex < 0) return;

          // const tempBoardsList = [...stauses];
          // const cards = tempBoardsList[boardIndex].cards;

          // const cardIndex = cards.findIndex((item) => item.id === cardId);
          // if (cardIndex < 0) return;

          // tempBoardsList[boardIndex].cards[cardIndex] = card;

          // setStatuses(tempBoardsList);
        } else {
          console.log("fail to add");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDragEnd = (boardId, cardId) => {
    const sourceBoardIndex = stauses.findIndex((item) => item.id === boardId);
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

  if (!props.boardStore.board?.statues) {
    return null;
  }

  return (
    <div className="app">
      <div className="app-nav">{/* <h1>{boardData.title}</h1> */}</div>

      <ChoseItemTypes boardItemTypes={props.boardStore.board.itemTypes} />

      <div className="app-boards-container">
        <div className="app-boards">
          {props.boardStore.board &&
            props.boardStore.board?.statues.map((item) => (
              <Board
                key={item.id}
                status={item}
                addCard={addCardHandler}
                removeBoard={() => removeBoard(item.name, item.id)}
                removeCard={removeCard}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}
                updateCard={updateCard}
                itemTypes={props.boardStore.board.itemTypes}
              // useresOnBoard={props.boardStore.usersOnBoard}
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

export default inject("boardStore", "authStore")(observer(Dashboard));
