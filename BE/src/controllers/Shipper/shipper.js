import Shipper from "../../models/Shipper/shipper";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/Auth/users";
dotenv.config();

const sendEmail = async (fullName, email, password, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: " Xác Nhận Tài Khoản",
    text: `Kính gửi ${fullName},

    Chúng tôi đã đăng ký thành công tài khoản của bạn với thông tin dưới đây:
    Tên người dùng: ${fullName}
    Email:  ${email}

    Để hoàn tất quy trình đăng ký, vui lòng xác nhận tài khoản của bạn bằng cách nhấp vào liên kết bên dưới:
    http://your-domain.com/verify-email?token=${token}
    Mật khẩu đăng nhập của bạn là: ${password}
    
    Xin chân thành cảm ơn!`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Hàm tạo mật khẩu ngẫu nhiên dài 8 ký tự
const randomPassword = () => {
  return crypto.randomBytes(4).toString("hex");
};

// Hàm mã hóa mật khẩu
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10); // Sử dụng bcrypt để mã hóa mật khẩu
};

// Tạo token với thông tin role và email
const generateToken = (fullName, role) => {
  const payload = {
    fullName,
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token hết hạn sau 1 giờ
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Tạo mới một shipper
export const createShipper = async (req, res) => {
  try {
    const {
      fullName,
      vehicle,
      phone,
      email,
      status,
      avatar,
      address,
      birthDate,
    } = req.body;
    // Kiểm tra xem email đã tồn tại chưa
    const findEmailShipper = await Shipper.findOne({ email });
    if (findEmailShipper) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const findEmailUser = await User.findOne({ email });
    if (findEmailUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    // Tạo mật khẩu mặc định
    const defaultPassword = randomPassword();
    // Mã hóa mật khẩu
    const hashedPassword = await hashPassword(defaultPassword);

    // Tạo token xác thực với email và role
    const verificationToken = generateToken(fullName, "courier");

    const newShipper = new Shipper({
      fullName,
      vehicle,
      phone,
      email,
      password: hashedPassword,
      status,
      avatar,
      address,
      birthDate,
      token: verificationToken,
      tokenExpiration: Date.now() + 3600000, // Token hết hạn sau 1 giờ
    });

    // Lưu vào cơ sở dữ liệu
    await newShipper.save();

    // Gửi email xác thực
    await sendEmail(fullName, email, defaultPassword, verificationToken);

    res
      .status(201)
      .json({ message: "Tạo shipper thành công!", shipper: newShipper });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo shipper", error: error.message });
  }
};

// Hàm gửi email xác nhận
const sendUpdateEmail = async (fullName, email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Xác Nhận Cập Nhật Thông Tin",
    text: `Kính gửi ${fullName},

    Chúng tôi đã cập nhật thông tin của bạn thành công. Vui lòng xác nhận cập nhật này bằng cách nhấp vào liên kết bên dưới:
    http://your-domain.com/verify-update?token=${token}
    
    Xin chân thành cảm ơn!`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Cập nhật thông tin shipper và gửi email xác nhận
export const updateShipper = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      vehicle,
      phone,
      email,
      status,
      avatar,
      address,
      birthDate,
    } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const findEmailShipper = await Shipper.findOne({ email });
    if (findEmailShipper) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const findEmailUser = await User.findOne({ email });
    if (findEmailUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    // Tạo token xác thực cho việc cập nhật
    const updateToken = generateToken(fullName, "courier");

    const updatedShipper = await Shipper.findByIdAndUpdate(
      id,
      {
        fullName,
        vehicle,
        phone,
        email,
        status,
        avatar,
        address,
        birthDate,
        token: updateToken,
      },
      { new: true } // Trả về dữ liệu mới sau khi cập nhật
    );

    if (!updatedShipper) {
      return res.status(404).json({ message: "Không tìm thấy shipper" });
    }

    // Gửi email xác thực
    await sendUpdateEmail(fullName, email, updateToken);

    res.status(200).json({
      message:
        "Cập nhật shipper thành công! Vui lòng kiểm tra email để xác nhận.",
      shipper: updatedShipper,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật shipper", error: error.message });
  }
};

// Lấy danh sách tất cả các shipper
export const getAllShippers = async (req, res) => {
  try {
    const shippers = await Shipper.find();
    res.status(200).json(shippers);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách shipper", error });
  }
};

// Xem chi tiết một shipper
export const getShipperById = async (req, res) => {
  try {
    const { id } = req.params;
    const shipper = await Shipper.findById(id);

    if (!shipper) {
      return res.status(404).json({ message: "Không tìm thấy shipper" });
    }

    res.status(200).json(shipper);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy shipper", error });
  }
};

// Xóa shipper
export const deleteShipper = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedShipper = await Shipper.findByIdAndDelete(id);

    if (!deletedShipper) {
      return res.status(404).json({ message: "Không tìm thấy shipper" });
    }

    res.status(200).json({ message: "Xóa shipper thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa shipper", error });
  }
};

// Tìm kiếm theo tên shipper
export const GetShippersByName = async (req, res) => {
  try {
    const { fullName } = req.body; // Lấy name từ body của request

    // Tìm kiếm shipper theo trường "name"
    const shippers = await Shipper.find({
      fullName: { $regex: new RegExp(fullName, "i") }, // Tìm kiếm theo tên
    });

    if (shippers.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy shipper nào" });
    }

    return res.status(StatusCodes.OK).json(shippers);
  } catch (error) {
    console.error(error); // Log lỗi để xem chi tiết
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server",
    });
  }
};
