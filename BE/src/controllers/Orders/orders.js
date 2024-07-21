import { StatusCodes } from "http-status-codes";
import Order from "../../models/Orders/orders";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice, customerInfo } = req.body;
    const order = await Order.create({
      userId,
      items,
      totalPrice,
      customerInfo
    });
    return res.status(StatusCodes.CREATED).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const getOrders = async (req, res) => {
  try {
    const { page = 1, status } = req.query;
    const limit = 7;
    const skip = (page - 1) * limit;
    const query = status ? { status } : {};
    const orders = await Order.find(query).skip(skip).limit(limit);
    const totalOrders = await Order.countDocuments(query);

    if (orders.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No orders found" });
    }

    return res.status(StatusCodes.OK).json({
      totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      orders,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    console.log(order);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const getOneOrderUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const order = await Order.find({ userId });
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
      new: true
    });
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status);
    const validStatuses = ["1", "2", "3", "4", "5"];
    if (!validStatuses.includes(status)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid status" });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }
    if (order.status === "4" || order.status === "5") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Order cannot be updated" });
    }
    order.status = status;
    await order.save();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Order status updated successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export async function get_orders_client(req, res) {
  const {
    _page = 1,
    _limit = 7,
    _sort = '',
    _search = '',
    _status = ''
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: _sort ? { [_sort]: 1 } : { createdAt: -1 }  // Sắp xếp theo trường _sort nếu có, mặc định sắp xếp theo ngày tạo mới nhất
  };

  const query = {};

  // if (_search) {
  //   query._id = { $regex: _search, $options: 'i' };  // Tìm kiếm theo tên khách hàng
  // }

  if (_status) {
    query.status = _status;  // Lọc theo trạng thái đơn hàng
  }

  try {
    const data = await Order.paginate(query, options);

    if (!data || data.docs.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không có dữ liệu!"
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Hoàn thành!",
      data,
      totalDocs: data.totalDocs, // Tổng số đơn hàng
      totalPages: data.totalPages // Tổng số trang
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server!"
    });
  }
}

export const userCancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
    console.log(order);
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy đơn hàng" })
    }
    if (order.cancellationRequested) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Đơn hàng đã bị hủy" })
    }
    order.cancellationRequested = true;
    await order.save();
    res.status(StatusCodes.OK).json({ message: "Yêu cầu hủy đơn hàng thành công" })
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

export const adminCancelOrder = async (req, res) => {
  const { id } = req.params;
  const { confirm } = req.body;
  try {
    const order = await Order.findById(id);
    console.log(order);
    if (!order) {
      return res.status(404).send("Không tìm thấy đơn hàng");
    }

    if (!order.cancellationRequested) {
      return res.status(400).send("Không có yêu cầu hủy đơn hàng");
    }
    console.log(!order.cancellationRequested);
    if (confirm) {
      order.status = "5"; // Canceled
      order.cancelledByAdmin = true;
    } else {
      order.cancellationRequested = false;
    }

    await order.save();

    res.status(200).send("Yêu cầu hủy đơn hàng đã được xác nhận");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}



