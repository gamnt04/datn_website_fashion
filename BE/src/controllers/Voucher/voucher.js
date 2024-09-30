import Voucher from "../../models/Voucher/voucher";

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

export const addVoucher = async (req, res) => {
  try {
    const newVoucher = new Voucher(req.body);
    await newVoucher.save();
    res.status(201).json({
      message: "Thêm mới mã giảm giá thành công",
      voucher: newVoucher,
    });
  } catch (error) {
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
  const { code_voucher, totalAmount, userId } = req.body;

  try {
    const voucher = await Voucher.findOne({ code_voucher, isActive: true });
    if (!voucher) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy mã giảm giá hoặc đã hết hạn" });
    }
    // Kiểm tra nếu voucher chỉ dành cho một số người dùng
    if (
      voucher.allowedUsers.length > 0 &&
      !voucher.allowedUsers.includes(userId)
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to use this voucher" });
    }

    // Kiểm tra nếu voucher đã hết số lượng
    if (voucher.usedCount >= voucher.quantity_voucher) {
      return res
        .status(400)
        .json({ message: "Mã giảm giá đã đạt hạn mức sử dụng" });
    }

    // Kiểm tra ngày bắt đầu
    if (new Date(voucher.startDate) > new Date()) {
      return res.status(400).json({ message: "Mã giảm giá chưa được áp dụng" });
    }
    // Kiểm tra ngày hết hạn
    if (new Date(voucher.expirationDate) < new Date()) {
      return res.status(400).json({ message: "Mã giảm giá đã hết hạn " });
    }

    // Kiểm tra điều kiện số tiền tối thiểu
    if (totalAmount < voucher.minimumSpend) {
      return res.status(400).json({
        message: `Bạn cần chi tiêu tối thiểu ${voucher.minimumSpend} để có thể sử dụng mã giảm giá này`,
      });
    }

    // Tính giá trị giảm giá
    let discount = 0;
    if (voucher.discountType === "percentage") {
      discount = (voucher.discountValue / 100) * totalAmount;
    } else {
      discount = voucher.discountValue;
    }

    voucher.usedCount += 1;
    await voucher.save();

    res.json({
      message: "Áp dụng mã giảm giá thành công!",
      discount,
      finalAmount: totalAmount - discount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
