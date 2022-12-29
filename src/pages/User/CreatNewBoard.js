import React, { useState } from "react";
import { itemsTypes } from "../../utils/utils";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
//----------List----------
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { ListItemIcon } from "@mui/material";
import { IconButton } from "@mui/material";

//----------Select----------
import InputLabel from "@mui/material/InputLabel";
//--------------------
import { observer, inject } from "mobx-react";
import "./user.css";
import axios from "../../api/axios";

const CREATE_BOARD = "/board/board-create";

function CreatNewBoard(props) {

  const [chosedTypeList, setChosedTypeList] = useState({
    TASK: false,
    BUG: false,
    TESTING: false,
    SUBTASK: false,
  });

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  const validateTitle = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    const checkedTypes = {};
    itemsTypes.forEach((type) => (checkedTypes[type] = false));
    console.log(props.types);

    if (props.types !== undefined) {
      props.types.forEach((type) => (checkedTypes[type] = true));
    }

    setChosedTypeList(checkedTypes);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createBoard = async () => {
    if (title.trim() !== "") {
      const checkedTypes = itemsTypes.filter((item) => chosedTypeList[item]);
      try {
        const response = await axios.post("/board/board-create", {
          title,
          itemTypes: checkedTypes,
        },{
          headers: {
            Authorization: "Bearer " + props.authStore.userData.token,
          },
        });
        props.authStore.createBoard(response.data);
        setOpen(false);
      } catch (error) {
        console.log(error);
      }

    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);

    if (e.target.value.length === 0) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  //---------List---------
  const handleToggle = (value) => () => {
    let temp = { ...chosedTypeList };
    const item = itemsTypes;
    if (temp[value] === true) temp[value] = false;
    else if (temp[value] === false) temp[value] = true;

    setChosedTypeList({ ...temp });
  };

  return (
    <div className="creactNewBoard">
      {/* <Button variant="outlined" onClick={handleClickOpen}> */}
      <span onClick={handleClickOpen}>{`${props.text} Board`}</span>

      {/* </Button> */}

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
        <DialogTitle id="responsive-dialog-title">{`${props.text} Board`}</DialogTitle>

        <br />
        <DialogContent>
          <input
            className="title-input"
            type="text"
            placeholder="Board Title"
            required
            onChange={handleTitleChange}
          />
          <br />
          <br />

          <InputLabel id="demo-simple-select-helper-label">
            Task Types
          </InputLabel>

          <div className="list">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {itemsTypes.map((value, index) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments"></IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={chosedTypeList[value]}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={createBoard}>
            {props.text}
          </Button>

          <Button onClick={handleClose} autoFocus>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default inject("boardStore","authStore")(observer(CreatNewBoard));
