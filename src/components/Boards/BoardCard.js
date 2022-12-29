
import React, { useEffect, useState } from 'react'

import { observer, inject } from 'mobx-react'
import axios from '../../api/axios';

const BoardCard = (props) => {

    const showCardDetails = () => {
        try {
            
        } catch (error) {
            
        }
        props.boardStore.setClickedBoard(props.board.id);
    }

    return (
        <div className='board-tile' onClick={() => showCardDetails()}>
            {props.board.title}
        </div>
    )
}

export default inject("boardStore")(observer(BoardCard))

