
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Card } from '@mui/material';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '@mui/material/Button';
import { observer, inject } from 'mobx-react'

const AddCard = (props) => {

    const [formOpen, openForm] = useState(false);
    const [text, setText] = useState("");

    const handleInputChang = (e) => {
        setText(e.target.value)
    }

    const addCard = () => {
       
        props.boardStore.addCard(props.statusId, text);
        // props.AddCard
       
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
                        // autoFocus onBlur={this.closeForm}
                        value={text}
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
                    <Button onClick={() => addCard()} variant="contained" style={{ color: "white", backgroundColor: "#5aac44", marginTop: 10 }} >Add Card</Button>
                </div>
            </div >
        )
    }

    const renderAddButton = () => {
        return (
            <div className='AddCard' onClick={() => openForm(true)}>
                <AddIcon />
                <p>Add another card</p>
            </div>
        )
    }
    return formOpen ? renderForm() : renderAddButton();
}

export default inject("boardStore")(observer(AddCard))
