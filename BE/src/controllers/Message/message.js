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
    const { senderId, receiverId, content } = req.body;
    // const formattedAttachments = Array.isArray(attachments) ? attachments : [];

    // Tìm nhóm tin nhắn giữa sender và receiver
    let messageGroup1 = await MessageGroup.findOne({
      $or: [{ senderId, receiverId }],
    });
    let messageGroup2 = await MessageGroup.findOne({
      $or: [
        { senderId: receiverId, receiverId: senderId }, // Kiểm tra 2 chiều để đảm bảo không tạo nhóm mới nếu đã có nhóm giữa cùng 2 người này
      ],
    });

    // Nếu chưa có nhóm tin nhắn, tạo nhóm mới
    if (!messageGroup1) {
      messageGroup1 = new MessageGroup({
        senderId,
        receiverId,
        messages: [],
      });
    }
    if (!messageGroup2) {
      messageGroup2 = new MessageGroup({
        senderId,
        receiverId,
        messages: [],
      });
    }

    // Thêm tin nhắn mới vào mảng messages
    let savedMessageGroup;
    if (senderId == messageGroup1.senderId) {
      messageGroup1.messages.push({
        content: content,
        // attachments: formattedAttachments,
        // icons
      });
      savedMessageGroup = await messageGroup1.save();
    } else {
      messageGroup2.messages.push({
        content: content,
        // attachments: formattedAttachments,
        // icons
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
export const getMessagesBetweenUsers = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    let messageGroups = await MessageGroup.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    })
      .populate("senderId")
      .populate("receiverId");

    messageGroups = messageGroups.map((group) => {
      group.messages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      return group;
    });
    res.status(200).json(messageGroups);
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn giữa hai người dùng:", error);
    res.status(500).json({ message: "Lấy tin nhắn thất bại." });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messageGroups = await MessageGroup.find({})
      .populate("senderId")
      .populate("receiverId");
    const sortedMessageGroups = messageGroups.map((group) => {
      group.messages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      return group;
    });
    res.status(200).json({ data: sortedMessageGroups });
  } catch (error) {
    console.error("Lỗi khi lấy tất cả tin nhắn:", error);
    res.status(500).json({ message: "Lấy tất cả tin nhắn thất bại." });
  }
};
