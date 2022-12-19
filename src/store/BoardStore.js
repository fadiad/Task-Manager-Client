
import { observable, action, makeAutoObservable } from 'mobx'

export class BoardStore {

    constructor() {
        this.listOfStatuses = []

        makeAutoObservable(this, {
            listOfStatuses: observable,
            getStatusesList: action,
            addCard: action,
            addStatus: action,
            passItem: action,
        })
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
        // const newList = [...this.listOfStatuses]

        // const sourceSection = newList.find(s => {
        //     return s.id === parseInt(source.droppableId)
        // })

        // const destinationSection = newList.find(s => s.id === parseInt(destination.droppableId))

        // destinationSection.cards.push({ id: parseInt(source.droppableId), text })
        // this.listOfStatuses = newList;
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


