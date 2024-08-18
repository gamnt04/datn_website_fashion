import ReviewProduct from "../../models/Review/review.js";
import mongoose from "mongoose";
export const addReviewProduct = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { content } = req.body;
    const review = new ReviewProduct({
      user: userId,
      product: productId,
      content,
    });
    await review.save();
    res.status(201).json({ message: "Gửi đánh giá thành công!", review });
  } catch (error) {
    console.log({ error: "Failed to add review" });
    return res.status(500).json({ error: error.message });
  }
};

export const getAllReviewsInProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewProduct.find({ product: productId }).populate(
      "user",
      "userName"
    );
    res
      .status(200)
      .json({ message: "Danh sách đánh giá trong sản phẩm:", reviews });
  } catch (error) {
    console.error("Error getting all reviews in product:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateReviewProduct = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    const updatedReview = await ReviewProduct.findByIdAndUpdate(
      reviewId,
      { content, updated_at: Date.now() },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Cập nhật đánh giá thành công", review: updatedReview });
  } catch (error) {
    console.error("Failed to update review:", error);
    return res.status(500).json({ error: error.message });
  }
};
export const deleteReviewProduct = async (req, res) => {
  try {
    const { reviewId } = req.params;
    await ReviewProduct.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "review deleted" });
  } catch (error) {
    console.log({ error: "Failed to delete review" });
    return res.status(500).json({ error: error.message });
  }
};
