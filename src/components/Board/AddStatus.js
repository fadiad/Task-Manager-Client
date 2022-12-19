
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Card } from '@mui/material';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@mui/material/Button';
import { observer, inject } from 'mobx-react'

const AddStatus = (props) => {

    const [formOpen, openForm] = useState(false);
    const [title, setTitle] = useState("");

    const handleInputChang = (e) => {
        setTitle(e.target.value)
    }

    const addStatus = () => {
        console.log("addStatus");
        props.boardStore.addStatus(title)
    }

    const closeForm = () => {
        openForm(false)
    }

    const renderForm = () => {
        return (
            <div>
                <Card style={{
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}>
                    <TextareaAutosize
                        placeholder='Enter a title for the card'
                        autoFocus 
                        // onBlur={() => openForm(false)}
                        value={title}
                        onChange={handleInputChang}
                        style={{
                            resize: "none",
                            width: "100%",
                            outline: "none",
                            border: "none"
                        }}
                    />
                </Card>
                <div>
                    <Button onClick={() => addStatus()} variant="contained" style={{ color: "white", backgroundColor: "#5aac44", marginTop: 10 }} >Add Status</Button>
                </div>
            </div >
        )
    }

    const renderAddButton = () => {
        return (
            <div className='AddCard' onClick={() => openForm(true)}>
                <AddIcon />
                <p>Add another List</p>
            </div>
        )
    }

    return formOpen ? renderForm() : renderAddButton()
}

export default inject("boardStore")(observer(AddStatus))
