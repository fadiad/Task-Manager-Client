import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import Status from './Status'
import '../style/board.css'
import AddStatus from './AddStatus'
import { DragDropContext } from "react-beautiful-dnd";

const Board = (props) => {

    useEffect(() => {
        props.boardStore.getStatusesList()
    }, []);


    const onDragEnd = (result) => {
        // console.log("result : ", result);
        if (!result.destination)
            return;

        console.log("result : ", result);

        props.boardStore.passItem(result.source, result.destination)
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='board'>

                {props.boardStore.listOfStatuses.map((status, index) => {
                    return (
                        <Status status={status} key={index} index={index} />
                    )
                })
                }
                <AddStatus />
            </div>
        </DragDropContext>
    )
}

export default inject("boardStore")(observer(Board))
