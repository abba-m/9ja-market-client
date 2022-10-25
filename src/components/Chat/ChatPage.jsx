import ChatSideBar from "./ChatSideBar";
import { Outlet } from "react-router-dom";
import "./styles/Chat.css";

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
