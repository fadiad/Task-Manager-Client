
import React, { useEffect, useState } from 'react'

import { observer, inject } from 'mobx-react'

const BoardCard = (props) => {

    const showCardDetails = () => {
        console.log(props.board.id);
    }

    return (
        <div className='board-tile' onClick={() => showCardDetails()}>
            {props.board.title}
        </div>
    )
}

export default inject("boardStore")(observer(BoardCard))

