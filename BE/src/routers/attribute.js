import { Router } from "express";
import {
  createAttribute,
  getAttributes,
  updateAttribute,
  deleteAttribute,
} from "../controllers/attribute";

const router = Router();
//Route tạo mới 1 thuộc tính
router.post("/attributes", createAttribute);

//Route để thêm giá trị cho thuộc tính đã tồn tại
router.post("/attributes/:id/values", createValueAttribute);

//Route lấy tất cả các thuộc tính
router.get("/attributes", getAllAttributes);

//Route lấy 1 thuộc tính theo id
router.get("/attributes/:id", getAttributeById);

//Route để xóa 1 thuộc tính
router.delete("/attributes/:id", deleteAttribute);

//Route để cập nhật 1 thuộc tính
router.put("/attributes/:id", updateAttribute);

export default router;
