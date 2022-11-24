import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { rpcClient } from "services/rpcClient";
import { SocketClient } from "services/socket";
import { formatChatTime } from "utils/format.utils";
import { DotLoader } from "react-spinners";

import "../styles/chat.style.css";

const ChatBody = ({ recipientId, messages, setMessages }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const lastMessageRef = useRef(null);

  const getChatMessages = async () => {
    setIsLoading(true);
    try {
      const response = await rpcClient.request("getChatMessages", {
        recipientId,
      });

      setMessages(response);
    } catch (e) {
      toast({
        position: "top",
        title: e.message ?? "[Unknown]: Error occured",
        status: "error",
        isClosable: true,
      });
    }
    setIsLoading(false);
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
      <Box
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        h="64vh"
        className="message__container"
      >
        {!isLoading ? (
          <div>
            {messages?.length !== 0 &&
              messages?.map((message) => {
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
          <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
            <DotLoader color="#36d7b7" />
          </Flex>
        )}
      </Box>
    </>
  );
};

const ChatMessagePill = ({ message = {}, isSender = true }) => {
  return (
    <Flex
      color="blackAlpha.900"
      w="98%"
      direction="column"
      alignItems={isSender ? "end" : "start"}
      h="fit-content"
      key={message.messageId}
    >
      <Box
        bg={isSender ? "#c2f3c2" : "#f5ccc2"}
        w="fit-content"
        p={2}
        maxW={["60%", "40%"]}
        style={{ borderRadius: "0px 15px 15px 15px" }}
      >
        <Text fontSize="0.7rem">{message.text}</Text>
      </Box>
      <Text fontSize="0.5rem">{formatChatTime(message.createdAt)}</Text>
    </Flex>
  );
};

export default ChatBody;
