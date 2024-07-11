import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../../models/Auth/users";
import { signupSchema } from "../../validations/auth";

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
export const GetAuthById = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    if (user._id.toString() !== id) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error("MongoDB Query Error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "MongoDB Query Error" });
  }
};
export const signup = async (req, res) => {
  const { email, password, confirmPassword, userName } = req.body;
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  console.log(error);
  if (error) {
    const messages = error.details.map((item) => item.message);
    zzz;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages,
    });
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Email đã tồn tại"],
    });
  }
  const hashedPassword = await bcryptjs.hash(password, 12);
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role,
  });
  return res.status(StatusCodes.CREATED).json({
    user,
  });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      messages: ["Email không tồn tại"],
    });
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Mật khẩu không chính xác"],
    });
  }
  const token = jwt.sign({ userId: user._id }, "123456", {
    expiresIn: "7d",
  });
  return res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

export const add_address = async (req, res) => {
  const { userId, newAddress } = req.body;
  // Kiểm tra newAddress từ request body
  if (
    !newAddress ||
    !newAddress.fullName ||
    !newAddress.phoneNumber ||
    !newAddress.addressDetails ||
    !newAddress.addressType
  ) {
    return res
      .status(400)
      .json({ error: "Thông tin địa chỉ không được để trống" });
  }
  // Tìm người dùng theo userId
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "Người dùng không tồn tại" });
  }
  // Thêm địa chỉ vào mảng addresses của người dùng
  user.address.push(newAddress);
  // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
  await user.save();

  return res.status(200).json({ message: "Đã thêm địa chỉ thành công", user });
};

export const get_address = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Tìm người dùng dựa vào userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy người dùng",
      });
    }

    // Lấy danh sách địa chỉ từ đối tượng người dùng
    const addresses = user.address;

    return res.status(StatusCodes.OK).json({
      addresses,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách địa chỉ:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Lỗi khi lấy danh sách địa chỉ",
    });
  }
};

export const updateUserAddress = async (req, res) => {
  const userId = req.params.userId;
  const addressId = req.params.addressId;
  const updatedAddress = req.body; // Thông tin địa chỉ mới cần cập nhật

  try {
    // Tìm người dùng trong CSDL bằng userId
    const user = await User.findById(userId);
    
    // Kiểm tra nếu không tìm thấy người dùng
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy người dùng",
      });
    }
    
    // Tìm địa chỉ cần cập nhật trong mảng address của người dùng
    let addressToUpdate = user.address.id(addressId);
    
    // Kiểm tra nếu không tìm thấy địa chỉ
    if (!addressToUpdate) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy địa chỉ",
      });
    }
    
    // Cập nhật thông tin địa chỉ mới
    addressToUpdate.set(updatedAddress);
    console.log();
    // Lưu thay đổi vào CSDL
    await user.save(updatedAddress);
    
    return res.status(StatusCodes.OK).json({
      message: "Đã cập nhật địa chỉ thành công",
      updatedAddress: addressToUpdate,
        
    } );
 
  } catch (error) {
    console.error("Lỗi khi cập nhật địa chỉ:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Lỗi khi cập nhật địa chỉ",
    });
  }
};

export const delete_address = async (req, res) => {
  const { userId, addressId } = req.params; // Lấy userId và addressId từ params

  try {
    // Tìm người dùng dựa vào userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy người dùng",
      });
    }

    // Xóa địa chỉ khỏi mảng addresses của người dùng
    user.address.pull(addressId);

    // Lưu lại người dùng đã được cập nhật vào cơ sở dữ liệu
    await user.save();

    return res.status(StatusCodes.OK).json({
      message: "Đã xóa địa chỉ thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xóa địa chỉ:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Lỗi khi xóa địa chỉ",
    });
  }
};

export const logout = async (req, res) => {};
