import { useEffect, useState } from "react";
import Board from "../../components/Board/Board";
import "./Dashboard.css";
import CustomInput from "../../components/CustomInput/CustomInput";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx"
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import { DragDropContext } from 'react-beautiful-dnd';

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
          creator: { id: props.authStore.userData.userDTO.id },
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
      await axios.delete(
        `/item/item-delete?itemId=${cardId}&boardId=${boardId}`,
        {
          headers: {
            Authorization: "Bearer " + props.authStore.userData.token,
          },
        }
      );
      props.boardStore.deleteItemFromStatus(statusId, cardId);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async (boardId, cardId, card) => {
    console.log("card : ", card);
    const response = await axios
      .put(`/item/item-update?itemId=${cardId}`, card)
      .then(function (response) {
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

  // const onDragEnd = (boardId, cardId) => {
  //   console.log(boardId, cardId);
  //   console.log("hiii");

  //   const sourceBoardIndex = stauses.findIndex((item) => item.id === boardId);
  //   if (sourceBoardIndex < 0) return;

  //   const sourceCardIndex = stauses[sourceBoardIndex]?.cards?.findIndex(
  //     (item) => item.id === cardId
  //   );
  //   if (sourceCardIndex < 0) return;

  //   const targetBoardIndex = stauses.findIndex(
  //     (item) => item.id === targetCard.boardId
  //   );
  //   if (targetBoardIndex < 0) return;

  //   const targetCardIndex = stauses[targetBoardIndex]?.cards?.findIndex(
  //     (item) => item.id === targetCard.cardId
  //   );
  //   if (targetCardIndex < 0) return;

  //   const tempBoardsList = [...stauses];
  //   const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
  //   tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
  //   tempBoardsList[targetBoardIndex].cards.splice(
  //     targetCardIndex,
  //     0,
  //     sourceCard
  //   );
  //   setStatuses(tempBoardsList);

  //   setTargetCard({
  //     boardId: 0,
  //     cardId: 0,
  //   });
  // };

  const onDragEnd = async(result) => {

    if (!result.destination){
      return;
    }
    const URL =`/board/updateItemStatus?itemId=${result.source.index}&boardId=${boardId}`
    console.log(result.destination.droppableId);//status id
    const destinationStatuses=toJS(props.boardStore.board.statues);//status id
    try {
      const destinationStatus=destinationStatuses.find(s=>s.id===parseInt(result.destination.droppableId))
      console.log(destinationStatus);
      if(!destinationStatus){
         return;
      }
       
      const response = await axios.put(URL,destinationStatus,{
        headers: {
          Authorization: "Bearer " + props.authStore.userData.token,
        },
      })
      console.log(response.data);
      props.boardStore.passItem(result.source, result.destination,response.data)
    } catch (error) {
      
    }

}

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
      <div className="app-nav">
        <h1>{props.boardStore.board.title}</h1>
      </div>

      {/* <ChoseItemTypes boardItemTypes={boardData.itemTypes} /> */}

      <div className="app-boards-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="app-boards">
            {props.boardStore.board &&
              props.boardStore.board?.statues.map((item) => (
                <Board
                  key={item.id}
                  status={item}
                  addCard={addCardHandler}
                  removeBoard={() => removeBoard(item.name, item.id)}
                  removeCard={removeCard}
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
        </DragDropContext>
      </div>
    </div>
  );
}

export default inject("boardStore", "authStore")(observer(Dashboard));
