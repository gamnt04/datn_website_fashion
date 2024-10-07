import MessageGroup from "../../models/Message/Message";

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content, attachments, icons } = req.body;
    const formattedAttachments = Array.isArray(attachments) ? attachments : [];

    let messageGroup = await MessageGroup.findOne({
      senderId,
      receiverId
    });

    if (!messageGroup) {
      messageGroup = new MessageGroup({ senderId, receiverId, messages: [] });
    }

    messageGroup.messages.push({
      content,
      attachments: formattedAttachments,
      icons
    });

    const savedMessageGroup = await messageGroup.save();

    res
      .status(200)
      .json({ message: "Gửi tin nhắn thành công", data: savedMessageGroup });
  } catch (error) {
    console.error("Lỗi khi lưu tin nhắn:", error);
    res.status(500).json({ message: "Gửi tin nhắn thất bại." });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const messages = await MessageGroup.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn:", error);
    res.status(500).json({ message: "Lấy tin nhắn thất bại." });
  }
};
