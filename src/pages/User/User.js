import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import CreatNewBoard from './CreatNewBoard'
import Boards from '../../components/Boards/Boards'

// import '../../style/board.css'


const User = (props) => {

    return (
        <div>
            <CreatNewBoard text="Create" />
            <Boards />
        </div>
    )
}

export default inject("boardStore")(observer(User))

