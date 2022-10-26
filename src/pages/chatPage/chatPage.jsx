import ChatSideBar from "./chatSideBar";
import { Outlet } from "react-router-dom";
import "./styles/chat.style.css";

const ChatPage = () => {
  return (
    <div className="chat">
      <ChatSideBar />
      <div className="chat__main">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatPage;
