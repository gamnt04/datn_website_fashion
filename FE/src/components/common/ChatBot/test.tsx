import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { IoMdSend } from 'react-icons/io';

const Chat_bot = () => {
    const [messages, setMessages] = useState<any>([]);
    const [userMessage, setUserMessage] = useState<any>('');

    // Xử lý khi người dùng gửi tin nhắn
    const sendMessage = async () => {
        if (!userMessage) return;

        // Hiển thị tin nhắn của người dùng
        const newMessages: any = [...messages, { sender: 'user', text: userMessage }];
        setMessages(newMessages);
        setUserMessage('');

        try {
            // Gửi tin nhắn đến server
            const response = await axios.post('http://localhost:2004/api/v1/chat_Bot', { message: userMessage });

            // Nhận câu trả lời từ chatbot_
            setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className='container mx-auto flex justify-center mt-20 p-4'>
            <div className="border p-6 bg-white rounded shadow w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Hỗ trợ khách hàng</h1>

                <div className="chatbox border h-64 overflow-y-auto p-4 bg-gray-100 rounded mb-4">
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

    );
};

export default Chat_bot;
