import { StatusCodes } from "http-status-codes";
import Order from "../../models/Orders/orders";
import Cart from "../../models/Cart/cart";
import Attributes from "../../models/attribute/attribute";
import Products from "../../models/Items/Products";
import SendMail from "../SendMail/SendMail";
export const createOrder = async (req, res) => {
  const { userId, items, customerInfo, email, totalPrice } = req.body;
  if (
    !customerInfo.email ||
    !customerInfo.phone ||
    !customerInfo.userName ||
    !customerInfo.payment ||
    !customerInfo.address
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Thông tin khách hàng không đầy đủ." });
  }
  try {
    const order = new Order({
      userId,
      items,
      customerInfo: {
        email: customerInfo.email,
        phone: customerInfo.phone,
        payment: customerInfo.payment,
        userName: customerInfo.userName,
        address: `${customerInfo.address || ""}${
          customerInfo.addressDetail || ""
        }`,
      },
      totalPrice,
    });
    await order.save();
    const dataCart = await Cart.findOne({ userId }).populate("products");
    if (!dataCart) {
      console.error("Cart not found for userId:", userId);
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Cart not found" });
    }
    dataCart.products = dataCart.products.filter((i) => {
      return !req.body.items.some((j) => {
        if (i.productId._id.toString() === j.productId._id.toString()) {
          if (i.status_checked) {
            return true;
          }
        }
        return false;
      });
    });
    await dataCart.save();
    await SendMail(email, order);
    return res.status(StatusCodes.CREATED).json(order);
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi rồi đại ca ơi" });
  }
};
export const createOrderPayment = async (req, res) => {
  try {
    // Chuyển req.body sang đối tượng JSON
    const requestBody = JSON.parse(JSON.stringify(req.body));
    const { userId, items, customerInfo, totalPrice } = requestBody;
    console.log(requestBody);

    const data = await Order.create(requestBody);
    console.log(data);

    for (let i of items) {
      if (i.productId.attributes) {
        const data_attr = await Attributes.find({ id_item: i.productId._id });
        for (let j of data_attr) {
          for (let k of j.values) {
            if (k.color == i.color_item) {
              for (let x of k.size) {
                if (x.name_size) {
                  if (x.name_size == i.name_size) {
                    x.stock_attribute = x.stock_attribute - i.quantity;
                  }
                } else {
                  x.stock_attribute = x.stock_attribute - i.quantity;
                }
              }
            }
          }
          await j.save();
        }
      } else {
        const data_items = await Products.find({ _id: i.productId._id });
        for (let a of data_items) {
          a.stock_product = a.stock_product - i.quantity;
          await a.save();
        }
      }
    }

    // Giả sử dataCart được lấy từ cơ sở dữ liệu
    const dataCart = await Cart.findOne({ userId: userId });
    if (!dataCart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    dataCart.products = dataCart.products.filter((i) => {
      return !req.body.items.some((j) => {
        if (i.productId._id.toString() === j.productId._id.toString()) {
          if (i.status_checked) {
            return true;
          }
        }
        return false;
      });
    });
    await dataCart.save();

    if (data) {
      const order = new Order({
        userId,
        items,
        customerInfo: {
          email: customerInfo.email,
          phone: customerInfo.phone,
          payment: customerInfo.payment,
          userName: customerInfo.userName,
          address: `${customerInfo.address || ""}${
            customerInfo.addressDetail || ""
          }`,
        },
        totalPrice,
      });
      await SendMail(customerInfo.email, order);
      await Cart.findOneAndDelete({ userId: userId });
      return res
        .status(201)
        .json({ data, message: "Tạo đơn hàng thanh toán online thành công" });
    } else {
      return res
        .status(400)
        .json({ message: "Lỗi rồi fix lại thanh toán online" });
    }
  } catch (error) {
    console.error("Error creating order payment:", error);
    return res
      .status(500)
      .json({ message: "Lỗi rồi fix lại thanh toán online" });
  }
};
export const getAllOrderToday = async (req, res) => {
  try {
    const startOfday = new Date();
    startOfday.setHours(0, 0, 0, 0);
    const endOfday = new Date();
    endOfday.setHours(23, 59, 59, 999);
    const orderToDay = await Order.find({
      datetime: {
        $gte: startOfday,
        $lte: endOfday,
      },
    }).exec();
    return res.status(StatusCodes.OK).json(orderToDay);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const getAllOrderWeek = async (req, res) => {
  try {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startWeek = new Date(now);
    startWeek.setDate(now.getDate() - (dayOfWeek - 1));
    startWeek.setHours(0, 0, 0, 0);
    const endWeek = new Date(startWeek);
    endWeek.setDate(startWeek.getDate() + 6);
    endWeek.setHours(23, 59, 59, 999);
    const orderOfWeek = await Order.find({
      datetime: {
        $gte: startWeek,
        $lte: endWeek,
      },
    }).exec();
    return res.status(StatusCodes.OK).json(orderOfWeek);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const getOrderByDayOfWeek = async (req, res) => {
  try {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    startWeek.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    startWeek.setHours(0, 0, 0, 0);

    const orderByDay = [];

    for (let i = 0; i < 7; i++) {
      let currentDay = new Date(startWeek);
      currentDay.setDate(currentDay.getDate() + i);
      let nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);

      const orderDay = await Order.aggregate([
        {
          $match: {
            datetime: {
              $gte: currentDay,
              $lt: nextDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: "$totalPrice" },
          },
        },
      ]);

      if (orderDay.length > 0) {
        orderByDay.push({
          day: currentDay.toISOString().slice(0, 10), // Ngày theo định dạng YYYY-MM-DD
          totalOrders: orderDay[0].totalOrders,
          totalRevenue: orderDay[0].totalRevenue,
        });
      } else {
        orderByDay.push({
          day: currentDay.toISOString().slice(0, 10),
          totalOrders: 0,
          totalRevenue: 0,
        });
      }
    }

    return res.status(StatusCodes.OK).json({ data: orderByDay });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const getAllOrderMonth = async (req, res) => {
  try {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startMonth.getHours(0, 0, 0, 0);
    const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    endMonth.getHours(23, 59, 59, 999);
    const orderOfMonth = await Order.find({
      datetime: {
        $gte: startMonth,
        $lte: endMonth,
      },
    }).exec();
    return res.status(StatusCodes.OK).json(orderOfMonth);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const getAllOrderByMonthOfYear = async (req, res) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();

    const ordersByMonth = await Order.aggregate([
      {
        $match: {
          datetime: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$datetime" },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          month: "$_id",
          totalOrders: 1,
          totalRevenue: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(StatusCodes.OK).json({ data: ordersByMonth });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getTop10ProductBestSale = async (req, res) => {
  try {
    const orders = await Order.find({});

    const productSale = {};

    orders.forEach((order) => {
      if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
          const productId = item?.productId?._id?.toString(); // Đảm bảo lấy đúng _id từ productId
          if (productId) {
            if (!productSale[productId]) {
              productSale[productId] = { ...item, quantity: 0 };
            }
            productSale[productId].quantity += item.quantity;
          }
        });
      }
    });

    const top10Products = Object.values(productSale)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    return res.status(StatusCodes.OK).json(top10Products);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Lỗi rồi đại ca ơi" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
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
  const {
    _page = 1,
    _limit = 20,
    _sort = "",
    _search = "",
    _status = "",
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
  };
  const query = { userId: req.params.userId };
  // if (_search) {
  //   query._id = { $regex: _search, $options: 'i' };  // Tìm kiếm theo tên khách hàng
  // }

  // if (_status) {
  //   query.status = _status;  // Lọc theo trạng thái đơn hàng
  // }
  try {
    const order = await Order.paginate(query, options);
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
      new: true,
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
    const { status, total_price } = req.body;

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

    // Update order status
    order.status = status;
    // order.totalPrice = total_price;

    // If order is confirmed, update product quantities
    if (status === "2") {
      const items = order.items;
      for (let i of items) {
        if (i.productId.attributes) {
          const data_attr = await Attributes.find({ id_item: i.productId._id });
          for (let j of data_attr) {
            for (let k of j.values) {
              if (k.color == i.color_item) {
                for (let x of k.size) {
                  if (x.name_size) {
                    if (x.name_size == i.name_size) {
                      x.stock_attribute = x.stock_attribute - i.quantity;
                    }
                  } else {
                    x.stock_attribute = x.stock_attribute - i.quantity;
                  }
                }
              }
            }
            await j.save();
          }
        } else {
          const data_items = await Products.find({ _id: i.productId._id });
          for (let a of data_items) {
            a.stock_product = a.stock_product - i.quantity;
            await a.save();
          }
        }
      }
    }
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
    _sort = "",
    _search = "",
    _status = "",
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: _sort ? { [_sort]: 1 } : { createdAt: -1 }, // Sắp xếp theo trường _sort nếu có, mặc định sắp xếp theo ngày tạo mới nhất
  };

  const query = {};

  // if (_search) {
  //   query._id = { $regex: _search, $options: 'i' };  // Tìm kiếm theo tên khách hàng
  // }

  if (_status) {
    query.status = _status; // Lọc theo trạng thái đơn hàng
  }

  try {
    const data = await Order.paginate(query, options);

    if (!data || data.docs.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không có dữ liệu!",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Hoàn thành!",
      data,
      totalDocs: data.totalDocs, // Tổng số đơn hàng
      totalPages: data.totalPages, // Tổng số trang
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server!",
    });
  }
}

export const userCancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy đơn hàng" });
    }
    if (order.cancellationRequested) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Đơn hàng đã bị hủy" });
    }
    order.cancellationRequested = true;
    await order.save();
    res
      .status(StatusCodes.OK)
      .json({
        message: "Yêu cầu hủy đơn hàng thành công",
        data_status_order: order.cancellationRequested,
      });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};

export const adminCancelOrder = async (req, res) => {
  const { id } = req.params;
  const { confirm } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send("Không tìm thấy đơn hàng");
    }
    if (!order.cancellationRequested) {
      return res.status(400).send("Không có yêu cầu hủy đơn hàng");
    }
    if (confirm) {
      order.status = "5"; // Canceled
      order.cancelledByAdmin = true;

      // Revert product quantities
      const items = order.items;
      for (let i of items) {
        if (i.productId.attributes) {
          const data_attr = await Attributes.find({ id_item: i.productId._id });
          for (let j of data_attr) {
            for (let k of j.values) {
              if (k.color == i.color_item) {
                for (let x of k.size) {
                  if (x.name_size) {
                    if (x.name_size == i.name_size) {
                      x.stock_attribute = x.stock_attribute + i.quantity;
                    }
                  } else {
                    x.stock_attribute = x.stock_attribute + i.quantity;
                  }
                }
              }
            }
            await j.save();
          }
        } else {
          const data_items = await Products.find({ _id: i.productId._id });
          for (let a of data_items) {
            a.stock_product = a.stock_product + i.quantity;
            await a.save();
          }
        }
      }
    } else {
      order.cancellationRequested = false;
    }
    await order.save();
    res.status(200).json({
      message: "Yêu cầu hủy đơn hàng đã được xác nhận",
      data_status_order: order.cancellationRequested,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};
export const getOrderByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const order = await Order.findByOrderNumber(orderNumber);

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tìm thấy!" });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};
