import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { rpcClient } from "services/rpcClient";
import { SocketClient } from "services/socket";
import { formatChatTime } from "utils/format.utils";
import { BallTriangle } from  "react-loader-spinner";

import "../styles/chat.style.css";

const ChatBody = ({ recipientId, messages, setMessages }) => {
  const [isLoading, setIsLoading] = useState(false);
  const lastMessageRef = useRef(null);

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
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    getChatMessages();
  }, [recipientId]);
  return (
    <>
      <div className="message__container">
        {!isLoading ? (
          <div>
            {messages.length && messages.map((message) => {
              const isSender = message.recipientId === recipientId;
              return (
                <ChatMessagePill 
                  key={message.messageId}
                  isSender={isSender}
                  message={message}
                />
              );
            })}
            <div ref={lastMessageRef} />
          </div>
        ) : (
          <Flex
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
          >
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </Flex>
        )}

        {/* This is triggered when a user is typing */}
        {/* <div className="message__status">
          <p>Typing...</p>
        </div> */}
      </div>
    </>
  );
};

const ChatMessagePill = ({ message = {}, isSender = true }) => {
  return (
    <Flex
      color="blackAlpha.900"
      w="100%"
      direction="column"
      alignItems={isSender ? "end" : "start"}
      h="fit-content"
    >
      <Box 
        bg={isSender ? "#c2f3c2" : "#f5ccc2" }
        w="fit-content"
        p={2} 
        maxW={["60%", "40%"]}
        style={{borderRadius: "0px 15px 15px 15px"}} 
      >
        <Text>{message.text}</Text>
      </Box>
      <Text>{formatChatTime(message.createdAt)}</Text>
    </Flex>
  );
};

export default ChatBody;
