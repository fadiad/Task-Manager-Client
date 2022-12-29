import React, { useEffect, useState } from "react";
import { observer, inject } from "mobx-react";
import BoardCard from "./BoardCard";
import "./style.css";
import axios from "../../api/axios";
import { DragDropContext } from "react-beautiful-dnd";


const Boards = (props) => {

  useEffect(() => {
    const fetchUserBoards = async () => {
      try {
        console.log(props.authStore.userData.token);
        let res = await axios.get(`/user/get-boards-by-userId`, {
          headers: {
            Authorization: "Bearer " + props.authStore.userData.token,
          },
        });
        props.authStore.setListOfBoards(res.data);
      } catch (error) {
        console.log("ASd");
      }
    };
    fetchUserBoards();
  }, []);

  if (!props.authStore.listOfBoards) {
    return null;
  }

  return (
    <div className="board-pag">
      <h1>Boards</h1>
      <div className="boards-grid">
        {props.authStore.listOfBoards.map((board, index) => {
          return (
            <BoardCard board={board} key={index}/>
          );
        })}
      </div>
    </div>
  );
};

export default inject("boardStore", "authStore")(observer(Boards));
