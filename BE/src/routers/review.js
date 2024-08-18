import express from "express";
import {
  addReviewProduct,
  getAllReviewsInProduct,
  deleteReviewProduct,
  updateReviewProduct,
} from "../controllers/Review/review.js";
const Routes_review = express.Router();
Routes_review.post("/review/:userId/:productId", addReviewProduct);
Routes_review.get("/review/:productId", getAllReviewsInProduct);
Routes_review.put("/review/:reviewId", updateReviewProduct);
Routes_review.delete("/review/:reviewId", deleteReviewProduct);

export default Routes_review;
