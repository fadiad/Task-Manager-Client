import React, { useState } from "react";
import {
  AlignLeft,
  CheckSquare,
  Clock,
  MoreHorizontal,
  Star,
  User,
} from "react-feather";
import Chip from "../Common/Chip";
import Dropdown from "../Dropdown/Dropdown";
import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
import { formatDate } from "../../utils/utils";
import { colorsList } from "../../utils/utils";
import { Draggable } from "react-beautiful-dnd";

function Card(props) {
  const { card, boardId, removeCard, updateCard, itemTypes, useresOnBoard } =
    props;
  const { id, title, desc, dueDate, tasks, itemType, assignTo } = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (

    <React.Fragment>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
          itemTypes={itemTypes}
          useresOnBoard={useresOnBoard}
        />
      )}

      <Draggable draggableId={String(card.id)} index={card.id}>
        {(provided, snapshot) => (

          <div
            className="card"
            key={card.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setShowModal(true)}
          >
            <div className="card-top">
              <div className="card-top-labels">
                {itemTypes.find((type) => type === itemType) ? (
                  <span
                    style={{
                      backgroundColor: colorsList[itemType],
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  >
                    {itemType}
                  </span>
                ) : null}
              </div>

              <div
                className="card-top-more"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowDropdown(true);
                }}
              >
                <MoreHorizontal />
                {showDropdown && (
                  <Dropdown
                    class="board-dropdown"
                    onClose={() => setShowDropdown(false)}
                  >
                    <p onClick={() => removeCard(boardId, id)}>Delete Card</p>
                  </Dropdown>
                )}
              </div>
            </div>

            <div className="card-title">{title}</div>
            <div></div>
            <div className="card-footer">
              {dueDate && (
                <p className="card-footer-item">
                  <Clock className="card-footer-icon" />
                  {formatDate(dueDate)}
                </p>
              )}

              {card.assignTo ? (
                <p className="importance-p user">
                  <User size={12} color="black" />
                  <span className="importance-txt">
                    {" "}
                    {card.assignTo.username != null
                      ? card.assignTo.username.charAt(0)
                      : null}
                  </span>
                </p>
              ) : null}
              {card.importance ? (
                <p className="importance-p">
                  <span className="importance-txt"> {card.importance}</span>
                  <Star size={15} color="gold" /> 
                </p>
              ) : null}
            </div>
          </div>
        )}
      </Draggable>
    </React.Fragment>
  );
}

export default Card;
