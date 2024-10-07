import MessageGroup from "../../models/Message/Message";

// Hàm gửi tin nhắn
// export const sendMessage = async (req, res) => {
//   try {
//     const { senderId, receiverId, content, attachments, icons } = req.body;
//     const formattedAttachments = Array.isArray(attachments) ? attachments : [];

//     // Tìm nhóm tin nhắn giữa sender và receiver
//     let messageGroup = await MessageGroup.findOne({
//       $or: [
//         { senderId, receiverId },
//         { senderId: receiverId, receiverId: senderId }  // Kiểm tra 2 chiều để đảm bảo không tạo nhóm mới nếu đã có nhóm giữa cùng 2 người này
//       ]
//     });

//     // Nếu chưa có nhóm tin nhắn, tạo nhóm mới
//     if (!messageGroup) {
//       messageGroup = new MessageGroup({ senderId, receiverId, messages: [] });
//     }

//     // Thêm tin nhắn mới vào mảng messages
//     messageGroup.messages.push({
//       content,
//       attachments: formattedAttachments,
//       icons
//     });

//     const savedMessageGroup = await messageGroup.save();

//     res.status(200).json({ message: "Gửi tin nhắn thành công", data: savedMessageGroup });
//   } catch (error) {
//     console.error("Lỗi khi lưu tin nhắn:", error);
//     res.status(500).json({ message: "Gửi tin nhắn thất bại." });
//   }
// };
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content, attachments, icons } = req.body;
    const formattedAttachments = Array.isArray(attachments) ? attachments : [];

    // Tìm nhóm tin nhắn giữa sender và receiver
    let messageGroup1 = await MessageGroup.findOne({
      $or: [{ senderId, receiverId }]
    });
    let messageGroup2 = await MessageGroup.findOne({
      $or: [
        { senderId: receiverId, receiverId: senderId } // Kiểm tra 2 chiều để đảm bảo không tạo nhóm mới nếu đã có nhóm giữa cùng 2 người này
      ]
    });

    // Nếu chưa có nhóm tin nhắn, tạo nhóm mới
    if (!messageGroup1) {
      messageGroup1 = new MessageGroup({
        senderId,
        receiverId,
        messages: []
      });
    }
    if (!messageGroup2) {
      messageGroup2 = new MessageGroup({
        senderId,
        receiverId,
        messages: []
      });
    }

    // Thêm tin nhắn mới vào mảng messages
    let savedMessageGroup;
    if (senderId == messageGroup1.senderId) {
      messageGroup1.messages.push({
        content,
        attachments: formattedAttachments,
        icons
      });
      savedMessageGroup = await messageGroup1.save();
    } else {
      messageGroup2.messages.push({
        content,
        attachments: formattedAttachments,
        icons
      });
      savedMessageGroup = await messageGroup2.save();
    }

    res
      .status(200)
      .json({ message: "Gửi tin nhắn thành công", data: savedMessageGroup });
  } catch (error) {
    console.error("Lỗi khi lưu tin nhắn:", error);
    res.status(500).json({ message: "Gửi tin nhắn thất bại." });
  }
};

// Hàm lấy tin nhắn theo userId
export const getMessagesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Tìm tất cả nhóm tin nhắn mà user là người gửi hoặc người nhận
    const messages = await MessageGroup.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    }).populate("senderId receiverId"); // Populate để lấy thông tin chi tiết về người gửi/nhận

    res.status(200).json(messages);
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn:", error);
    res.status(500).json({ message: "Lấy tin nhắn thất bại." });
  }
};
