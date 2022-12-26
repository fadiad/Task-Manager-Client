import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import { colorsList } from "../../../utils/utils";
import Modal from "../../Modal/Modal";
import { ChevronDown, ChevronUp } from "react-feather";
import Button from "@mui/material/Button";
import CustomInput from "../../CustomInput/CustomInput";

import "./CardInfo.css";
import Chip from "../../Common/Chip";
import Dropdown from "../../Dropdown/Dropdown";

import axios from "../../../api/axios";


function CardInfo(props) {

  const { onClose, card, boardId, updateCard, itemTypes, useresOnBoard } = props;

  const [showDropdownUsers, setShowDropdownUsers] = useState(false);
  const [showDropdownTypes, setShowDropdownTypes] = useState(false);
  const [showDropdownImportance, setShowDropdownImportance] = useState(false);

  const [listOfUsers, setListOfUsers] = useState([...useresOnBoard])

  const [listOfTypes, setlistOfTypes] = useState([...itemTypes])

  const [importanceList, setImportanceList] = useState([1, 2, 3, 4, 5])

  const [selectedColor, setSelectedColor] = useState("");
  const [cardValues, setCardValues] = useState({
    ...card,
  });

  const updateTitle = (value) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDesc = (value) => {
    setCardValues({ ...cardValues, desc: value });
  };

  const addLabel = (label) => {
    const index = cardValues.labels.findIndex(
      (item) => item.text === label.text,
    );
    if (index > -1) return; //if label text already exist then return

    setSelectedColor("");
    setCardValues({
      ...cardValues,
      labels: [...cardValues.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = cardValues.labels.filter(
      (item) => item.text !== label.text,
    );

    setCardValues({
      ...cardValues,
      labels: tempLabels,
    });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({
      ...cardValues,
      tasks: [...cardValues.tasks, task],
    });
  };

  const removeTask = (id) => {
    const tasks = [...cardValues.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setCardValues({
      ...cardValues,
      tasks: tempTasks,
    });
  };

  const updateTask = (id, value) => {
    const tasks = [...cardValues.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardValues({
      ...cardValues,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!cardValues.tasks?.length) return 0;
    const completed = cardValues.tasks?.filter(
      (item) => item.completed,
    )?.length;
    return (completed / cardValues.tasks?.length) * 100;
  };

  const updateDate = (dueDate) => {
    if (!dueDate) return;

    setCardValues({
      ...cardValues,
      dueDate,
    });
  };


  const calculatedPercent = calculatePercent();


  const updateImportance = (value) => {
    setCardValues({ ...cardValues, importance: value });
  };

  const updateTaskType = (value) => {
    setCardValues({ ...cardValues, itemType: value });
  };


  const updateAssignTo = async (userId, itemId, name) => {// item-assignTO/{boardId}

    const response = await axios.put(`/item/item-assignTO/4?itemId=${card.id}&userId=${userId}`,).then(function (response) {
      if (response.status >= 200 && response.status <= 400) {
        setCardValues({ ...cardValues, assignTo: { id: userId, username: name } });
        // updateCardDetails();
      } else {
        console.log("fail to add");
      }
    })
      .catch(function (error) {
        console.log(error);
      });

  };


  const updateCardDetails = () => {
    console.log(cardValues.id, cardValues);
    updateCard(boardId, cardValues.id, cardValues);
  }

  return (
    <Modal onClose={onClose}>

      <div className="cardinfo">

        {/* <div className="drop"> */}
        <div className="flex-container">
          <div className="cardinfo-box">

            <div className="cardinfo-box-title">
              <Type />
              <p>Title</p>
            </div>
            <CustomInput
              defaultValue={cardValues.title}
              text={cardValues.title}
              placeholder="Enter Title"
              onSubmit={updateTitle}
            />
          </div>

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <Calendar />
              <p>Due Date</p>
            </div>
            <input
              type="date"
              defaultValue={cardValues.dueDate}
              min={new Date().toISOString().substr(0, 10)}
              onChange={(event) => updateDate(event.target.value)}
            />
          </div>

        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Description</p>
          </div>
          <CustomInput
            defaultValue={cardValues.desc}
            text={cardValues.desc || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
          />
        </div>

        <div className="flex-container">


          <div
            className="board-header-title-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdownUsers(prev => !prev)
            }}
          >
            <div className="cardinfo-box-title">
              <p>Asign User</p>
            </div>

            {showDropdownUsers && (
              <Dropdown
                style="left-drop"
                class="board-dropdown"
                onClose={(event) => {
                  event.stopPropagation();
                  setShowDropdownUsers(false)
                }}
              >
                {listOfUsers.map(user => <p onClick={() => updateAssignTo(user.id, card.id, user.username)}>{user.username}</p>)}
              </Dropdown>
            )}
          </div>

          <div
            className="board-header-title-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdownTypes(prev => !prev)
            }}
          >
            <div className="cardinfo-box-title">
              <p>Task Type</p>
            </div>
            {showDropdownTypes && (
              <Dropdown
                style="left-drop"
                class="board-dropdown"
                onClose={(event) => {
                  event.stopPropagation();
                  setShowDropdownTypes(false)
                }}
              >
                {listOfTypes.map(type => <p onClick={() => { updateTaskType(type) }}>{type}</p>)}
              </Dropdown>
            )}
          </div>

          <div
            className="board-header-title-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdownImportance(prev => !prev)
            }}
          >
            <div className="cardinfo-box-title">
              <p  >Importance</p>
            </div>
            {showDropdownImportance && (
              <Dropdown
                style="left-drop"
                class="board-dropdown"
                onClose={(event) => {
                  event.stopPropagation();
                  setShowDropdownImportance(false)
                }}
              >
                {importanceList.map(n => <p onClick={() => updateImportance(n)}>{n}</p>)}
              </Dropdown>
            )}

          </div>

        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Comments</p>
          </div>


          <div className="cardinfo-box-task-list">
            {cardValues.tasks?.map((item) => (
              <div key={item.id} className="cardinfo-box-task-checkbox">
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
          <CustomInput
            text={"Add a Comment"}
            placeholder="Enter Comment"
            onSubmit={addTask}
          />
        </div>

        <div style={{ "text-align": "center" }}>
          <Button onClick={() => updateCardDetails()}>Update</Button>
          <Button onClick={onClose}>Cancle</Button>
        </div>

      </div>


      {/* 
      <div className="drop">



        <div style={{ "text-align": "center", "margin-top": "20px" }}>
          <Button onClick={() => updateCardDetails()}>Update</Button>
          <Button onClick={onClose}>Cancle</Button>
        </div>

      </div> */}



      {/* </div> */}
    </Modal>
  );
}

export default CardInfo;
