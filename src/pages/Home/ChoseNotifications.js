import React, { useState } from "react";
import { notificationsTypes, notificationsWay } from "../../utils/utils";
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

import { Settings } from "react-feather";

import axios from "../../api/axios";
const CREATE_BOARD = "/user/board-create";

function ChoseNotifications(props) {

  const [chosedTypeList, setChosedTypeList] = useState({});


  const [chosedNotificationsWay, setChosedNotificationsWay] = useState({});

  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {

    const checkedTypes = {};
    const checkedTypesWay = {};

    notificationsTypes.forEach((type) => (checkedTypes[type] = false));

    notificationsWay.forEach((type) => (checkedTypesWay[type] = false));


    if (props.types !== undefined) {
      props.types.forEach((type) => (checkedTypes[type] = true));
    }

    if (props.typesWays !== undefined) {
      props.typesWays.forEach((type) => (checkedTypesWay[type] = true));
    }

    setChosedTypeList(checkedTypes);
    setChosedNotificationsWay(checkedTypesWay);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createBoard = async () => {

    const checkedTypes = notificationsTypes.filter((item) => chosedTypeList[item]);
    const way = notificationsWay.filter((item) => chosedNotificationsWay[item]);

    console.log(checkedTypes);
    console.log(way);
    // try {
    //   const res = await axios.post(CREATE_BOARD, {
    //     itemTypes: checkedTypes,
    //   });
    //   setOpen(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  //---------List---------
  const handleToggle = (value) => () => {
    let temp = { ...chosedTypeList };
    const item = notificationsTypes;
    if (temp[value] === true) temp[value] = false;
    else if (temp[value] === false) temp[value] = true;

    setChosedTypeList({ ...temp });
  };


  const handleToggleWay = (value) => () => {
    let temp = { ...chosedNotificationsWay };
    if (temp[value] === true) temp[value] = false;
    else if (temp[value] === false) temp[value] = true;

    setChosedNotificationsWay({ ...temp });
  };

  return (
    <div className="creactNewBoard">

      <span variant="outlined" onClick={handleClickOpen}>
        <Settings size={30} color="white" />
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
        <DialogTitle id="responsive-dialog-title">Notifications Board</DialogTitle>
        <DialogContent>


          <InputLabel id="demo-simple-select-helper-label">
            Chose Notifications
          </InputLabel>

          <div className="list">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {notificationsWay.map((value, index) => {
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
                      onClick={handleToggleWay(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={chosedNotificationsWay[value]}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>

          <hr style={{ width: "500px ", "text-align": "center" }} />

          <div className="list">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {notificationsTypes.map((value, index) => {
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
            Update
          </Button>

          <Button onClick={handleClose} autoFocus>
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default inject("boardStore")(observer(ChoseNotifications));
