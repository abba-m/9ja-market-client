import socketIO from "socket.io-client";

class ClientSocketClass {
  client = null;
  token = localStorage.token;

  init () {
    if (this.client) {
      this.client.disconnect();
    }

    this.client = socketIO.connect("http://localhost:1335/", {
      query: {
        token: this.token,
      }
    });

    // this.client.on("message:new-message", (data) => {});

    return this.client;
  }
}

export const SocketClient = new ClientSocketClass();
