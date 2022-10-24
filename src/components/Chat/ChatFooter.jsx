import { Button, Icon, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrSend } from "react-icons/gr";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [_isLargeScreen, isSmallScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);


  const handleTyping = () =>
    socket?.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket?.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      socket?.emit("typing", "");
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
          onKeyDown={handleTyping}
        />
        <Button rightIcon={<Icon color="red.500" as={GrSend} />} variant="primary" type="submit">
          { !isSmallScreen && "SEND" }
        </Button>
      </form>
    </div>
  );
};

export default ChatFooter;
