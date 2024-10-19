import Shipper from "../../models/Shipper/shipper";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/Auth/users";
import Order from "../../models/Orders/orders";
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
    const findEmailUser = await User.findOne({ email });
    if (findEmailUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    const findEmailShipper = await Shipper.findOne({ email });
    if (findEmailShipper) {
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

    // Kiểm tra xem shipper có đang được dùng trong đơn hàng nào không
    const ordersUsingShipper = await Order.find({ shipperId: id });
    // Kiểm tra trạng thái của các đơn hàng đang sử dụng shipper
    const cannotDeleteStatus = ["2", "3"];

    const hasRestrictedOrder = ordersUsingShipper.some((order) =>
      cannotDeleteStatus.includes(order.status)
    );

    if (hasRestrictedOrder) {
      return res.status(400).json({
        message:
          "Không thể xóa shipper. Shipper này vẫn đang được chỉ định cho đơn hàng.",
      });
    }
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

//Phần địa chỉ của shipper
export const add_address = async (req, res) => {
  const { userId, newAddress, setDefault } = req.body;

  // Kiểm tra thông tin địa chỉ
  if (
    !newAddress ||
    !newAddress.fullName ||
    !newAddress.phoneNumber ||
    !newAddress.address
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Thông tin địa chỉ không được để trống" });
  }

  try {
    // Tìm người dùng
    const shipper = await Shipper.findById(userId);
    if (!shipper) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Người dùng không tồn tại" });
    }

    // Nếu địa chỉ mới được chọn làm mặc định, đặt tất cả các địa chỉ khác thành không phải mặc định
    if (setDefault) {
      shipper.address.forEach((address) => {
        address.checked = false;
      });
    }

    // Thêm địa chỉ mới vào mảng địa chỉ và thiết lập làm mặc định nếu cần
    shipper.address.push({
      ...newAddress,
      checked: setDefault, // Đặt địa chỉ mới làm mặc định nếu setDefault là true
    });

    // Lưu thay đổi
    const updatedShipper = await shipper.save();

    // Trả về dữ liệu cập nhật
    return res.status(StatusCodes.OK).json({
      message: "Đã thêm địa chỉ thành công",
      address: updatedShipper.address,
    });
  } catch (error) {
    console.error("Lỗi khi thêm địa chỉ:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi thêm địa chỉ" });
  }
};
export const get_address = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Tìm người dùng
    const shipper = await Shipper.findById(userId);
    if (!shipper) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy người dùng" });
    }

    // Trả về địa chỉ
    const address = shipper.address;
    return res.status(StatusCodes.OK).json({ address });
  } catch (error) {
    console.error("Lỗi khi lấy địa chỉ:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi lấy địa chỉ" });
  }
};

export const getAddressById = async (req, res) => {
  const { shipperId, addressId } = req.params;

  if (!shipperId || !mongoose.isValidObjectId(shipperId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "ID người dùng không hợp lệ" });
  }

  if (!addressId || !mongoose.isValidObjectId(addressId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "ID địa chỉ không hợp lệ" });
  }

  try {
    // Tìm người dùng theo ID
    const shipper = await Shipper.findById(shipperId).exec();
    if (!shipper) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy người dùng" });
    }

    // Tìm địa chỉ theo ID trong mảng địa chỉ
    const address = shipper.address.id(addressId);
    if (!address) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy địa chỉ" });
    }

    // Trả về địa chỉ
    return res.status(StatusCodes.OK).json({ address });
  } catch (error) {
    console.error("Lỗi khi lấy địa chỉ:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi lấy địa chỉ" });
  }
};

export const setDefaultAddress = async (req, res) => {
  const userId = req.params.userId;

  const addressId = req.params.addressId; // ID của địa chỉ cần thiết lập làm mặc định

  try {
    // Tìm người dùng trong CSDL bằng userId
    const shipper = await Shipper.findById(userId);

    // Kiểm tra nếu không tìm thấy người dùng
    if (!shipper) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy người dùng",
      });
    }

    // Kiểm tra nếu địa chỉId hợp lệ
    if (!mongoose.isValidObjectId(addressId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "ID địa chỉ không hợp lệ",
      });
    }

    // Đặt tất cả các địa chỉ khác thành không phải mặc định
    shipper.address.forEach((address) => {
      address.checked = false;
    });

    // Tìm địa chỉ cần thiết lập làm mặc định
    const address = shipper.address.id(addressId);

    // Kiểm tra nếu không tìm thấy địa chỉ
    if (!address) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy địa chỉ",
      });
    }

    // Đặt địa chỉ này thành mặc định
    address.checked = true;

    // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
    const updatedUser = await shipper.save();

    return res.status(StatusCodes.OK).json({
      message: "Đã thiết lập địa chỉ mặc định thành công",
      address: updatedUser.address.id(addressId),
    });
  } catch (error) {
    console.error("Lỗi khi thiết lập địa chỉ mặc định:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Lỗi khi thiết lập địa chỉ mặc định",
    });
  }
};

export const updateShipperAddress = async (req, res) => {
  const shipperID = req.params.userId;
  const addressId = req.params.addressId; // ID của địa chỉ cần cập nhật
  const updatedAddress = req.body; // Dữ liệu địa chỉ mới

  try {
    // Tìm người dùng trong CSDL bằng userId
    const shipper = await Shipper.findById(shipperID);

    // Kiểm tra nếu không tìm thấy người dùng
    if (!shipper) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy người dùng",
      });
    }

    // Kiểm tra nếu địa chỉId hợp lệ
    if (!mongoose.isValidObjectId(addressId)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "ID địa chỉ không hợp lệ",
      });
    }

    // Tìm địa chỉ cần cập nhật trong mảng địa chỉ
    const address = shipper.address.id(addressId);

    // Kiểm tra nếu không tìm thấy địa chỉ
    if (!address) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy địa chỉ",
      });
    }

    // Cập nhật địa chỉ với dữ liệu mới
    address.set(updatedAddress);

    // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
    const updatedUser = await shipper.save();

    // Lấy địa chỉ đã được cập nhật từ dữ liệu người dùng đã lưu
    const updatedAddressData = updatedUser.address.id(addressId);

    return res.status(StatusCodes.OK).json({
      message: "Đã cập nhật địa chỉ thành công",
      address: updatedAddressData,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật địa chỉ:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Lỗi khi cập nhật địa chỉ",
    });
  }
};

export const delete_address = async (req, res) => {
  const { userId, addressId } = req.params;

  if (!userId || !mongoose.isValidObjectId(userId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "ID người dùng không hợp lệ" });
  }

  if (!addressId || !mongoose.isValidObjectId(addressId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "ID địa chỉ không hợp lệ" });
  }

  try {
    // Tìm người dùng
    const shipper = await Shipper.findById(userId);
    if (!shipper) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy người dùng" });
    }

    // Xóa địa chỉ theo ID
    const addressIndex = shipper.address.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy địa chỉ" });
    }

    shipper.address.splice(addressIndex, 1); // Xóa địa chỉ

    // Lưu thay đổi
    await shipper.save();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Đã xóa địa chỉ thành công", address: shipper.address });
  } catch (error) {
    console.error("Lỗi khi xóa địa chỉ:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi xóa địa chỉ" });
  }
};
export const getDailyShipCount = async (req, res) => {
  const { shipperId, date } = req.params;

  if (!shipperId || !date) {
    return res
      .status(400)
      .json({ message: "Thiếu thông tin shipperId hoặc ngày." });
  }

  try {
    // Chuyển đổi 'date' thành kiểu Date object
    const dateObj = new Date(date);

    // Tạo khoảng thời gian từ đầu ngày đến cuối ngày
    const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0));
    const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999));

    // Đếm số lượng đơn hàng mà shipper đã giao thành công trong ngày
    const shipCount = await Order.countDocuments({
      shipperId: shipperId, // ID của shipper
      status: "4", // Trạng thái "Giao hàng thành công"
      deliveredAt: {
        $gte: startOfDay, // Từ đầu ngày
        $lte: endOfDay, // Đến cuối ngày
      },
    });

    // Trả về kết quả
    return res.status(200).json({ shipCount });
  } catch (error) {
    console.error("Error getting daily ship count:", error);
    return res.status(500).json({ message: "Lỗi hệ thống." });
  }
};
