import e from "express";
import Notification from "../../models/Notification/Notification";
import User from "../../models/Auth/users";
export const createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;
        let { receiver_id } = req.body;

        const user = await User.findOne({ email: receiver_id });

        if (user) {
            receiver_id = user._id
        }
        console.log(receiver_id);

        const notification = new Notification({
            userId,
            receiver_id,
            message,
        });
        await notification.save();
        res.status(201).json({ message: "Tạo thành công", notification });
    } catch (error) {
        res.status(500).json({ message: "Lỗi rồi đại ca ơi" });
    }
}
export const getNotification = async (req, res) => {
    try {

        const notifications = await Notification.find().populate('orderId').populate('userId')
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Lỗi rồi đại ca ơi" });
    }
}