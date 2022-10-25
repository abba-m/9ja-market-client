import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const ChatBody = ({
  messages,
  lastMessageRef,
  typingStatus,
  setMenuToggle,
  menuToggle,
}) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/chats");
  };

  const handleMenuClick = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <>
      <header className="chat__mainHeader">
        <GiHamburgerMenu
          onClick={handleMenuClick}
          className="hamburger__icon"
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="chat__avatar">
            <img src="https://source.unsplash.com/random" alt="" width="fit" />
          </div>
          <p className="chat__header-title">Adamu Tako</p>
        </div>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          DELETE CHAT
        </button>
        <MdDeleteForever className="delete__icon" />
      </header>
      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
              <div ref={lastMessageRef} />
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/* This is triggered when a user is typing */}
        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
