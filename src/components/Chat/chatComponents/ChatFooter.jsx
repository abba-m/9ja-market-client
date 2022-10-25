import { Button, Icon, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrSend } from "react-icons/gr";
import { SocketClient } from "services/socket";

const ChatFooter = ({ recipientId }) => {
  const [message, setMessage] = useState("");
  const [_isLargeScreen, isSmallScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  // const handleTyping = () =>
  //   socket?.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = (e) => {
    console.log(recipientId);
    e.preventDefault();
    if (message.trim()) {
      SocketClient.client?.emit("message:send-message", {
        message,
        recipientId,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // onKeyDown={handleTyping}
        />
        <Button
          rightIcon={<Icon color="red.500" as={GrSend} />}
          variant="primary"
          type="submit"
        >
          {!isSmallScreen && "SEND"}
        </Button>
      </form>
    </div>
  );
};

export default ChatFooter;
