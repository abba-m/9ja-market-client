import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBody from "./chatComponents/ChatBody";
import ChatFooter from "./chatComponents/ChatFooter";
import ChatHeader from "./chatComponents/chatHeader";

const ChatMainArea = () => {
  const { userId } = useParams();
  const [recipientId, setRecipientId] = useState();

  useEffect(() => {
    setRecipientId(userId);
  }, [recipientId, userId]);

  return (
    <Box>
      <ChatHeader recipientId={recipientId} />
      <ChatBody recipientId={recipientId} />
      <ChatFooter recipientId={recipientId} />
    </Box>
  );
};

export default ChatMainArea;
