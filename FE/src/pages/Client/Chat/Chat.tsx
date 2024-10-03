import { AiOutlineLine } from "react-icons/ai";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { BiImageAdd } from "react-icons/bi";
import { MdInsertEmoticon, MdOutlineAttachFile } from "react-icons/md";

const Chat = () => {
  return (
    <>
      <div className="bg-gray-100 h-[500px] flex justify-center items-center">
        {/* <!-- Chat Container --> */}
        <div className="w-[350px] max-w-md bg-white shadow-lg rounded-lg flex flex-col h-full">
          {/* <!-- Chat Header --> */}
          <div className="flex bg-blue-500 text-white pt-4 justify-between items-center h-16">
            <div className="flex items-center flex-1 py-4 pl-2">
              <img
                className="w-[32px] h-[32px] rounded-full"
                src="../../../src/resources/images/teams/chung.png"
                alt="John Doe"
              />
              <h2 className="text-li font-semibold pl-2">John Doe</h2>
            </div>
            <div className="flex items-center space-x-2 pr-2">
              {/* Biểu tượng từ Ant Design */}
              <AiOutlineLine className="text-white text-xl cursor-pointer" />
              <IoMdClose className="text-white text-xl cursor-pointer" />
            </div>
          </div>

          {/* <!-- Chat Messages --> */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* <!-- Example Messages --> */}
            <div className="flex items-start">
              <div className="bg-gray-200 p-3 rounded-[20px] text-gray-800 max-w-xs h-auto">
                Hello! How are you?
              </div>
            </div>
            <div className="flex justify-end items-start">
              <div className="bg-blue-500 text-white p-3 rounded-[20px] h-auto max-w-xs">
                I'm good, thanks! What about you?
              </div>
            </div>
            {/* <!-- More messages can go here --> */}
          </div>

          {/* <!-- Chat Input --> */}
          <div className="p-3 bg-gray-100 rounded-b-lg">
            <div className="flex items-center ">
              <button className="text-blue-500 text-xl py-1 ">
                <MdOutlineAttachFile />
              </button>
              {/* <!-- Emoji Picker --> */}
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

              {/* <!-- Send Button --> */}
              <button className="text-blue-500 text-xl px-3 py-1 ">
                <IoMdSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
