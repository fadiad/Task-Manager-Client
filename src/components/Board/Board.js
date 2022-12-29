import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import { observer, inject } from "mobx-react";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import CustomInput from "../CustomInput/CustomInput";

// import ChoseNotifications from "./ChoseNotifications";

import "./Board.css";
import ChoseNotifications from "../../pages/Home/ChoseItemTypes";

function Board(props) {
  const {
    status,
    addCard,
    removeBoard,
    removeCard,
    updateCard,
    itemTypes,
    // useresOnBoard,
  } = props;
  const board = status;

  const cards = props.boardStore.itemFilteredByStatus[board.id];
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Droppable droppableId={String(status.id)}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="board"
        >
          <div className="board-inner" key={board?.id}>
            <div className="board-header">
              <p className="board-header-title">
                {board?.name}
                <span>{board?.cards?.length || 0}</span>
              </p>

              <div
                className="board-header-title-more"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowDropdown((prev) => !prev);
                }}
              >
                <MoreHorizontal />
                {showDropdown && (
                  <Dropdown
                    class="board-dropdown"
                    onClose={(event) => {
                      event.stopPropagation();
                      setShowDropdown(false);
                    }}
                  >
                    <p onClick={() => removeBoard(board?.name, board?.id)}>
                      Delete Board
                    </p>
                  </Dropdown>
                )}
              </div>
            </div>
            <div className="board-cards custom-scroll">
              {cards?.map((item) => (
                <Card
                  key={item.id}
                  card={item}
                  boardId={board.id}
                  removeCard={removeCard}
                  updateCard={updateCard}
                  itemTypes={itemTypes}
                  // useresOnBoard={useresOnBoard}
                />
              ))}
              <CustomInput
                text="+ Add Card"
                placeholder="Enter Card Title"
                displayClass="board-add-card"
                editClass="board-add-card-edit"
                onSubmit={(value) => addCard(board?.id, value)}
              />
            </div>
          </div>
           {provided.placeholder}

        </div>
      )}
    </Droppable>
  );
}
export default inject("boardStore")(observer(Board));
