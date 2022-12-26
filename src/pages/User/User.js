import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import CreatNewBoard from './CreatNewBoard'
import Boards from '../../components/Boards/Boards'
import Setting from './Setting'
import { ToastNotifications } from '../../components/Common/ToastNotifications'

// import '../../style/board.css'


const User = (props) => {

    return (
        <div>
            <Setting />
            <ToastNotifications />
            <Boards />
        </div>
    )
}

export default inject("boardStore")(observer(User))

