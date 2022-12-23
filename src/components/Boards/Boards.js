
import React, { useEffect, useState } from 'react'
import { observer, inject } from 'mobx-react'
import BoardCard from './BoardCard';
import './style.css'
import axios from '../../api/axios';
// import AddCard from '../Boardfadi/AddCard';

const Boards = (props) => {
    const [boards, setBoards] = useState([
        {
            id: 1,
            title: "ChatApp"
        },
        {
            id: 2,
            title: "Elevation Manager"
        },
        {
            id: 2,
            title: "Elevation Manager"
        }, {
            id: 2,
            title: "Elevation Manager"
        }
        , {
            id: 2,
            title: "Elevation Manager"
        },
        {
            id: 2,
            title: "Elevation Manager"
        },
        {
            id: 2,
            title: "Elevation Manager"
        }

    ])

    useEffect(async () => {
        let res = await axios.get(`http://localhost:8080/user/boards-get?userId=${this.userDTO.id}`);
        this.userBoards = res.data;
        let cards = [{ id: 1, }]

        setBoards(res.data);
    }, []);


    return (
        <div className='board-pag'>
            <h1>Boards</h1>
            <div className='boards-grid'>
                {boards.map((board, index) => {
                    return (
                        <BoardCard board={board} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default inject("boardStore")(observer(Boards))

