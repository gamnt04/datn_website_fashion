import { StatusCodes } from "http-status-codes";
import Order from "../../models/Orders/orders";
import Attributes from "../../models/attribute/attribute";
import Products from "../../models/Items/Products";
import SendMail from "../SendMail/SendMail";
import SendCancellationMail from "../SendMail/HuyMail";
import SendDeliverySuccessMail from "../SendMail/ThanhCongMail";
import moment from "moment";
import fetch from "node-fetch";
import * as turf from "@turf/turf";

// Middleware xác thực
import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
  if (!token) {
    return res.status(401).json({ message: "Chưa cung cấp token" });
  }

  jwt.verify(token, "123456", (err, decoded) => {
    if (err) {
      console.error("Lỗi xác thực token:", err.message);
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next();
  });
};

export const createOrder = async (req, res) => {
  const {
    userId,
    items,
    customerInfo,
    email,
    totalPrice,
    discountCode = null,
    discountAmount = 0,
  } = req.body;
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
      discountCode: discountCode || null, // Lưu mã giảm giá nếu có
      discountAmount: discountAmount || 0, // Lưu số tiền giảm giá nếu có
    });

    for (let i of items) {
      if (i.productId.attributes) {
        const data_attr = await Attributes.find({ id_item: i.productId._id });
        for (let j of data_attr) {
          for (let k of j.values) {
            if (k.color == i.color_item) {
              for (let x of k.size) {
                if (x.name_size) {
                  if (x.name_size == i.name_size) {
                    if (x.stock_attribute < i.quantity) {
                      return res.status(StatusCodes.BAD_REQUEST).json({
                        message: "Sản phẩm không đủ hàng",
                      });
                    } else {
                      x.stock_attribute = x.stock_attribute - i.quantity;
                    }
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
    await order.save();

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
    const requestBody = JSON.parse(JSON.stringify(req.body));
    const { userId, items, customerInfo, totalPrice } = requestBody;
    const data = await Order.create(requestBody);
    for (let i of items) {
      if (i.productId.attributes) {
        const data_attr = await Attributes.find({ id_item: i.productId._id });
        for (let j of data_attr) {
          for (let k of j.values) {
            if (k.color === i.color_item) {
              for (let x of k.size) {
                if (x.name_size === i.name_size) {
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

    if (data) {
      // Gửi email xác nhận đơn hàng
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

// export const getAllOrdersToday = async (req, res) => {
//   try {
//     const startOfDay = new Date();
//     startOfDay.setHours(0, 0, 0, 0);
//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);
//     const ordersToday = await Order.find({
//       datetime: {
//         $gte: startOfDay,
//         $lte: endOfDay
//       }
//     }).exec();
//     return res.status(StatusCodes.OK).json(ordersToday);
//   } catch (error) {
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: error.message });
//   }
// };
export const getAllOrdersToday = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const ordersToday = await Order.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).exec();
    // const ordersToday = await Order.find();
    return res.status(StatusCodes.OK).json(ordersToday);
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
      createdAt: {
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
const timeZone = "Asia/Ho_Chi_Minh";

export const getOrderByDayOfWeek = async (req, res) => {
  try {
    const now = new Date();
    const dayOfWeek = now.getDay();

    const adjustedDayOfWeek = (dayOfWeek + 6) % 7;

    const startWeek = new Date(now);
    startWeek.setDate(now.getDate() - adjustedDayOfWeek);
    startWeek.setHours(0, 0, 0, 0);

    const orderByDay = [];

    for (let i = 0; i < 7; i++) {
      let currentDay = new Date(startWeek);
      currentDay.setDate(currentDay.getDate() + i);
      currentDay.setHours(0, 0, 0, 0);
      let startOfDay = new Date(
        currentDay.toLocaleString("en-US", { timeZone })
      );
      startOfDay.setHours(0, 0, 0, 0);
      let endOfDay = new Date(startOfDay);
      endOfDay.setDate(startOfDay.getDate() + 1);
      endOfDay.setHours(0, 0, 0, 0);

      const orderDay = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfDay,
              $lt: endOfDay,
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
          day: startOfDay.toISOString().slice(0, 10),
          totalOrders: orderDay[0].totalOrders,
          totalRevenue: orderDay[0].totalRevenue,
        });
      } else {
        orderByDay.push({
          day: startOfDay.toISOString().slice(0, 10),
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
      createdAt: {
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
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
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

const getCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      console.log(`Tọa độ tìm thấy cho địa chỉ: ${address}`, data[0]);
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    } else {
      console.warn(`Không tìm thấy tọa độ cho địa chỉ: ${address}`);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy tọa độ:", error);
    return null;
  }
};

const calculateDistance = (startCoords, destinationCoords) => {
  const from = turf.point([startCoords.lon, startCoords.lat]);
  const to = turf.point([destinationCoords.lon, destinationCoords.lat]);
  const options = { units: "kilometers" };
  return turf.distance(from, to, options);
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("shipperId");

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }

    const warehouseAddress =
      "FPT Polytechnic, Trịnh Văn Bô, Nam Từ Liêm, Hà Nội";

    const warehouseCoords = await getCoordinates(warehouseAddress);
    const customerCoords = await getCoordinates(order.customerInfo.address);

    if (!warehouseCoords) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: `Không thể tìm thấy tọa độ của địa chỉ kho: ${warehouseAddress}`,
      });
    }

    if (!customerCoords) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: `Không thể tìm thấy tọa độ của địa chỉ người nhận: ${order.customerInfo.address}`,
      });
    }

    const distance = calculateDistance(warehouseCoords, customerCoords);

    return res.status(StatusCodes.OK).json({
      ...order.toObject(),
      deliveryDistance: distance.toFixed(2) + " km",
    });
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
    sort: _sort || { createdAt: -1 }, // Sắp xếp theo thời gian tạo nếu không có `_sort`
    populate: "reviews", // Thêm populate để lấy dữ liệu reviews luôn
  };

  const query = { userId: req.params.userId };

  if (_search) {
    query._id = { $regex: _search, $options: "i" }; // Tìm kiếm theo ID hoặc các trường khác
  }

  if (_status) {
    query.status = _status; // Lọc theo trạng thái đơn hàng
  }

  try {
    const order = await Order.paginate(query, options);
    if (!order || order.docs.length === 0) {
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
    console.log("status", req.body);

    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }
    if (order.status === "6" || order.status === "7") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Order cannot be updated" });
    }
    order.status = status;
    if (status == "4") {
      order.deliveredAt = new Date();
    }
    order.statusHistory.push({
      status,
      time: new Date(),
    });
    if (status === "7") {
      const items = order.items;
      for (let i of items) {
        // Xử lý thay đổi số lượng sản phẩm
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

      // Send cancellation email
      try {
        await SendCancellationMail(
          order.customerInfo.email,
          order,
          order.cancellationReason
        );
      } catch (emailError) {
        console.error("Lỗi gửi email:", emailError);
        // Optionally, handle the case where the email fails
      }
    }
    // if (status === 2) {
    //   const items = order.items;
    //   for (let i of items) {
    //     if (i.productId.attributes) {
    //       const data_attr = await Attributes.find({ id_item: i.productId._id });
    //       for (let j of data_attr) {
    //         for (let k of j.values) {
    //           if (k.color == i.color_item) {
    //             for (let x of k.size) {
    //               if (x.name_size) {
    //                 if (x.name_size == i.name_size) {
    //                   x.stock_attribute = x.stock_attribute - i.quantity;
    //                 }
    //               } else {
    //                 x.stock_attribute = x.stock_attribute - i.quantity;
    //               }
    //             }
    //           }
    //         }
    //         await j.save();
    //       }
    //     } else {
    //       const data_items = await Products.find({ _id: i.productId._id });
    //       for (let a of data_items) {
    //         a.stock_product = a.stock_product - i.quantity;
    //         await a.save();
    //       }
    //     }
    //   }
    // }

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
    sort: _sort ? { [_sort]: 1 } : { createdAt: -1 },
  };
  const { role, userId } = req.user;

  let orders;
  const query = {};

  if (role === "courier") {
    query.shipperId = userId;
  }

  if (_search) {
    query._id = { $regex: _search, $options: "i" };
  }

  if (_status) {
    query.status = _status;
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
      totalDocs: data.totalDocs,
      totalPages: data.totalPages,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server!",
    });
  }
}

export const userCancelOrder = async (req, res) => {
  const { id } = req.params;
  const { cancellationReason } = req.body;

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
    if (cancellationReason) {
      order.cancellationReason = cancellationReason;
    }
    await order.save();
    console.log("Lý do hủy đơn hàng:", order.cancellationReason);

    // Send email notification
    // try {
    //   await SendCancellationMail(order.customerInfo.email, order, order.cancellationReason);
    // } catch (emailError) {
    //   console.error("Lỗi gửi email:", emailError);
    //   // Optionally, handle the case where the email fails
    // }

    res.status(StatusCodes.OK).json({
      message: "Yêu cầu hủy đơn hàng thành công",
      data_status_order: order.cancellationRequested,
    });
  } catch (error) {
    console.error("Lỗi máy chủ:", error);
    return res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};

export const adminCancelOrder = async (req, res) => {
  const id = req.params.id;
  const { confirm } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy đơn hàng" });
    }
    if (!order.cancellationRequested) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Không có yêu cầu hủy đơn hàng" });
    }

    if (confirm) {
      order.status = "7"; // Canceled
      order.cancelledByAdmin = true;

      const items = order.items;
      for (let i of items) {
        // Xử lý thay đổi số lượng sản phẩm
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

      // Send cancellation email
      try {
        await SendCancellationMail(
          order.customerInfo.email,
          order,
          order.cancellationReason
        );
      } catch (emailError) {
        console.error("Lỗi gửi email:", emailError);
        // Optionally, handle the case where the email fails
      }
    } else {
      order.cancellationRequested = false;
    }

    await order.save();
    res.status(StatusCodes.OK).json({
      message: "Yêu cầu hủy đơn hàng đã được xác nhận",
      data_status_order: order.cancellationRequested,
    });
  } catch (error) {
    console.error("Lỗi máy chủ:", error);
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
export const getOrderByNumberOrPhoneNumber = async (req, res) => {
  try {
    const { searchOrder } = req.body;
    // const { id } = req.params.id;

    // console.log("Shipper ID:", id);

    const orders = await Order.find({
      // shipperId: id,
      $or: [
        { orderNumber: { $regex: new RegExp(searchOrder, "i") } },
        { "customerInfo.phone": { $regex: new RegExp(searchOrder, "i") } },
      ],
    }).lean();

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "Không có đơn hàng nào khớp với tìm kiếm",
      });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Lỗi server",
    });
  }
};

export const get10NewOrderToday = async (req, res) => {
  try {
    const startOfday = new Date();
    startOfday.setHours(0, 0, 0, 0);
    const endOfday = new Date();
    endOfday.setHours(23, 59, 59, 999);
    const orderToDay = await Order.find({
      createdAt: {
        $gte: startOfday,
        $lte: endOfday,
      },
    })
      .sort({ createdAt: 1 })
      .limit(10)
      .exec();

    if (!orderToDay || orderToDay.length === 0) {
      return res.status(404).json({ message: "Đơn hàng không tìm thấy!" });
    }
    return res.status(StatusCodes.OK).json(orderToDay);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server",
    });
  }
};
export const deliverSuccess = async (req, res) => {
  try {
    const { orderId, confirmationImage } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại." });
    }

    // Update order status and confirmation image
    order.status = "4";
    order.confirmationImage = confirmationImage;
    await order.save();

    // Send email notification
    try {
      await SendDeliverySuccessMail(order.customerInfo.email, order);
    } catch (emailError) {
      console.error("Lỗi gửi email:", emailError);
      return res.status(500).json({ message: "Gửi email thông báo thất bại." });
    }

    res.status(200).json({
      message:
        "Đơn hàng đã được đánh dấu là giao hàng thành công và email đã được gửi.",
      order,
    });
  } catch (error) {
    res.status(500).json({ name: error.name, message: error.message });
  }
};
export const addShipperOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { shipperId } = req.body;

    // Kiểm tra xem đơn hàng có tồn tại không
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Order not found" });
    }

    // Cập nhật shipperId cho đơn hàng
    order.shipperId = shipperId;
    await order.save();

    // Trả về kết quả sau khi cập nhật thành công
    return res.status(StatusCodes.OK).json({
      message: "Shipper has been updated successfully",
      updatedOrder: order,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
export const adminFailDelivery = async (req, res) => {
  const id = req.params.id;
  const { failureReason } = req.body; // Lấy lý do từ request body

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy đơn hàng" });
    }

    // Kiểm tra nếu đơn hàng đã hoàn thành hoặc bị hủy thì không cho phép cập nhật giao hàng thất bại
    if (order.status === "completed" || order.status === "5") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Không thể cập nhật trạng thái thất bại cho đơn hàng đã hoàn thành hoặc bị hủy",
      });
    }

    // Cập nhật trạng thái thành 'Giao hàng thất bại'
    order.status = "5"; // Giao hàng thất bại
    order.failureReason = failureReason; // Lưu lý do giao hàng thất bại

    const items = order.items;
    for (let i of items) {
      // Xử lý thay đổi số lượng sản phẩm (tương tự phần hủy đơn)
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

    await order.save();
    res.status(StatusCodes.OK).json({
      message: "Đơn hàng đã được cập nhật trạng thái giao hàng thất bại",
      failureReason: order.failureReason,
    });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};

//Hàm tra cứu đơn hàng theo số điện thoại
export const getOrdersByPhone = async (req, res) => {
  const { phone } = req.query;
  try {
    const orders = await Order.find({ "customerInfo.phone": phone });
    if (!orders.length) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getTotalOrdersByRole = async (req, res) => {
  try {
    const user = req.user;
    if (user.role === "admin") {
      const shippers = await Shipper.find();
      const shipperData = await Promise.all(
        shippers.map(async (shipper) => {
          const orders = await Order.find({
            shipperId: shipper._id,
            status: "6",
          });

          if (orders.length > 0) {
            const ordersByDate = orders.reduce((acc, order) => {
              const orderDate = new Date(order.deliveredAt)
                .toISOString()
                .split("T")[0];
              if (!acc[orderDate]) {
                acc[orderDate] = {
                  count: 1,
                  addresses: [order.customerInfo.address],
                };
              } else {
                acc[orderDate].count += 1;
                acc[orderDate].addresses.push(order.customerInfo.address);
              }
              return acc;
            }, {});

            const orderDetails = Object.entries(ordersByDate).map(
              ([date, details]) => ({
                date,
                count: details.count,
                addresses: details.addresses,
              })
            );

            return {
              fullName: shipper.fullName,
              totalOrders: orders.length,
              ordersByDate: orderDetails,
            };
          }
          return null;
        })
      );

      const filteredShippers = shipperData.filter(
        (shipper) => shipper !== null
      );
      return res.status(200).json({
        message: "Admin - Tổng quan số lượng đơn hàng đã giao của các shipper",
        shippers: filteredShippers,
      });
    } else if (user.role === "courier") {
      const shipperInfo = await Shipper.findById(user.userId);
      const orders = await Order.find({
        shipperId: user.userId,
        status: "6",
      });

      const ordersByDate = orders.reduce((acc, order) => {
        const orderDate = new Date(order.deliveredAt)
          .toISOString()
          .split("T")[0];
        if (!acc[orderDate]) {
          acc[orderDate] = {
            count: 1,
            addresses: [order.customerInfo.address],
          };
        } else {
          acc[orderDate].count += 1;
          acc[orderDate].addresses.push(order.customerInfo.address);
        }
        return acc;
      }, {});

      const orderDetails = Object.entries(ordersByDate).map(
        ([date, details]) => ({
          date,
          count: details.count,
          addresses: details.addresses,
        })
      );

      return res.status(200).json({
        fullName: shipperInfo ? shipperInfo.fullName : user.fullName,
        totalOrders: orders.length,
        ordersByDate: orderDetails,
      });
    } else {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
export const fetchOrdersToday = async (req, res) => {
  const user = req.user;

  // Kiểm tra quyền truy cập
  if (user.role !== "courier") {
    return res.status(403).json({ message: "Không có quyền truy cập" });
  }

  try {
    const targetDate = new Date();
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    // Lấy danh sách đơn hàng
    const orders = await Order.find({
      shipperId: user.userId,
      status: { $in: [5, 6] }, // Chỉ lấy trạng thái giao hàng thành công (6) hoặc thất bại (5)
      deliveredAt: { $gte: startOfDay, $lte: endOfDay },
    })
      .select("quantity status deliveredAt") // Không chọn customerInfo ở đây
      .populate("customerInfo", "userName orderName"); // Populate để lấy tên người mua hàng

    return res.status(200).json({
      message: "Danh sách đơn hàng theo ngày của shipper",
      date: targetDate.toISOString().split("T")[0],
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const fetchOrdersThisWeek = async (req, res) => {
  const user = req.user; // Người dùng đã đăng nhập

  // Kiểm tra xem người dùng có vai trò shipper không
  if (user.role !== "courier") {
    return res.status(403).json({ message: "Không có quyền truy cập" });
  }

  try {
    // Lấy ngày hiện tại
    const today = new Date();

    // Tính toán ngày bắt đầu tuần (Thứ Hai)
    const firstDayOfWeek = new Date(today);
    const dayOfWeek = today.getDay(); // 0 = Chủ Nhật, 1 = Thứ Hai, ..., 6 = Thứ Bảy
    const daysToSubtract = (dayOfWeek + 6) % 7; // Số ngày cần trừ để đến Thứ Hai
    firstDayOfWeek.setDate(today.getDate() - daysToSubtract); // Ngày đầu tuần (Thứ Hai)
    firstDayOfWeek.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00

    // Tính toán ngày cuối tuần (Chủ Nhật)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Ngày cuối tuần (Chủ Nhật)
    lastDayOfWeek.setHours(23, 59, 59, 999); // Đặt giờ về 23:59:59

    // Mảng để lưu số lượng đơn hàng cho mỗi ngày trong tuần
    const ordersPerDay = [];

    // Lặp qua từng ngày trong tuần để tính số lượng đơn hàng
    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(firstDayOfWeek);
      dayStart.setDate(firstDayOfWeek.getDate() + i);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      // Đếm số lượng đơn hàng trong ngày
      const dailyOrdersCount = await Order.countDocuments({
        shipperId: user.userId, // ID của shipper từ phiên đăng nhập
        status: { $in: [5, 6] }, // Trạng thái thành công (6) và thất bại (5)
        deliveredAt: { $gte: dayStart, $lte: dayEnd }, // Kiểm tra thời gian giao hàng trong ngày
      });

      // Thêm số lượng đơn hàng trong ngày vào mảng
      ordersPerDay.push(dailyOrdersCount);
    }

    // Tính tổng số đơn hàng trong tuần
    const totalOrders = ordersPerDay.reduce((acc, count) => acc + count, 0);

    return res.status(200).json({
      message:
        "Tổng số đơn hàng theo tuần của shipper (thành công và thất bại)",
      weekStart: firstDayOfWeek.toISOString().split("T")[0], // Ngày bắt đầu tuần
      weekEnd: lastDayOfWeek.toISOString().split("T")[0], // Ngày kết thúc tuần
      totalOrders,
      ordersPerDay, // Số lượng đơn hàng theo từng ngày trong tuần
    });
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
export const fetchOrdersThisMonth = async (req, res) => {
  const user = req.user; // Người dùng đã đăng nhập

  // Kiểm tra xem người dùng có vai trò shipper không
  if (user.role !== "courier") {
    return res.status(403).json({ message: "Không có quyền truy cập" });
  }

  try {
    // Lấy ngày hiện tại
    const today = new Date();

    // Tính toán ngày bắt đầu tháng
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    firstDayOfMonth.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00

    // Tính toán ngày cuối tháng
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    lastDayOfMonth.setHours(23, 59, 59, 999); // Đặt giờ về 23:59:59

    // Tính tổng số đơn hàng đã giao cho shipper theo tháng (thành công và thất bại)
    const totalOrders = await Order.countDocuments({
      shipperId: user.userId,
      status: { $in: [5, 6] }, // Trạng thái thành công (6) và thất bại (5)
      deliveredAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    // Tính số lượng đơn hàng theo từng tuần
    const weeksOrders = [];
    const startDate = new Date(firstDayOfMonth);
    const endDate = new Date(lastDayOfMonth);

    // Lặp qua từng tuần trong tháng
    for (
      let weekStart = startDate;
      weekStart <= endDate;
      weekStart.setDate(weekStart.getDate() + 7)
    ) {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6); // Ngày kết thúc của tuần

      // Đảm bảo tuần không vượt quá cuối tháng
      if (weekEnd > endDate) weekEnd.setTime(endDate.getTime());

      // Đếm số đơn hàng trong tuần
      const weeklyCount = await Order.countDocuments({
        shipperId: user.userId,
        status: { $in: [5, 6] },
        deliveredAt: { $gte: weekStart, $lte: weekEnd },
      });

      weeksOrders.push({
        weekStart: weekStart.toISOString().split("T")[0],
        weekEnd: weekEnd.toISOString().split("T")[0],
        count: weeklyCount,
      });
    }

    return res.status(200).json({
      message:
        "Tổng số đơn hàng theo tháng của shipper (thành công và thất bại)",
      monthStart: firstDayOfMonth.toISOString().split("T")[0],
      monthEnd: lastDayOfMonth.toISOString().split("T")[0],
      totalOrders,
      weeksOrders, // Dữ liệu số lượng đơn hàng theo từng tuần
    });
  } catch (error) {
    console.error("Error fetching orders: ", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
export const fetchOrderSuccessFailureStats = async (req, res) => {
  const user = req.user;

  // Kiểm tra quyền truy cập
  if (user.role !== "courier") {
    return res.status(403).json({ message: "Không có quyền truy cập" });
  }

  try {
    // Đếm số lượng đơn hàng thành công và thất bại
    const successCount = await Order.countDocuments({
      shipperId: user.userId,
      status: 6, // Trạng thái giao hàng thành công
    });

    const failureCount = await Order.countDocuments({
      shipperId: user.userId,
      status: 5, // Trạng thái giao hàng thất bại
    });

    return res.status(200).json({
      message: "Thống kê đơn hàng thành công và thất bại của shipper",
      successCount,
      failureCount,
    });
  } catch (error) {
    console.error("Error fetching order stats: ", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

