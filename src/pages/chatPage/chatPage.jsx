import ChatSideBar from "./chatSideBar";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";

import "./styles/Chat.css";
import "./styles/chat.style.css";

const ChatPage = () => {
  const [isLargeScreen] = useMediaQuery(["(min-width: 768px)"]);

  return (
    <>
      {isLargeScreen ? (
        <div className="chat">
          <ChatSideBar />
          <div className="chat__main">
            <Outlet />
          </div>
        </div>
      ) : (
        <ChatSideBar />
      )}
    </>
  );
};

export default ChatPage;
