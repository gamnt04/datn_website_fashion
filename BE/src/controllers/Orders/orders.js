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
    console.log(id);
    const { status } = req.body;

    const validStatus = [
      "Chờ xác nhận",
      "Đang chuẩn bị hàng",
      "Đang vận chuyển",
      "Đã giao hàng",
      "Đã hủy"
    ];

    if (!validStatus.includes(status)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid status" });
    }

    const order = await Order.findOne({ _id: id });
    console.log(order);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }

    if (order.status === "Đã giao hàng" || order.status === "Đã hủy") {
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
