import category_attribute from "../../models/attribute/category_attribute";
import thuoc_tinh from "../../models/attribute/thuoc_tinh";
import Attributes from "../../models/attribute/variant";
import { StatusCodes } from "http-status-codes";

// the loai thuoc tinh
export async function tao_loai_thuoc_tinh(req, res) {
  try {
    const check_ten_loai_thuoc_tinh = await category_attribute.findOne({
      name_attribute: req.body.name_attribute,
    });
    if (!req.body.id_account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Khong tim thay tai khoan!",
      });
    }
    if (check_ten_loai_thuoc_tinh) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Loai thuoc tinh da ton tai",
      });
    }
    const check_the_loai_thuoc_tinh = await category_attribute.findOne({
      category_attribute: req.body.category_attribute,
    });
    if (check_the_loai_thuoc_tinh) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Loai thuoc tinh da ton tai",
      });
    }
    await category_attribute.create(req.body);
    return res.status(StatusCodes.CREATED).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function sua_loai_thuoc_tinh(req, res) {
  try {
    const check_ten_loai_thuoc_tinh = await category_attribute.findOne({
      name_attribute: req.body.name_attribute,
    });
    console.log(check_ten_loai_thuoc_tinh);
    if (!req.body.id_account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Khong tim thay tai khoan!",
      });
    }
    if (check_ten_loai_thuoc_tinh) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Loai thuoc tinh da ton tai",
      });
    }
    await category_attribute.create(req.body);
    return res.status(StatusCodes.CREATED).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function xoa_loai_thuoc_tinh(req, res) {
  try {
    if (!req.params.id) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No id",
      });
    }
    await category_attribute.findByIdAndDelete(req.params.id);
    return res.status(StatusCodes.CREATED).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function lay_loai_thuoc_tinh(req, res) {
  try {
    if (!req.params.id_account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Khong tim thay tai khoan!",
      });
    }
    const data = await category_attribute.find({
      id_account: req.params.id_account,
    });
    return res.status(StatusCodes.OK).json({
      data,
      message: "ok",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function lay_1_loai_thuoc_tinh(req, res) {
  try {
    if (!req.params.id_account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Khong tim thay tai khoan!",
      });
    }
    console.log();
    const data = await category_attribute.findOne({
      _id: JSON.parse(req.headers["custom-data-request"]).id_thuoc_tinh,
    });
    return res.status(StatusCodes.OK).json({
      data,
      message: "ok",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

// thuoc tinh

export async function tao_thuoc_tinh(req, res) {
  try {
    if (!req.body.id_account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Khong tim thay tai khoan!",
      });
    }
    const check_ten_thuoc_tinh = await thuoc_tinh.findOne({
      ten_thuoc_tinh: req.body.ten_thuoc_tinh,
    });
    console.log(req.body);
    if (check_ten_thuoc_tinh) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Ten thuoc tinh da ton tai",
      });
    }
    await thuoc_tinh.create(req.body);
    return res.status(StatusCodes.CREATED).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export const lay_tat_ca_thuoc_tinh = async (req, res) => {
  try {
    // Lấy dữ liệu từ model Attribute (AttributeSchema)
    const attributes = await Attributes.find();
    const colors = attributes
      .flatMap((attribute) => attribute.values.map((value) => value.color))
      .filter(Boolean); // Lọc bỏ giá trị null/undefined

    const sizes = attributes
      .flatMap((attribute) =>
        attribute.values.flatMap((value) => value.size.map((s) => s.name_size))
      )
      .filter(Boolean); // Lọc bỏ giá trị null/undefined

    // Lấy dữ liệu từ model Thuoc_tinh (schema_thuoc_tinh)
    const colorAttrs = await thuoc_tinh.find({
      the_loai_thuoc_tinh: "ux_color",
    });
    const sizeAttrs = await thuoc_tinh.find({ the_loai_thuoc_tinh: "ux_size" });

    // Kết hợp tất cả dữ liệu lại và loại bỏ giá trị trùng
    const combinedColors = [
      ...new Set([
        ...colors,
        ...colorAttrs.map((attr) => attr.symbol_thuoc_tinh),
      ]),
    ];

    const combinedSizes = [
      ...new Set([...sizes, ...sizeAttrs.map((attr) => attr.ten_thuoc_tinh)]),
    ];

    // Trả về dữ liệu màu sắc và kích thước
    res.status(200).json({
      colors: combinedColors,
      sizes: combinedSizes,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thuộc tính", error });
  }
};

export async function lay_thuoc_tinh(req, res) {
  try {
    if (!req.params.id_account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Khong tim thay tai khoan!",
      });
    }
    const data = await thuoc_tinh.find({
      id_account: req.params.id_account,
      the_loai_thuoc_tinh: JSON.parse(req.headers["custome-data-request"]),
    });
    return res.status(StatusCodes.OK).json({
      data,
      message: "ok",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function sua_thuoc_tinh(req, res) {
  try {
    if (!req.params.id_account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Khong tim thay tai khoan!",
      });
    }
    const data = await thuoc_tinh.findOneAndUpdate(
      { _id: req.body.id_thuoc_tinh },
      { ten_thuoc_tinh: req.body.ten_thuoc_tinh },
      { new: true }
    );
    return res.status(StatusCodes.OK).json({
      data,
      message: "ok",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export async function xoa_thuoc_tinh(req, res) {
  try {
    if (!req.params.id_account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Khong tim thay tai khoan!",
      });
    }
    const data = await thuoc_tinh.findOneAndDelete({
      _id: req.body.id_thuoc_tinh,
    });
    return res.status(StatusCodes.OK).json({
      data,
      message: "ok",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
