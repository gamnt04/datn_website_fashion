import { useState } from 'react';
import axios from 'axios';
import { Button, Spin } from 'antd';
import { IoMdClose, IoMdSend } from 'react-icons/io';

const Chat_bot = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [userMessage, setUserMessage] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const sendMessage = async () => {
        if (!userMessage) return;
        const newMessages = [...messages, { sender: 'user', text: userMessage }];
        setMessages(newMessages);
        setUserMessage('');
        setIsTyping(true);

        try {
            const response = await axios.post('http://localhost:2004/api/v1/chat_Bot', {
                message: userMessage
            });
            setIsTyping(false);

            if (response.status === 200 && response.data.reply) {
                setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
            } else {
                setMessages([...newMessages, { sender: 'bot', text: "Xin lỗi, không nhận được phản hồi hợp lệ." }]);
            }
        } catch (error) {
            setIsTyping(false);
            console.error('Lỗi khi gửi tin nhắn:', error);
            setMessages([...newMessages, { sender: 'bot', text: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.' }]);
        }
    };
    return (
        <>
            {isVisible && (
                <div className="fixed bottom-5 right-5 z-50">
                    <div className="w-[350px] max-w-md bg-white shadow-2xl rounded-[20px] flex flex-col h-[500px] border border-gray-300">
                        <div className="relative flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-14 rounded-t-[20px] px-4">
                            <div className="flex items-center">
                                <img src="https://picsum.photos/40/40" className='rounded-full mr-2' alt="Bot Avatar" />
                                <span className="font-semibold text-lg">Chat Bot</span>
                            </div>
                            <div className="absolute right-4 cursor-pointer">
                                <IoMdClose
                                    className="text-[30px]"
                                    onClick={() => setIsVisible(false)}
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.sender === 'bot' && /<\/?[a-z][\s\S]*>/i.test(message.text) ? (
                                        <div
                                            className="px-4 py-2 rounded max-w-xs bg-gray-200 text-black"
                                            dangerouslySetInnerHTML={{ __html: message.text }}
                                        />
                                    ) : (
                                        <div
                                            className={`px-4 py-2 rounded max-w-xs ${message.sender === 'user'
                                                ? 'bg-blue-500 text-white self-end'
                                                : 'bg-gray-200 text-black self-start'
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="px-4 py-2 rounded max-w-xs bg-gray-200 text-black">
                                        <Spin size="small" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pb-4 px-4">
                            <div className='flex items-center gap-4'>
                                <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className='border p-2 w-full rounded outline-none'
                                />
                                <Button
                                    type="primary"
                                    onClick={sendMessage}
                                    className='p-2 bg-blue-500 hover:bg-blue-600 w-14 h-12 rounded-full flex items-center justify-center'
                                >
                                    <IoMdSend className="text-xl" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chat_bot;
