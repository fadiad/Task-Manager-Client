import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import { colorsList } from "../../../utils/utils";
import Modal from "../../Modal/Modal";
import { ChevronDown, ChevronUp } from "react-feather";

import CustomInput from "../../CustomInput/CustomInput";

import "./CardInfo.css";
import Chip from "../../Common/Chip";
import Dropdown from "../../Dropdown/Dropdown";

function CardInfo(props) {

  /* */
  const [showDropdownUsers, setShowDropdownUsers] = useState(false);
  const [showDropdownTypes, setShowDropdownTypes] = useState(false);
  const [showDropdownImportance, setShowDropdownImportance] = useState(false);

  const [listOfUsers, setListOfUsers] = useState([
    {
      id: 1,
      name: 'Khaled Wany'
    },
    {
      id: 2,
      name: 'Fadi Id'
    },
    {
      id: 3,
      name: 'Saray Shlomi'
    }
  ])



  const [listOfTypes, setlistOfTypes] = useState(['TASK', 'SUBTASK', 'BUG', 'TESTING'])



  const [importanceList, setImportanceList] = useState([1, 2, 3, 4, 5])
  /**/

  const { onClose, card, boardId, updateCard } = props;
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

  const updateDate = (date) => {
    if (!date) return;

    setCardValues({
      ...cardValues,
      date,
    });
  };

  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.id, cardValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardValues]);

  const calculatedPercent = calculatePercent();


  const updateImportance = (value) => {
    setCardValues({ ...cardValues, importance: value });
  };

  const updateTaskType = (value) => {
    setCardValues({ ...cardValues, type: value });
  };


  const updateAssignTo = (value) => {
    setCardValues({ ...cardValues, assignTo: value });
  };

  return (
    <Modal onClose={onClose}>

      <div className="cardinfo">

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
              <p>Date</p>
            </div>
            <input
              type="date"
              defaultValue={cardValues.date}
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



        {/* @@@@@@@@@@@@ */}

        <div className="flex-container">

          {/* <div className="cardinfo-box"> */}

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
                {listOfUsers.map(user => <p onClick={() => updateAssignTo(user)}>{user.name}</p>)}
              </Dropdown>
            )}
          </div>


          {/* ----------------------------------------- */}

          <div
            className="board-header-title-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdownTypes(prev => !prev)
            }}
          >
            <div className="cardinfo-box-title">
              <p  >Task Type</p>
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
          {/* ----------------------------------------- */}

          {/* ----------------------------------------- */}

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
        {/* ----------------------Done------------------- */}





        {/* <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo-box-labels">
            {cardValues.labels?.map((item, index) => (
              <Chip key={index} item={item} removeLabel={removeLabel} />
            ))}
          </div>
          <ul>
            {colorsList.map((item, index) => (
              <li
                key={index}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li-active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <CustomInput
            text="Add Label"
            placeholder="Enter label text"
            onSubmit={(value) =>
              addLabel({ color: selectedColor, text: value })
            }
          />
        </div> */}

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p>Comments</p>
          </div>
          {/* <div className="cardinfo-box-progress-bar">
            <div
              className="cardinfo-box-progress"
              style={{
                width: `${calculatedPercent}%`,
                backgroundColor: calculatedPercent === 100 ? "limegreen" : "",
              }}
            />
          </div> */}

          <div className="cardinfo-box-task-list">
            {cardValues.tasks?.map((item) => (
              <div key={item.id} className="cardinfo-box-task-checkbox">
                {/* <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                /> */}
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

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Modal>
  );
}

export default CardInfo;
