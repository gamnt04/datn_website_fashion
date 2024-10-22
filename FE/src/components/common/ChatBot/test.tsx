import { useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { IoMdClose, IoMdSend } from 'react-icons/io';

const Chat_bot = () => {
    const [messages, setMessages] = useState<any>([]);
    const [userMessage, setUserMessage] = useState<any>('');
    const [isVisible, setIsVisible] = useState(false);
    const sendMessage = async () => {
        if (!userMessage) return;
        const newMessages: any = [...messages, { sender: 'user', text: userMessage }];
        setMessages(newMessages);
        setUserMessage('');

        try {
            const response = await axios.post('http://localhost:2004/api/v1/chat_Bot', { message: userMessage });
            setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>

            <div className="">
                <div className="h-[500px] flex justify-center items-center p-2">
                    <div className="w-[350px] max-w-md bg-white shadow-lg rounded-[10px] flex flex-col h-full border border-gray-300">
                        <div className="relative flex  items-center bg-blue-500 text-white h-14 rounded-t-[10px] px-0">
                            <div className="flex items-center ml-4">
                                <img src="https://picsum.photos/40/40" className='rounded-full' alt="" />
                            </div>
                            <div className="flex items-center mr-4 absolute right-0">
                                <IoMdClose
                                    className="cursor-pointer text-[30px]"
                                    onClick={() => setIsVisible(false)}
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message: any, index: any) => (
                                <div
                                    key={index}
                                    className={` px-4 py-2 mb-2 rounded-full max-w-full ${message.sender === 'user'
                                        ? 'bg-blue-500 text-white self-end text-right '
                                        : 'bg-gray-300 text-black self-start text-left'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            ))}
                        </div>


                        <div className="pb-4 px-4" >
                            <div className='flex items-center gap-4 '>
                                <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className='border p-2 w-full rounded outline-none  '
                                />
                                <Button
                                    type="primary"
                                    onClick={sendMessage}
                                    className='p-2 bg-blue-500 hover:bg-blue-600 w-20 h-10 rounded'
                                >
                                    <IoMdSend />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default Chat_bot;
