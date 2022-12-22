import React, { useState } from "react";
import { AlignLeft, CheckSquare, Clock, MoreHorizontal, Star, User } from "react-feather";
import Chip from "../Common/Chip";
import Dropdown from "../Dropdown/Dropdown";
import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
import { formatDate } from "../../utils/utils";
import { colorsList } from "../../utils/utils";


function Card(props) {

  // const [typeColor, setTypeColor] = useState(colorsList);
  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard } =
    props;
  const { id, title, desc, date, tasks, type, assignTo } = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}


      <div
        className="card"
        key={card.id}
        draggable
        onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card-top">

          <div className="card-top-labels">
            <span style={{ "background-color": colorsList[type], borderRadius: "5px", padding: "5px" }}>{type}</span>
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
        <div>

          {/* <p title={desc}>
            <AlignLeft />
          </p> */}

        </div>
        <div className="card-footer">
          {date && (
            <p className="card-footer-item">
              <Clock className="card-footer-icon" />
              {formatDate(date)}
            </p>
          )}


          {card.assignTo ?
            <p className="importance-p user">
              <User size={12} color="black" />
              <span className="importance-txt"> {card.assignTo.name.charAt(0)}</span>
            </p> : null
          }
          {card.importance ?
            <p className="importance-p">
              <span className="importance-txt"> {card.importance}</span>
              <Star size={15} color="gold" />
            </p> : null
          }
        </div>
      </div>
    </>
  );
}

export default Card;
