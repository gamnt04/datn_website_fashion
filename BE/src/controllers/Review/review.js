import Products from "../../models/Items/Products.js";
import { StatusCodes } from "http-status-codes";

export const addReviewProduct = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { contentReview, imagesReview, videoReview } = req.body;

    // Kiểm tra xem contentReview có tồn tại không
    if (!contentReview || typeof contentReview !== "string") {
      return res
        .status(400)
        .json({ error: "Content review is required and must be a string." });
    }

    // Tìm sản phẩm theo ID
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Tạo đối tượng đánh giá
    const review = {
      user: userId,
      contentReview: contentReview, // Sử dụng contentReview thay vì ...content
      imagesReview: imagesReview || [], // Xử lý hình ảnh (nếu có)
      videoReview: videoReview || "", // Xử lý video (nếu có)
    };

    // Thêm đánh giá vào sản phẩm
    product.reviews.push(review);
    await product.save();

    // Trả về phản hồi với thông tin đánh giá bao gồm cả ảnh
    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("Failed to add review:", error);
    return res.status(500).json({ error: error.message });
  }
};
export const getAllReviewsInProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId).populate(
      "reviews.user",
      "userName"
    );
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
    const { userId, productId, reviewId } = req.params;
    const { contentReview } = req.body;

    // Tìm sản phẩm chứa review
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    // Tìm review trong sản phẩm
    const review = product.reviews.id(reviewId);
    if (!review) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Review not found" });
    }

    // Kiểm tra quyền sở hữu
    if (!review.user.equals(userId)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "You can only update your own reviews" });
    }

    // Cập nhật các trường nếu có
    if (contentReview) {
      review.contentReview = contentReview;
    }

    // Cập nhật thời gian cập nhật
    review.updated_at = Date.now();
    await product.save();

    // Tìm lại review đã cập nhật
    const updatedProduct = await Products.findById(productId);
    const updatedReview = updatedProduct.reviews.id(reviewId);

    // Trả về phản hồi với thông tin cập nhật
    return res
      .status(StatusCodes.OK)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    console.error("Failed to update review:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const deleteReviewProduct = async (req, res) => {
  try {
    const { userId, productId, reviewId } = req.params;

    // Tìm sản phẩm theo productId
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    // Tìm review trong sản phẩm
    const review = product.reviews.id(reviewId);
    if (!review) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Review not found" });
    }

    // Kiểm tra xem review có thuộc về người dùng hiện tại không
    if (!review.user.equals(userId)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "You can only delete your own reviews" });
    }

    // Xóa review khỏi mảng reviews
    product.reviews.pull(reviewId);
    await product.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Failed to delete review:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Tìm sản phẩm chứa review
    const product = await Products.findOne({ "reviews._id": reviewId });
    if (!product) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Tìm review trong sản phẩm
    const review = product.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Trả về thông tin review
    return res.status(200).json({ review });
  } catch (error) {
    console.error("Failed to get review:", error);
    return res.status(500).json({ error: error.message });
  }
};
