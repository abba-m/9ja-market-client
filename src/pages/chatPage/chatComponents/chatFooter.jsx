import { Button, Icon, Input, useMediaQuery } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { GrSend } from "react-icons/gr";
import { SocketClient } from "services/socket";

const ChatFooter = ({ recipientId, messages, setMessages }) => {
  const inputRef = useRef();
  const [_isLargeScreen, isSmallScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  // const handleTyping = () =>
  //   socket?.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();

    // TODO: refactor
    if (!inputRef.current.value) return;
    if (!inputRef.current?.value?.trim()) return;

    const data =  {
      text: inputRef.current.value,
      recipientId,
      createdAt: new Date().toISOString(),
    };

    SocketClient.client?.emit("message:send-message", data);

    setMessages([...messages, data]);
    inputRef.current.value = "";
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <Input
          type="text"
          placeholder="Hello there..."
          className="message"
          ref={inputRef}
          // value={message}
          // onChange={(e) => setMessage(e.target.value)}
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
