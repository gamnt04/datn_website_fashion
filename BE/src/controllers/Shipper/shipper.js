import Shipper from "../../models/Shipper/shipper";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/Auth/users";
dotenv.config();

const sendEmail = async (fullName, email, token) => {
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
    http://localhost:7899/verify?token=${token}
    
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
const generateToken = (email, role) => {
  const payload = {
    email,
    role,
    exp: Math.floor(Date.now() / 1000) + 5 * 60, // Token hết hạn sau 5 phút
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Tạo mới một shipper
export const createShipper = async (req, res) => {
  try {
    const {
      fullName,
      userName,
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
    const verificationToken = generateToken(email, "courier");

    const newShipper = new Shipper({
      fullName,
      userName,
      vehicle,
      phone,
      email,
      password: hashedPassword,
      plainPassword: defaultPassword,
      status,
      avatar,
      address,
      birthDate,
      token: verificationToken,
      tokenExpiration: Date.now() + 5 * 60 * 1000,
    });

    // Lưu vào cơ sở dữ liệu
    await newShipper.save();

    // Gửi email xác thực
    await sendEmail(fullName, email, verificationToken);

    res
      .status(201)
      .json({ message: "Tạo shipper thành công!", shipper: newShipper });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo shipper", error: error.message });
  }
};

// Cập nhật thông tin shipper và gửi email xác nhận
export const updateShipper = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      userName,
      vehicle,
      phone,
      email,
      status,
      avatar,
      address,
      birthDate,
    } = req.body;

    const findEmailUser = await User.findOne({ email });
    if (findEmailUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const updatedShipper = await Shipper.findByIdAndUpdate(
      id,
      {
        fullName,
        userName,
        vehicle,
        phone,
        email,
        status,
        avatar,
        address,
        birthDate,
      },
      { new: true } // Trả về dữ liệu mới sau khi cập nhật
    );

    if (!updatedShipper) {
      return res.status(404).json({ message: "Không tìm thấy shipper" });
    }

    res.status(200).json({
      message: "Cập nhật shipper thành công",
      shipper: updatedShipper,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật shipper", error: error.message });
  }
};

// Hàm gửi email mật khẩu sau khi xác thực
const sendPasswordEmail = async (fullName, email, password) => {
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
    subject: "Tài khoản của bạn đã được xác thực",
    text: `Kính gửi ${fullName},

    Tài khoản của bạn đã được xác thực thành công. Đây là thông tin đăng nhập của bạn:
    Email: ${email}
    Mật khẩu: ${password}

    Vui lòng đăng nhập vào hệ thống với thông tin trên.

    Xin chân thành cảm ơn!`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
// Xác thực token
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tìm shipper bằng email từ token
    const shipper = await Shipper.findOne({ email: decoded.email });

    if (!shipper) {
      return res.status(400).json({ message: "Không tìm thấy người dùng" });
    }

    // Kiểm tra token còn hợp lệ không
    if (shipper.token !== token) {
      return res.status(400).json({ message: "Token không hợp lệ" });
    }

    if (shipper.tokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Token đã hết hạn" });
    }

    // Cập nhật trạng thái xác thực cho shipper
    shipper.status = "Available";
    shipper.token = undefined;
    shipper.tokenExpiration = undefined;
    await shipper.save();

    // Gửi email chứa mật khẩu gốc cho người dùng
    await sendPasswordEmail(
      shipper.fullName,
      shipper.email,
      shipper.plainPassword
    );

    // Sau khi gửi, xóa mật khẩu tạm thời
    shipper.plainPassword = undefined;
    await shipper.save();

    res.json({ message: "Xác thực thành công!" });
  } catch (error) {
    res.status(400).json({ message: "Xác thực tài khoản không thành công!" });
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
