import React, { createContext, useState, useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import Modal from "react-modal";

interface WebSocketContextProps {
  socket: Socket | null;
  isBlock: boolean;
  setIsBlock: React.Dispatch<React.SetStateAction<boolean>>;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined
);

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isBlock, setIsBlock] = useState<boolean>(false);
  const [blockReason, setBlockReason] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Lấy JWT từ localStorage
    const socketIo = io("http://localhost:2004", {
      auth: { token }, // Gửi token tới backend
    });

    setSocket(socketIo);

    // Lắng nghe khi kết nối thành công
    socketIo.on("connect", () => {
      console.log("Connected to WebSocket server:", socketIo.id);
    });

    // Lắng nghe khi nhận sự kiện "blocked"
    socketIo.on("blocked", (data) => {
      console.log("Blocked event received from server:", data);
      setIsBlock(true); // Cập nhật trạng thái bị chặn
      setBlockReason(data.reason); // Cập nhật lý do bị chặn
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, isBlock, setIsBlock }}>
      {children}
      {/* Hiển thị modal nếu tài khoản bị chặn */}
      <Modal
        isOpen={isBlock}
        onRequestClose={() => setIsBlock(false)}
        contentLabel="Blocked Account"
        ariaHideApp={false} // Để tắt cảnh báo mặc định của react-modal
      >
        <h2>Tài khoản của bạn đã bị khóa</h2>
        <p>Lý do: {blockReason}</p>
        <button onClick={() => setIsBlock(false)}>Đóng</button>
      </Modal>
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
