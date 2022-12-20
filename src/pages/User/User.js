import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import CreatNewBoard from './CreatNewBoard'

// import '../../style/board.css'


const User = (props) => {

    return (
        <div>
            <h2>User Page</h2>
            <CreatNewBoard text="Create"/>
        </div>
    )
}

export default inject("boardStore")(observer(User))

