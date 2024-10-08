import { AiOutlineLine } from "react-icons/ai";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { BiImageAdd } from "react-icons/bi";
import { MdInsertEmoticon, MdOutlineAttachFile } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { useParams } from "react-router-dom";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { useState } from "react";

const Chat = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const { data, isLoading } = useQuery({
    queryKey: ["Messengers"],
    queryFn: async () => {
      const response = await instance.get(
        `/messages/66d35671ae9c6444f583e246/${userId}`
      );
      return response.data;
    },
  });
  console.log(data);

  const friendInfo =
    data?.[0]?.receiverId?._id === userId
      ? data?.[0]?.senderId
      : data?.[0]?.receiverId;

  const [isChatOpen, setIsChatOpen] = useState(false);

  const closeChat = () => {
    setIsChatOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className=" h-[500px] flex justify-center items-center">
      {/* Chat Container */}
      <div className="w-[350px] max-w-md bg-white shadow-lg rounded-[10px] flex flex-col h-full border border-gray-300">
        {/* Chat Header */}
        <div className="flex bg-blue-500 text-white pt-1 justify-between items-center h-14 rounded-t-[10px]">
          <div className="flex items-center flex-1 py-2 pl-2">
            <img
              className="w-[32px] h-[32px] rounded-full"
              src={
                friendInfo?.avatarUrl ||
                "https://vectorified.com/images/default-avatar-icon-12.png"
              }
              alt={friendInfo?.userName || "Friend"}
            />
            <h2 className="text-li font-semibold pl-2">
              {friendInfo?.userName || "Friend"}
            </h2>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {data?.map((message) => (
            <div key={message._id}>
              {message.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    message.senderId._id === userId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-[20px] max-w-xs h-auto ${
                      message.senderId._id === userId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-gray-100 rounded-b-[10px]">
          <div className="flex items-center">
            <button className="text-blue-500 text-xl py-1">
              <MdOutlineAttachFile />
            </button>
            <button className="text-xl text-blue-500 px-3">
              <BiImageAdd />
            </button>
            {/* <!-- Input field for message --> */}
            <div className="relative w-[230px]">
              <input
                type="text"
                className="flex-1 h-9 w-[230px] px-4 py-2 pr-10 border rounded-[20px] border-gray-300 focus:outline-none focus:ring-blue-500"
                placeholder="Aa"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2  text-xl text-gray-500">
                <MdInsertEmoticon />
              </div>
            </div>
            <button className="text-blue-500 text-xl px-3 py-1">
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
