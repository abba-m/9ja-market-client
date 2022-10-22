import { useEffect, useRef, useState } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter.jsx";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [menuToggle, setMenuToggle] = useState(false);
  const lastMessageRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState("");

  useEffect(() => {
    socket?.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket?.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar
        setMenuToggle={setMenuToggle}
        menuToggle={menuToggle}
        socket={socket}
      />
      <div className="chat__main">
        <ChatBody
          menuToggle={menuToggle}
          setMenuToggle={setMenuToggle}
          typingStatus={typingStatus}
          messages={messages}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter setTypingStatus={setTypingStatus} socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
