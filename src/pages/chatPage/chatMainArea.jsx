import { Box, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBody from "./chatComponents/chatBody";
import ChatFooter from "./chatComponents/chatFooter";
import ChatHeader from "./chatComponents/chatHeader";

const ChatMainArea = () => {
  const { userId } = useParams();
  const [recipientId, setRecipientId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setRecipientId(userId);
  }, [userId]);

  return (
    <Box>
      <ChatHeader recipientId={recipientId} />
      <Divider border=".1px" borderColor="secondary" mt="10px" />
      <ChatBody
        recipientId={recipientId}
        messages={messages}
        setMessages={setMessages}
      />
      <ChatFooter
        recipientId={recipientId}
        messages={messages}
        setMessages={setMessages}
      />
    </Box>
  );
};

export default ChatMainArea;
