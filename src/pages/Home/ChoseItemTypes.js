import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
//----------Select----------
import InputLabel from "@mui/material/InputLabel";
//--------------------
import { observer, inject } from "mobx-react";

import { Scissors } from "react-feather";

import axios from "../../api/axios";
import Dropdown from "../../components/Dropdown/Dropdown";
const CREATE_BOARD = "/user/board-create";

function ChoseItemTypes(props) {

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [showDropdownTypes, setShowDropdownTypes] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [listOfTypes, setListOfTypes] = useState(['TASK',
    'BUG',
    'SUBTASK',
    'TESTING',])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="creactNewBoard">

      <span variant="outlined" onClick={handleClickOpen}>
        <Scissors size={30} color="white" />
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
            <div className="cardinfo-box-title">
              <p>chose task types</p>
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
                {listOfTypes.map(type => <p>{type}</p>)}
              </Dropdown>
            )}
          </div>
        </DialogContent>

        <DialogActions>
          {/* <Button autoFocus onClick={createBoard}>
            Update
          </Button> */}

          <Button onClick={handleClose} autoFocus>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default inject("boardStore")(observer(ChoseItemTypes));
