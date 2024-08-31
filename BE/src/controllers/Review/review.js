import Products from "../../models/Items/Products.js";
import User from "../../models/Auth/users.js";
import Review from "../../models/review/review.js";
import Order from "../../models/Orders/orders.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export const addReviewProduct = async (req, res) => {
  try {
    const { userId } = req.params;
    const { orderId, productId, contentReview } = req.body;

    // Kiểm tra xem contentReview có tồn tại không
    if (!contentReview || typeof contentReview !== "string") {
      return res
        .status(400)
        .json({ error: "nội dung review là bắt buộc và phải là 1 chuỗi" });
    }

    // Tìm sản phẩm theo ID
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "ProductId not found" });
    }

    // Tìm đơn hàng theo ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "OrderId not found" });
    }

    // Tìm tất cả các review của đơn hàng
    const reviews = await Review.find({ orderId: orderId });

    // Kiểm tra xem người dùng đã đánh giá sản phẩm này trong đơn hàng chưa
    const existingReview = reviews.find(
      (review) =>
        review.productId.toString() === productId &&
        review.userId.toString() === userId
    );

    if (existingReview) {
      return res.status(400).json({
        error: "Bạn đã đánh giá sản phẩm này trong đơn hàng rồi!",
      });
    }

    // Tạo và lưu review
    const newReview = new Review({
      userId,
      orderId,
      productId,
      contentReview,
    });
    const saveReview = await newReview.save();

    // Khởi tạo mảng reviews nếu chưa tồn tại
    if (!product.reviews) {
      product.reviews = [];
    }
    product.reviews.push(saveReview._id);
    await product.save();

    if (!order.reviews) {
      order.reviews = [];
    }
    order.reviews.push(saveReview._id);
    await order.save();

    res.status(201).json({
      message: "Review added successfully",
      saveReview,
    });
  } catch (error) {
    console.error("Failed to add review:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllReviewsInProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId).populate({
      path: "reviews",
      populate: {
        path: "userId", // Populate userId để lấy thông tin người dùng
        select: "userName", // Chọn các trường bạn cần
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product reviews:", reviews: product.reviews });
  } catch (error) {
    console.error("Error getting reviews:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateReviewProduct = async (req, res) => {
  try {
    const { userId, productId, reviewId, orderId } = req.params;
    const { contentReview } = req.body;

    // Tìm sản phẩm theo productId
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    // Tìm review theo reviewId
    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Review not found" });
    }

    // Kiểm tra xem review có thuộc về sản phẩm không
    if (review.productId.toString() !== productId.toString()) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "Review does not belong to this product" });
    }

    // Kiểm tra quyền sở hữu review
    if (!review.userId.equals(userId)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "You can only update your own review" });
    }

    // Cập nhật các trường nếu có
    if (contentReview) {
      review.contentReview = contentReview;
    }

    // Cập nhật thời gian cập nhật
    review.updatedAt = Date.now();

    // Lưu review
    await review.save();

    // Cập nhật đơn hàng nếu orderId được cung cấp
    if (orderId) {
      const order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Order not found" });
      }

      // Tìm review trong mảng reviews của order
      const reviewIndex = order.reviews.findIndex(
        (rev) => rev._id.toString() === reviewId.toString()
      );

      if (reviewIndex !== -1) {
        // Cập nhật review trong order
        order.reviews[reviewIndex].contentReview = review.contentReview;
        order.reviews[reviewIndex].updatedAt = review.updatedAt;

        // Lưu đơn hàng sau khi cập nhật
        await order.save();
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Review not found in the specified order" });
      }
    }

    // Trả về phản hồi với thông tin cập nhật
    return res
      .status(StatusCodes.OK)
      .json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Failed to update review:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const deleteReviewProduct = async (req, res) => {
  try {
    // Kiểm tra và lấy dữ liệu từ req.params
    const { userId, orderId, productId, reviewId } = req.params;

    // Kiểm tra các tham số đầu vào
    if (!userId || !orderId || !productId || !reviewId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Thiếu thông tin đầu vào" });
    }

    // Tìm sản phẩm theo productId
    const product = await Products.findById(productId);
    if (!product) {
      console.log("Product not found");
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    // Tìm review theo reviewId
    const review = await Review.findById(reviewId);
    if (!review) {
      console.log("Review not found");
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Review not found" });
    }

    // Kiểm tra xem review có thuộc về sản phẩm và người dùng hiện tại không
    if (review.productId.toString() !== productId.toString()) {
      console.log("Review does not belong to this product");
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "Review does not belong to this product" });
    }

    if (review.userId.toString() !== userId.toString()) {
      console.log("You can only delete your own review");
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "Bạn chỉ có thể xóa review của bạn mà thôi!" });
    }

    // Xóa review khỏi sản phẩm
    product.reviews.pull(reviewId);
    await product.save();

    // Xóa review khỏi đơn hàng (nếu có)
    await Order.updateMany({ _id: orderId }, { $pull: { reviews: reviewId } });

    // Xóa review khỏi cơ sở dữ liệu
    await Review.findByIdAndDelete(reviewId);

    console.log("Review deleted successfully");
    return res
      .status(StatusCodes.OK)
      .json({ message: "Xóa review thành công" });
  } catch (error) {
    console.error("Xóa review thất bại:", error.message);

    // Kiểm tra lỗi cụ thể liên quan đến JSON
    if (error instanceof SyntaxError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Dữ liệu đầu vào không hợp lệ" });
    }

    // Xử lý lỗi khác
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Có lỗi xảy ra trong quá trình xử lý" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Kiểm tra xem reviewId có phải là ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    // Tìm review và populate productId và userId
    const review = await Review.findById(reviewId)
      .populate("productId")
      .populate("userId", "userName"); // Populate userId và chỉ lấy trường userName

    console.log("Review:", review); // Log review để kiểm tra dữ liệu

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Trả về thông tin review, sản phẩm và người dùng
    return res.status(200).json({ review });
  } catch (error) {
    console.error("Failed to get review:", error);
    return res.status(500).json({ error: error.message });
  }
};
