import React from 'react'
import MyCard from './MyCard';
import '../../pages/Boardfadi/board.css'
import AddCard from './AddCard';
import { Droppable } from "react-beautiful-dnd";


const Status = ({ status }) => {

    return (
        <Droppable droppableId={String(status.id)}>

            {provided => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='status'
                >

                    {/* {console.log( "status id ",String(status.id))} */}
                    <h4>
                        {status.title}
                    </h4>

                    {status.cards.map((c) => {
                        return (
                            <MyCard card={c} key={c.id} id={c.id} index={c.id} />
                        )
                    })
                    }

                    <AddCard statusId={status.id} />
                    {provided.placeholder}

                </div>
            )}

        </Droppable>

    )
}

export default Status;