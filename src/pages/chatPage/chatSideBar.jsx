import { Avatar, AvatarBadge, Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SocketClient } from "services/socket";
import { formatChatTime } from "utils/format.utils";
import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";
import { rpcClient } from "services/rpcClient";
import { NavLink } from "react-router-dom";

const ChatSideBar = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    SocketClient.client?.on("newUserResponse", (data) => setChats(data));
  }, [chats]);

  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth.user,
  }));

  const getUserChats = async () => {
    const userChats = await rpcClient.request("getUserChats");
    setChats(userChats);
  };

  useEffect(() => {
    getUserChats();
  }, [currentUser]);

  const activeClassName = {
    color: "#00CC88",
    backgroundColor: "transparent",
  };

  const notActiveClass = {
    color: "#2C3E50",
    backgroundColor: "transparent",
  };

  const styleActiveLink = ({ isActive }) =>
    isActive ? activeClassName : notActiveClass;

  return (
    <Box
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      w="100vw"
      className="chat__sidebar"
    >
      <div>
        <div className="chatbar__header">
          <h4 className="chat__header">CHATS</h4>
        </div>
        <div className="chat__users">
          <Text>
            <NavLink style={styleActiveLink} to="/chats">
              Back
            </NavLink>
          </Text>
          {chats.length ? (
            chats
              .filter((chat) => chat?.Messages?.length)
              .map(({ Messages, userOne, userTwo, chatId }) => {
                const recipientId =
                  userOne === currentUser?.userId ? userTwo : userOne;
                return (
                  <ChatListItem
                    key={chatId}
                    lastMessage={Messages[0]}
                    recipientId={recipientId}
                  />
                );
              })
          ) : (
            <Text>No conversations! Start new</Text>
          )}
        </div>
      </div>
    </Box>
  );
};

function ChatListItem({ recipientId, lastMessage }) {
  const [user, setUser] = useState({
    isOnline: false,
    avatarUrl: null,
    fullName: "Loading...",
  });
  const [isOnline, setIsOnline] = useState(false);
  const { avatarUrl, fullName } = user;
  const [lastMsg, setLastMsg] = useState(lastMessage || {});
  const getUser = async () => {
    const resp = await rpcClient.request("getUserOnline", { recipientId });
    if (!resp) return;

    setUser(resp.user);
    setIsOnline(resp.isOnline);
  };

  useEffect(() => {
    getUser();

    SocketClient.client?.on("user:connect", ({ userId }) => {
      if (userId !== recipientId) return;

      setIsOnline(true);
    });
    SocketClient.client?.on("user:join-room", ({ userId }) => {
      if (userId !== recipientId) return;

      setIsOnline(true);
    });

    SocketClient.client?.on("user:disconnect", ({ userId }) => {
      if (userId !== recipientId) return;

      setIsOnline(false);
    });
    SocketClient.client?.on("message:receive-message", (msg) => {
      debugger;
      if (msg?.recipientId !== currentUser?.userId) return;

      setLastMsg(msg);
    });
  }, [recipientId]);

  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth.user,
  }));

  const activeClassName = {
    color: "#00CC88",
    backgroundColor: "transparent",
  };

  const notActiveClass = {
    color: "#2C3E50",
    backgroundColor: "transparent",
  };

  const styleActiveLink = ({ isActive }) =>
    isActive ? activeClassName : notActiveClass;

  return (
    <NavLink
      style={styleActiveLink}
      to={`message/${recipientId}`}
      className="chat__list-item"
    >
      <Box>
        <Avatar name={fullName} size="md" src={avatarUrl}>
          {isOnline && <AvatarBadge boxSize="1.25em" bg="green.500" />}
        </Avatar>
      </Box>

      <Flex direction="column" justifyContent="space-evenly">
        <Flex justifyContent="space-between" alignItems="center">
          <Text noOfLines={1} className="chat__name">
            {fullName}
          </Text>
          <Text margin={0} fontSize="10px">
            {formatChatTime(lastMsg?.createdAt)}
          </Text>
        </Flex>
        <HStack>
          <Text fontSize="12px" noOfLines={1} className="last__message">
            {lastMsg?.senderId === currentUser?.userId ? (
              "You"
            ) : (
              <Icon as={TiMessages} />
            )}
            {": " + lastMsg?.text}
          </Text>
        </HStack>
      </Flex>
    </NavLink>
  );
}

export default ChatSideBar;
