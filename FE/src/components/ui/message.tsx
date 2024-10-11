import { Link } from "react-router-dom";
import message from "../../assets/Images/Logo/logoMessage.jpg";
import { useState } from "react";
import Chat from "../../pages/Client/Chat/Chat";

const Message = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <div className="fixed right-4 bottom-24 z-50 cursor-pointer">
      <div className="relative w-[55px] h-[55px]">
        <img
          src={message}
          alt=""
          className="rounded-full w-full h-full object-cover"
          onClick={() => toggleChat()}
        />
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity rounded-full"></div>
        {isChatOpen && (
          <div className="fixed inset-0  flex justify-end pr-[70px] mt-[220px]">
            <Chat onClose={() => toggleChat()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
