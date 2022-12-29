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
    // let temp = [...itemTypes]
    // temp.push(type)
    // setItemTypes(...temp)
  }

  const deleteItem = (type) => {
    console.log(type);
    // let temp = [...itemTypes]

    // const index = temp.indexOf(type);
    // temp.splice(index, 1);

    // console.log(index);
    // setItemTypes(...temp)
  }

  // props.boardItemTypes.forEach(element => {
  //   listOfTypes[element] = element
  // });

  return (
    <div className="creactNewBoard">

      <span variant="outlined" onClick={handleClickOpen}>
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

            {itemTypes.map((type, index) => {
              return (<p className="item-type" key={index}>
                <span className="item">{type}</span>

                {/* {
                  listOfTypes[type]
                    ? <Minus size={"13px"} onClick={() => deleteItem(type)} />
                    : <Plus size={"13px"} onClick={() => addItem(type)} />
                } */}

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

export default inject("boardStore")(observer(ChoseItemTypes));
