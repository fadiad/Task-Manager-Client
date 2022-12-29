import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { itemsTypes } from "../../utils/utils";
//--------------------
import { observer, inject } from "mobx-react";
import { Bell, Plus, Minus } from "react-feather";

import axios from "../../api/axios";
import './Dashboard.css'
function ChoseItemTypes(props) {

  const [open, setOpen] = useState(false);
  const [itemTypes, setItemTypes] = useState([]);
  const theme = useTheme();
  const [showDropdownTypes, setShowDropdownTypes] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [listOfTypes, setListOfTypes] = useState({})

  const handleClickOpen = () => {
    setOpen(true)
    // setItemTypes(props.itemTypes)
  };

  useEffect(() => {
    //  setItemTypes(props.itemTypes)
    console.log(props.itemTypes);
  }, [])

  const handleClose = () => {
    setOpen(false);
  };


  const addItem = (type) => {
    console.log(type);
    axios.post(
      `/board/add-itemType?boardId=${props.boardStore.board.id}`, { type: type }, {
      headers: {
        Authorization: "Bearer " + props.authStore.userData.token,
      },
    }).then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        props.boardStore.addItemType(type);
      } else {
        console.log("fail to add");
      }

    }).catch(function (error) {
      console.log(error);
    });
  }

  const deleteItem = (type) => {
    console.log(type);
    axios.put(
      `/board/delete-itemType?boardId=${props.boardStore.board.id}`, { type: type }, {
      headers: {
        Authorization: "Bearer " + props.authStore.userData.token,
      },
    }).then(function (response) {
      console.log(response.data);

      if (response.status >= 200 && response.status < 400) {
        props.boardStore.deleteItemType(type);
      } else {
        console.log("fail to add");
      }

    }).catch(function (error) {
      console.log(error);
    });
  }



  return (
    <div className="creactNewBoard">

      <span className="notifications-icon" variant="outlined" onClick={handleClickOpen}>
        <Bell size={30} color="white" />
      </span>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "1500%",
              maxWidth: "600px",
              height: "70%",
              maxheight: "400px",
            },
          },
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Task Types</DialogTitle>
        <DialogContent>

          <div
            className="board-header-title-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdownTypes(prev => !prev)
            }}
          >

            {itemsTypes.map((type, index) => {

              return (<p className="item-type" key={index}>
                <span className="item">{type}</span>
                <span className="item-icon">
                  {
                    props.boardStore.board.itemTypes.find((t) => t === type)

                      ? <Minus size={"13px"} onClick={() => deleteItem(type)} />
                      : <Plus size={"13px"} onClick={() => addItem(type)} />
                  }
                </span>
              </p>)
            })}

          </div>
        </DialogContent>

        <DialogActions>


          <Button onClick={handleClose} autoFocus>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default inject("boardStore", "authStore")(observer(ChoseItemTypes));
