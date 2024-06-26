import { Button, Icon, Input, useMediaQuery, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { GrSend } from "react-icons/gr";
import { postRequest } from "services/request";
import { v4 as uuid } from "uuid";

const ChatFooter = ({ recipientId, setMessages }) => {
  const toast = useToast();
  const inputRef = useRef();
  const [_isLargeScreen, isSmallScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  // const handleTyping = () =>
  //   socket?.emit("typing", `${localStorage.getItem("userName")} is typing`);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value || !inputRef.current?.value?.trim()) return;

    const data =  {
      messageId: uuid(),
      text: inputRef.current.value,
      recipientId,
      createdAt: new Date().toISOString(),
    };

    try {
      await postRequest("api/chats/send-message", data);
      setMessages((messages) => [...messages, data]);
      inputRef.current.value = "";
    } catch (e) {
      toast({
        position: "top",
        title: e.message ?? "An Error occured! Please try again.",
        status: "error",
        isClosable: true,
      });
    }

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
