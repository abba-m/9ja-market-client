import { useEffect, useRef, useState } from "react";
import { SocketClient } from "services/socket";
import ChatSideBar from "./ChatSideBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter.jsx";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [menuToggle, setMenuToggle] = useState(false);
  const lastMessageRef = useRef(null);
  const [typingStatus, setTypingStatus] = useState("");

  useEffect(() => {
    SocketClient.client?.on("messageResponse", (data) => setMessages([...messages, data]));
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    SocketClient.client?.on("typingResponse", (data) => setTypingStatus(data));
  }, []);

  return (
    <div className="chat">
      <ChatSideBar
        setMenuToggle={setMenuToggle}
        menuToggle={menuToggle}
        socket={SocketClient}
      />
      <div className="chat__main">
        <ChatBody
          menuToggle={menuToggle}
          setMenuToggle={setMenuToggle}
          typingStatus={typingStatus}
          messages={messages}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter setTypingStatus={setTypingStatus} socket={SocketClient} />
      </div>
    </div>
  );
};

export default ChatPage;
