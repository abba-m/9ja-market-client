import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

const ChatBar = ({ socket, menuToggle, setMenuToggle }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket?.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  const handleXMenuClick = () => {
    setMenuToggle(false);
  };

  return (
    <div className={menuToggle ? "chat__sidebar-mobile" : "chat__sidebar"}>
      <div>
        <div className="chatbar__header">
          {menuToggle && <MdCancel onClick={handleXMenuClick} />}
          <h4 className="chat__header">CHATS</h4>
        </div>
        <div className="chat__users">
          {/* {users.map((user) => (
            <p key={user?.socketID}>{user.userName}</p>
          ))} */}
          <div className="chat__list-item">
            <div className="chat__avatar">
              <img
                src="https://source.unsplash.com/random"
                alt=""
                width="fit"
              />
            </div>
            <div>
              <p className="chat__name">Adamu Tako</p>
              <p className="last__message">
                <span className="chatbar__sender-badge">you: </span>I sent you
                the money
              </p>
            </div>
            <span className="last__message-time">08:22pm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
