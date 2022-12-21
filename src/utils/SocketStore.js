import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { URL } from "../api/axios";

const socketFactory = () => {
  const sock = new SockJS(URL + "/ws");
  return sock;
};

class Socket {
  constructor() {
    this.stompClient = Stomp.over(socketFactory);
  }

  setAuth = (data) => {
    const { userDTO, token } = data;
    console.log(userDTO, token);
  };

  onUserSub = () => {};
  openConnection = () => {
    stompClient = Stomp.over(socketFactory);
    stompClient.connect({}, () => {});
  };
}

const socket = new Socket();

export default socket;
