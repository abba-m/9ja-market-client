import axios from "axios";
import { JSONRPCClient } from "json-rpc-2.0";
import { serverUrl } from "./baseUrl";

// const token = localStorage.getItem("token");

// JSONRPCClient needs to know how to send a JSON-RPC request.
// Tell it by passing a function to its constructor. The function must take a JSON-RPC request and send it.
export const rpcClient = new JSONRPCClient((jsonRPCRequest) =>
  axios({
    method: "post",
    url: `${serverUrl}json-rpc`,
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${localStorage.token}`,
    },
    data: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return rpcClient.receive(response.data);
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);