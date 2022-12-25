
import { observable, action, makeAutoObservable } from 'mobx'
import axios from '../api/axios'

export class BoardStore {

    constructor() {
        this.listOfStatuses = []
        this.clickedBoardId = 0

        makeAutoObservable(this, {
            listOfStatuses: observable,
            clickedBoard: observable,
            getStatusesList: action,
            addCard: action,
            addStatus: action,
            passItem: action,
        })
    }

    setClickedBoard = (clickedBoardId) => {
        this.clickedBoardId = clickedBoardId
        console.log(this.clickedBoardId);
    }

    getStatusesList = () => {
        let list = [
            {
                title: "TODO",
                id: 0,
                cards: [
                    {
                        id: 2,
                        text: "login front and back ends"
                    },
                    {
                        id: 3,
                        text: "registration"
                    }
                ]
            },
            {
                title: "INPROGRESS",
                id: 1,
                cards: [
                    {
                        id: 4,
                        text: "abdasdasdasd"
                    },
                    {
                        id: 5,
                        text: "weqweqweqwe"
                    }
                ]
            }
        ]

        this.listOfStatuses = [...list];
    }

    addCard = (id, text) => {
        const newList = [...this.listOfStatuses]
        const section = newList.find(s => s.id === id)
        section.cards.push({ id, text })
        this.listOfStatuses = newList;
    }

    addStatus = (title) => {
        const newList = [...this.listOfStatuses]
        this.listOfStatuses.push(
            {
                title: title,
                id: 5,
                cards: []
            }
        )
    }


    passItem = (source, destination) => {
   
    }

    createBoard = async (title, types) => {
        console.log(title, types);
        const body = {
            title: title,
            types: types
        }

        // let data = await fetch(`http://localhost:8080/`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(body)
        // })

    }

}


