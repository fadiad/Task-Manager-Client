
import React, { useEffect, useState } from 'react'
import { observer, inject } from 'mobx-react'
import BoardCard from './BoardCard';
import './style.css'
import axios from '../../api/axios';


const Boards = (props) => {
    const [boards, setBoards] = useState([])

    useEffect(async () => {
        
        try {
            let res = await axios.get(`http://localhost:8080/board/get-boards-by-userId?userId=1`);
            setBoards(res.data);
        } catch (error) {
            console.log("ASd");
        }

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

