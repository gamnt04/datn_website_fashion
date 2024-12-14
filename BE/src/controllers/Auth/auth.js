import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../../models/Auth/users";
import { signupSchema } from "../../validations/auth";
import mongoose from "mongoose";
import { date } from "joi";
import Shipper from "../../models/Shipper/shipper";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { getIO } from "../../app";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const GetAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getting all products:", error);
    return res.status(500).json({ error: error.message });
  }
};
export const Get_All_User_Search = async (req, res) => {
  const { _search = "" } = req.query;
  try {
    const querry = {};
    if (_search) {
      querry.$and = [
        {
          userName: { $regex: new RegExp(_search, "i") },
        },
      ];
    }
    const user = await User.find(querry);
    console.log(user);
    return res.status(StatusCodes.OK).json({
      message: "Done !",
      user,
    });
  } catch (error) {
    console.error("Error getting all products:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Loi server !",
    });
  }
};

export const GetAuthById = async (req, res) => {
  try {
    const id = req.params.userId;

    const user = await User.findById(id);
    if (user) {
      return res.status(StatusCodes.OK).json(user);
    }

    const shipper = await Shipper.findById(id);
    if (shipper) {
      return res.status(StatusCodes.OK).json(shipper);
    }

    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "User or Shipper not found" });
  } catch (error) {
    console.error("MongoDB Query Error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "MongoDB Query Error" });
  }
};

export const GetUsersByEmailOrName = async (req, res) => {
  try {
    const { searchUser } = req.body;

    const users = await User.find({
      $or: [
        { email: { $regex: new RegExp(searchUser, "i") } },
        { userName: { $regex: new RegExp(searchUser, "i") } },
      ],
    });

    if (users.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không có tài khoản nào khớp với tìm kiếm" });
    }

    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Lỗi máy chủ!" });
  }
};

// Kiểm tra quyền truy cập theo role (Middleware)
export const checkRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Vui lòng đăng nhập để tiếp tục.",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Decoded User:", req.user);
      // console.log("User Role:", req.user.role);
      // console.log("Required Roles:", roles);
      if (!roles.includes(req.user.role)) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: "Bạn không có quyền truy cập vào tài nguyên này.",
        });
      }

      next();
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token không hợp lệ hoặc đã hết hạn.",
      });
    }
  };
};
///
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, "123456", { expiresIn: "7d" });
};
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, "123456", { expiresIn: "15m" });
};
export const signup = async (req, res) => {
  const { email, password } = req.body;
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  const existUser = await User.findOne({ email });
  const existShipper = await Shipper.findOne({ email });

  try {
    if (error) {
      const messages = error.details.map((item) => item.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        messages,
      });
    }

    if (existUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: ["Email đã tồn tại"],
      });
    }
    if (existShipper) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: ["Email đã tồn tại"],
      });
    }
    // Mã hóa mật khẩu
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Nếu không có user nào trong hệ thống thì tạo user đầu tiên là admin
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      role,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Đăng ký tài khoản thành công", user });
  } catch (error) {
    console.error(`Đăng ký thất bại do:`, error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await Shipper.findOne({ email });
    }

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        messages: ["Email không tồn tại"],
      });
    }

    // Kiểm tra xem người dùng có bị chặn không (isblock là kiểu boolean)
    if (user.isBlock) {
      return res.status(StatusCodes.FORBIDDEN).json({
        messages: ["Tài khoản của bạn đã bị chặn"],
      });
    }

    // So sánh mật khẩu
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: ["Mật khẩu không chính xác"],
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role || "courier" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    // Trả về phản hồi với thông tin đăng nhập
    return res.status(StatusCodes.OK).json({
      message: "Đăng nhập thành công",
      user,
      token,
    });
  } catch (error) {
    console.error(`Error finding user with email ${email}:`, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi server" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No token provided" });
    }
    // Lưu token vào danh sách đen (blacklist) để ngăn không cho token đó được sử dụng nữa
    const blacklistedToken = new BlacklistedToken({ token });
    await blacklistedToken.save();

    // Gửi phản hồi thành công
    res.status(StatusCodes.OK).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    console.error(`Error during logout:`, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const oldToken = req.headers.authorization;
    if (!oldToken) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No token provided" });
    }

    // Kiểm tra token có trong blacklist
    const isBlacklisted = await isTokenBlacklisted(oldToken);
    if (isBlacklisted) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Token is blacklisted" });
    }
    // Giải mã oldToken để lấy userId
    let decoded;
    try {
      decoded = jwt.verify(oldToken, "123456"); // Sử dụng cùng secret key như khi tạo token
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: "Token expired" });
      } else {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ error: "Invalid token" });
      }
    }
    const userId = decoded.userId;
    if (!userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid token payload" });
    }

    // Tạo refreshToken mới
    const newToken = generateRefreshToken(userId);

    // Trả về refreshToken mới cho client
    res.status(StatusCodes.OK).json({ newToken });
  } catch (error) {
    console.error(`Error during token refresh:`, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
export const isTokenBlacklisted = async (token) => {
  const tokenInBlacklist = await BlacklistedToken.findOne({ token });
  return !!tokenInBlacklist;
};

export const add_address = async (req, res) => {
  const { userId, newAddress, setDefault } = req.body;
  console.log("Received new address:", newAddress); // Debugging line

  // Validate required fields
  if (
    !newAddress ||
    !newAddress.fullName ||
    !newAddress.phoneNumber ||
    !newAddress.address ||
    !newAddress.detailedAddress ||
    !newAddress.coordinates ||
    !newAddress.coordinates.lat ||
    !newAddress.coordinates.lng
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Thông tin địa chỉ không được để trống" });
  }

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Người dùng không tồn tại" });
    }

    // If setting the address as default, reset all other addresses
    if (setDefault) {
      user.address.forEach((address) => {
        address.checked = false;
      });
    }

    // Add the new address to the user's address array
    user.address.push({
      ...newAddress,
      checked: setDefault, // Mark as default if setDefault is true
    });

    // Save the updated user document
    const updatedUser = await user.save();

    // Return the updated user address list
    return res.status(StatusCodes.OK).json({
      message: "Đã thêm địa chỉ thành công",
      address: updatedUser.address,
    });
  } catch (error) {
    console.error("Error while adding address:", error.message); // Enhanced error logging
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi thêm địa chỉ" });
  }
};
export const get_address = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Tìm người dùng
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy người dùng" });
    }

    // Trả về địa chỉ
    const address = user.address;
    return res.status(StatusCodes.OK).json({ address });
  } catch (error) {
    console.error("Lỗi khi lấy địa chỉ:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi lấy địa chỉ" });
  }
};

export const getAddressById = async (req, res) => {
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
    const user = await User.findById(userId).exec();
    const shipper = await Shipper.findById(userId).exec();

    let address;

    // Tìm địa chỉ trong bảng User
    if (user) {
      address = user.address.id(addressId);
    }

    // Nếu không tìm thấy địa chỉ trong User, tìm trong Shipper
    if (!address && shipper) {
      address = shipper.address.id(addressId);
    }

    // Nếu không tìm thấy trong cả hai bảng
    if (!address) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy địa chỉ" });
    }

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
    const user = await User.findById(userId);

    // Kiểm tra nếu không tìm thấy người dùng
    if (!user) {
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
    user.address.forEach((address) => {
      address.checked = false;
    });

    // Tìm địa chỉ cần thiết lập làm mặc định
    const address = user.address.id(addressId);

    // Kiểm tra nếu không tìm thấy địa chỉ
    if (!address) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy địa chỉ",
      });
    }

    // Đặt địa chỉ này thành mặc định
    address.checked = true;

    // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
    const updatedUser = await user.save();

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

export const updateUserAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  const { updatedAddress, setDefault } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Người dùng không tồn tại" });
    }

    const addressIndex = user.address.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Địa chỉ không tồn tại" });
    }

    user.address[addressIndex] = {
      ...user.address[addressIndex],
      ...updatedAddress,
    };

    if (setDefault) {
      user.address.forEach((address, index) => {
        user.address[index].checked = index === addressIndex;
      });
    }

    const updatedUser = await user.save();

    return res.status(StatusCodes.OK).json({
      message: "Cập nhật địa chỉ thành công",
      address: updatedUser.address,
    });
  } catch (error) {
    console.error("Error while editing address:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi sửa địa chỉ" });
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
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy người dùng" });
    }

    // Xóa địa chỉ theo ID
    const addressIndex = user.address.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy địa chỉ" });
    }

    user.address.splice(addressIndex, 1); // Xóa địa chỉ

    // Lưu thay đổi
    await user.save();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Đã xóa địa chỉ thành công", address: user.address });
  } catch (error) {
    console.error("Lỗi khi xóa địa chỉ:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi khi xóa địa chỉ" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy người dùng để cập nhật" });
    }

    const updatedFields = [];
    for (const key in updatedData) {
      if (user[key] !== updatedData[key]) {
        updatedFields.push({
          field: key,
          value: updatedData[key], // Thêm trường value để lưu giá trị cập nhật
          time: new Date(),
        });
        user[key] = updatedData[key];
      }
    }

    // Thêm thông tin cập nhật vào mảng updatedFields
    user.updatedFields.push(...updatedFields);

    // Lưu người dùng đã cập nhật
    await user.save();

    // Trả về thông báo thành công và thông tin người dùng đã cập nhật
    return res.status(StatusCodes.OK).json({
      message: "Cập nhật người dùng thành công",
      updatedFields,
      user,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const newAuthIn7Day = async (req, res) => {
  try {
    const dayNow = new Date();
    dayNow.setHours(23, 59, 59, 999);
    const dayStart = new Date(dayNow);
    dayStart.setDate(dayStart.getDate() - 6);

    const usersByDate = [];

    for (let i = 0; i < 7; i++) {
      let currentDay = new Date(dayStart);
      currentDay.setDate(currentDay.getDate() + i);
      currentDay.setHours(0, 0, 0, 0);
      let startOfDay = new Date(currentDay);
      const usersDate = await User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfDay,
              $lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalUser: { $sum: 1 },
          },
        },
      ]);

      usersByDate.push({
        day: startOfDay.toISOString().slice(0, 10),
        totalUser: usersDate.length > 0 ? usersDate[0].totalUser : 0,
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "New users in the last 7 days by date",
      usersByDate,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng mới:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

//Lấy tất cả thông tin ở user và shipper
export const getUserAndShipper = async (req, res) => {
  try {
    // Lấy tất cả người dùng
    const users = await User.find();

    // Lấy tất cả shipper
    const shippers = await Shipper.find();

    // Kiểm tra nếu không có người dùng hoặc shipper
    if (users.length === 0 && shippers.length === 0) {
      return res.status(404).json({ message: "No Users or Shippers Found" });
    }
    const allAccounts = [...users, ...shippers];
    // Trả về dữ liệu cả hai bảng
    return res
      .status(200)
      .json({ message: "Thành công", allAuth: allAccounts });
  } catch (error) {
    console.error("Error getting users and shippers:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // Xác thực token từ phía Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Kiểm tra và tạo user nếu chưa tồn tại
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        userName: name,
        avatar: picture,
      });
    }

    // Kiểm tra nếu tài khoản bị block
    if (user.isBlock) {
      return res.status(403).json({ message: "Tài khoản của bạn đã bị chặn!" });
    }

    // Tạo token JWT cho client
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token: accessToken, user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xác thực Google", error });
  }
};

const sendEmailblock = async (userName, email, reasonBlock) => {
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
    subject: "Thông Báo Về Việc Tạm Thời Khóa Tài Khoản",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
        <div style="background-color: #4CAF50; color: white; padding: 10px; border-radius: 8px; text-align: center;">
          <h2>Thông Báo Khóa Tài Khoản</h2>
        </div>
        <div style="padding: 20px; font-size: 16px;">
          <p>Kính gửi bạn,</p>
          <p>Chúng tôi xin thông báo rằng tài khoản của bạn đã tạm thời bị khóa do lý do: <strong>${reasonBlock}</strong>.</p>
          <p>Trong thời gian này, bạn sẽ không thể truy cập vào tài khoản của mình. Nếu bạn cho rằng đây là một sự nhầm lẫn hoặc cần hỗ trợ thêm, vui lòng liên hệ với bộ phận hỗ trợ khách hàng qua email: <a href="mailto:sevenshop07@gmail.com">sevenshop07@gmail.com</a> hoặc gọi vào số: <strong>0399290040</strong>.</p>
          <p>Chúng tôi xin lỗi vì sự bất tiện này và sẽ cố gắng giải quyết vấn đề trong thời gian sớm nhất.</p>
          <p>Trân trọng, 
        </div>
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px;">
          <p>&copy; 2024 SevenShop. Tất cả quyền lợi được bảo lưu.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendEmailunblock = async (userName, email, reasonUnblock) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Định dạng thời gian
  const formatDate = (date) =>
    new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));

  // const formattedStartDate = formatDate(startDate);
  // const formattedExpirationDate = formatDate(expirationDate);

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Thông Báo Về Việc Mở Khóa Tài Khoản",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
        <div style="background-color: #2196F3; color: white; padding: 10px; border-radius: 8px; text-align: center;">
          <h2>Thông Báo Mở Khóa Tài Khoản</h2>
        </div>
        <div style="padding: 20px; font-size: 16px;">
          <p>Kính gửi bạn,</p>
          <p>Chúng tôi vui mừng thông báo rằng tài khoản của bạn đã được mở khóa và quyền truy cập đã được khôi phục đầy đủ.</p>
          <p>Sau khi xem xét, chúng tôi xác nhận rằng vấn đề liên quan đến tài khoản của bạn đã được giải quyết. Bạn có thể tiếp tục sử dụng tài khoản và các dịch vụ của chúng tôi như bình thường.</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:sevenshop07@gmail.com">sevenshop07@gmail.com</a> hoặc gọi vào số: <strong>0399290040</strong>.</p>
          <p>Cảm ơn bạn đã kiên nhẫn và thông cảm trong suốt thời gian xử lý vấn đề.</p>
          <p class="text-lg text-blue-600 underline">
  Hãy tiếp tục mua sắm tại: <a href="http://localhost:7899/" class="font-bold">http://localhost:7899/</a>
</p>

          <p>Trân trọng, 
        </div>
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px;">
          <p>&copy; 2024 SevenShop. Tất cả quyền lợi được bảo lưu.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const changeBlock = async (req, res) => {
  const userId = req.params.userId; // Đọc userId từ params
  const { isBlock, reasonBlock, reasonUnblock } = req.body;

  // Kiểm tra nếu không có userId
  if (!userId) {
    return res.status(400).json({ message: "Thiếu thông tin userId" });
  }

  // Kiểm tra nếu userId không hợp lệ
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID người dùng không hợp lệ" });
  }

  // Kiểm tra nếu thiếu lý do block khi isBlock là true
  if (isBlock && !reasonBlock) {
    return res
      .status(400)
      .json({ message: "Khi khóa người dùng, bắt buộc phải có lý do Block" });
  }

  // Kiểm tra nếu thiếu lý do unblock khi isBlock là false
  if (!isBlock && !reasonUnblock) {
    return res.status(400).json({
      message: "Khi mở khóa người dùng, bắt buộc phải có lý do Unblock",
    });
  }

  try {
    // Tìm người dùng và cập nhật trạng thái block/unblock
    const updateData = isBlock
      ? { isBlock, reasonBlock }
      : { isBlock, reasonUnblock };

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true } // Trả về dữ liệu mới và áp dụng kiểm tra hợp lệ
    );

    // Nếu không tìm thấy người dùng
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Gửi email thông báo
    if (isBlock) {
      await sendEmailblock(user.name, user.email, reasonBlock);
    } else {
      await sendEmailunblock(user.name, user.email, reasonUnblock);
    }

    // Log dữ liệu trước khi phát sự kiện
    console.log(`Emitting "blocked" event for user ${userId}`, {
      reason: isBlock ? reasonBlock : reasonUnblock,
    });

    // Phát sự kiện WebSocket
    const io = getIO();
    io.emit("blocked", {
      userId: user._id,
      reason: isBlock ? reasonBlock : reasonUnblock,
    });

    // Trả về kết quả
    return res.status(200).json({
      message: isBlock
        ? "Người dùng đã bị khóa thành công và đã gửi email thông báo"
        : "Người dùng đã được mở khóa và đã gửi email thông báo",
      user,
    });
  } catch (error) {
    // Xử lý lỗi bất ngờ
    console.error("Lỗi khi cập nhật trạng thái block:", error);
    return res
      .status(500)
      .json({ message: "Có lỗi xảy ra", error: error.message });
  }
};
