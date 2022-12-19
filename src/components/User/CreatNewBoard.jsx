import React, { useState } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//----------List----------
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ListItemIcon } from '@mui/material';
import { IconButton } from '@mui/material';
//----------TextField----------
import TextField from '@mui/material/TextField';
//----------Select----------
import InputLabel from '@mui/material/InputLabel';
//--------------------
import { observer, inject } from 'mobx-react'
import '../../style/user.css'


function CreatNewBoard(props) {
    const [typeList, setTypeList] = useState(['TASK', 'BUG', 'SUBTASK', 'TESTING']);
    const [chosedTypeList, setChosedTypeList] = useState(
        {
            'TASK': false,
            'BUG': false,
            'TESTING': false,
            'SUBTASK': false
        }
    );
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);

    const validateTitle = () => {
        setOpen(false);
    };


    const [open, setOpen] = useState(false);
    const theme = useTheme();


    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createBoard = () => {
        props.boardStore.createBoard(title, chosedTypeList);
        setOpen(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value)

        if (e.target.value.length === 0) {
            setTitleError(true)
        } else {
            setTitleError(false)
        }
    }

    //---------List---------
    const handleToggle = (value) => () => {
        let temp = { ...chosedTypeList }

        if (temp[value] === true)
            temp[value] = false
        else if (temp[value] === false)
            temp[value] = true

        setChosedTypeList({ ...temp })
    };


    return (
        <div className='creactNewBoard'>
            <Button variant="outlined" onClick={handleClickOpen}>
                Creact new Board
            </Button>

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
                <DialogTitle id="responsive-dialog-title">
                    Creact new Board
                </DialogTitle>

                <br />
                <DialogContent>

                    <TextField
                        required
                        error={titleError}
                        id="outlined-required"
                        label="Board Title"
                        onChange={handleTitleChange}
                    />

                    <br />
                    <br />

                    <InputLabel id="demo-simple-select-helper-label">Task Types</InputLabel>

                    <div className='list'>
                        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                            {typeList.map((value, index) => {
                                const labelId = `checkbox-list-label-${value}`;

                                return (

                                    <ListItem
                                        key={value}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="comments">
                                            </IconButton>
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
                        Create
                    </Button>

                    <Button onClick={handleClose} autoFocus>
                        Cancle
                    </Button>

                </DialogActions>


            </Dialog>
        </div>
    );
}


export default inject("boardStore")(observer(CreatNewBoard))



