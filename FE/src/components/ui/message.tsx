import { useState } from "react";
import message from "../../assets/Images/Logo/logoMessage.jpg";
import Chat from "../../pages/Client/Chat/Chat";

const Message = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed right-4 bottom-24 z-50 cursor-pointer">
      <div className="relative w-[55px] h-[55px]" onClick={toggleChat}>
        <img
          src={message}
          alt="Message Icon"
          className="rounded-full w-full h-full object-cover"
          onClick={toggleChat}
        />
        {isChatOpen && (
          <div className="fixed inset-0  flex justify-end pr-[90px] mt-[230px]">
            <Chat onClose={toggleChat} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
