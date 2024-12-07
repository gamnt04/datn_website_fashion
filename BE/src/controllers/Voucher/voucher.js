import Voucher from "../../models/Voucher/voucher";
import Products from "../../models/Items/Products";
import Users from "../../models/Auth/users";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const getVoucher = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json({ message: "Thành công: ", vouchers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVoucherById = async (req, res) => {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findById(id);

    if (!voucher) {
      return res.status(404).json({ message: "Không tìm thấy voucher" });
    }

    res.status(200).json({ message: "Thành công: ", voucher });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy voucher", error });
  }
};

const sendEmail = async (
  userName,
  email,
  code_voucher,
  startDate,
  expirationDate
) => {
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

  const formattedStartDate = formatDate(startDate);
  const formattedExpirationDate = formatDate(expirationDate);

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Mã giảm giá mới dành cho bạn!",
    text: `Kính gửi ${userName},

Bạn đã nhận được mã giảm giá mới từ chúng tôi:
Mã giảm giá: ${code_voucher}
Thời gian sử dụng: ${formattedStartDate} - ${formattedExpirationDate}
Vui lòng truy cập web và mua sắm để sử dụng mã giảm giá này --> http://localhost:7899/shops

Xin chân thành cảm ơn!`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const addVoucher = async (req, res) => {
  try {
    req.body.code_voucher = req.body.code_voucher.toUpperCase();
    // Kiểm tra xem mã giảm giá đã tồn tại hay chưa
    const existingVoucher = await Voucher.findOne({
      code_voucher: req.body.code_voucher,
    });
    if (existingVoucher) {
      return res.status(400).json({
        message: "Mã giảm giá đã tồn tại, vui lòng sử dụng mã khác.",
      });
    }
    const newVoucher = new Voucher(req.body);
    await newVoucher.save();

    const allowedUsers = req.body.allowedUsers || [];

    if (allowedUsers.length > 0) {
      // Gửi email cho danh sách người dùng cụ thể
      for (const userId of allowedUsers) {
        const user = await Users.findById(userId);
        if (user) {
          await sendEmail(
            user.userName,
            user.email,
            newVoucher.code_voucher,
            newVoucher.startDate,
            newVoucher.expirationDate
          );
        }
      }
    } else {
      // Gửi email cho tất cả người dùng
      const users = await Users.find();
      for (const user of users) {
        await sendEmail(
          user.userName,
          user.email,
          newVoucher.code_voucher,
          newVoucher.startDate,
          newVoucher.expirationDate
        );
      }
    }

    res.status(201).json({
      message: "Thêm mới mã giảm giá thành công",
      voucher: newVoucher,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Mã giảm giá bị trùng, vui lòng thử mã khác.",
      });
    }

    res.status(500).json({ error: error.message });
  }
};

export const deleteVoucher = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVoucher = await Voucher.findByIdAndDelete(id);
    if (!deletedVoucher)
      return res.status(404).json({ message: "Không tìm thấy mã giảm giá" });
    res.json({ message: "Xóa mã giảm giá thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVoucher = async (req, res) => {
  const { id } = req.params;

  try {
    req.body.code_voucher = req.body.code_voucher.toUpperCase();
    const updatedVoucher = await Voucher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedVoucher)
      return res.status(404).json({ message: "Không tìm thấy mã giảm giá" });
    res.json({
      message: "Cập nhật mã giảm giá thành công",
      voucher: updatedVoucher,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const useVoucher = async (req, res) => {
  const { code_voucher, totalAmount, userId, selectedProducts } = req.body;

  try {
    // Tìm mã giảm giá theo code và kiểm tra xem nó còn hoạt động không
    const voucher = await Voucher.findOne({ code_voucher, isActive: true });

    if (!voucher) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy mã giảm giá hoặc đã hết hạn" });
    }

    // Kiểm tra nếu voucher chỉ dành cho một số người dùng
    if (
      voucher.allowedUsers.length > 0 && // Nếu có giới hạn người dùng
      !voucher.allowedUsers.includes("all") && // Không có "all" trong danh sách
      !voucher.allowedUsers.includes(userId) // Người dùng không nằm trong danh sách cho phép
    ) {
      return res
        .status(403)
        .json({ message: "Bạn không được phép sử dụng mã giảm giá này" });
    }

    // Kiểm tra nếu voucher đã hết số lượng sử dụng
    if (voucher.usedCount >= voucher.quantity_voucher) {
      return res
        .status(400)
        .json({ message: "Mã giảm giá đã đạt hạn mức sử dụng" });
    }

    // Kiểm tra nếu voucher chưa đến ngày bắt đầu
    if (new Date(voucher.startDate) > new Date()) {
      return res
        .status(400)
        .json({ message: "Mã giảm giá chưa sử dụng được hôm nay!" });
    }

    // Kiểm tra nếu voucher đã hết hạn
    if (new Date(voucher.expirationDate) < new Date()) {
      return res.status(400).json({ message: "Mã giảm giá đã hết hạn" });
    }

    if (voucher.applyType === "product") {
      // Kiểm tra nếu áp dụng cho sản phẩm
      if (voucher.appliedProducts.length === 0) {
        // Nếu không có sản phẩm nào trong appliedProducts, cho phép tất cả sản phẩm
      } else {
        // Kiểm tra xem các sản phẩm đã chọn có hợp lệ không
        const validProducts = selectedProducts.filter((productId) =>
          voucher.appliedProducts.includes(productId)
        );

        if (validProducts.length === 0) {
          return res
            .status(400)
            .json({ message: "Mã giảm giá không áp dụng cho sản phẩm này" });
        }
      }
    } else if (voucher.applyType === "total") {
      // Kiểm tra nếu áp dụng cho tổng số tiền
      if (totalAmount < voucher.minimumSpend) {
        return res.status(400).json({
          message: `Số tiền tối thiểu để sử dụng mã giảm giá này là ${voucher.minimumSpend}`,
        });
      }
    } else if (voucher.applyType === "category") {
      if (voucher.appliedCategories.length === 0) {
        // Nếu không có danh mục nào trong appliedCategories, cho phép áp dụng cho tất cả danh mục
      } else {
        // Kiểm tra xem các sản phẩm đã chọn có thuộc danh mục hợp lệ không
        const validProducts = await Products.find({
          _id: { $in: selectedProducts },
          category_id: { $in: voucher.appliedCategories },
        });

        if (validProducts.length === 0) {
          return res.status(400).json({
            message:
              "Mã giảm giá không áp dụng cho sản phẩm thuộc danh mục này",
          });
        }
      }
    }

    // Kiểm tra nếu tổng giá trị đơn hàng lớn hơn giá trị giảm giá
    if (totalAmount < voucher.discountValue) {
      return res.status(400).json({
        message: `Tổng giá trị đơn hàng chưa đủ điều kiện để sử dụng mã giảm giá này`,
      });
    }

    // Kiểm tra minimumSpend cho voucher
    if (voucher.minimumSpend > 0 && totalAmount < voucher.minimumSpend) {
      return res.status(400).json({
        message: `Để áp dụng mã giảm giá này, bạn cần chi tiêu ít nhất ${voucher.minimumSpend}`,
      });
    }

    // Tính giá trị giảm giá dựa trên loại mã giảm giá
    let discount = 0;
    if (voucher.discountType === "percentage") {
      discount = (voucher.discountValue / 100) * totalAmount;

      // Kiểm tra nếu vượt quá số tiền tối đa được giảm
      if (voucher.maxDiscount && discount > voucher.maxDiscount) {
        discount = voucher.maxDiscount; // Đặt giá trị giảm giá bằng số tiền tối đa
      }
    } else {
      discount = voucher.discountValue;
    }

    // Trả về kết quả bao gồm giá trị giảm giá và số tiền cuối cùng
    res.json({
      message: "Áp dụng mã giảm giá thành công!",
      totalAmount,
      discount,
      finalAmount: totalAmount - discount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
