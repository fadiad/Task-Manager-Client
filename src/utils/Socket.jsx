import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { URL } from '../api/axios';



//const sock = SockJS(serverAddress + '/ws');
let stompClient;

const socketFactory = () => {
    const sock = new SockJS(URL + '/ws');
    return sock;
}


export const openConnection = (func) => {
    stompClient = Stomp.over(socketFactory);
    stompClient.connect({}, ()=>{
        func(stompClient)
    });
}



