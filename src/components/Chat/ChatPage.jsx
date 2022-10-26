import ChatSideBar from "./ChatSideBar";
import { Outlet } from "react-router-dom";
import "./styles/Chat.css";
import { useMediaQuery } from "@chakra-ui/react";

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
