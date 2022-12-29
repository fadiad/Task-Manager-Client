
import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Draggable } from "react-beautiful-dnd";


const MyCard = ({ card, id, index }) => {
    return (
        
        <Draggable draggableId={String(id)} index={index} >
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                      {/* {console.log("card id ", String(id))} */}
                    <Card style={styles.CardContent}>
                        <CardContent>
                            <Typography>{card.text}</Typography>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}


const styles = {
    CardContent: {
        "marginBottom": "8px"
    }
}

export default MyCard;