import { Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { rpcClient } from "services/rpcClient";
import { SocketClient } from "services/socket";

const ChatBody = ({ recipientId }) => {
  const [messages, setMessages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getChatMessages = async () => {
    setIsLoading(true);
    const response = await rpcClient.request("getChatMessages", {
      recipientId,
    });
    console.log(response);
    setIsLoading(false);

    if (response === null) throw new Error("Something went wrong");
    setMessages(response);
  };

  useEffect(() => {
    SocketClient.client?.on("message:receive-message", (data) =>
      setMessages([...messages, data])
    );
  }, [messages]);

  useEffect(() => {
    getChatMessages();
  }, [recipientId]);
  return (
    <>
      <div className="message__container">
        {!isLoading ? (
          <div>
            {messages?.map((message) =>
              message.recipientId === recipientId ? (
                <div className="message__chats" key={message.id}>
                  <p className="sender__name">You</p>
                  <div className="message__sender">
                    <p>{message.text}</p>
                  </div>
                  <div />
                </div>
              ) : (
                <div className="message__chats" key={message.id}>
                  <p>{message.name}</p>
                  <div className="message__recipient">
                    <p>{message?.text}</p>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <Spinner />
        )}

        {/* This is triggered when a user is typing */}
        <div className="message__status">
          <p>Typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
