import Shipper from '../../models/Shipper/shipper'; // Import model Shipper
import { StatusCodes } from 'http-status-codes';
// Tạo mới một shipper
export const createShipper = async (req, res) => {
    try {
        const { name, vehicle, phone, store, status, rating } = req.body;
        const newShipper = new Shipper({
            name,
            vehicle,
            phone,
            store,
            status,
            rating
        });

        // Lưu vào cơ sở dữ liệu
        await newShipper.save();

        res.status(201).json({ message: 'Tạo shipper thành công!', shipper: newShipper });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo shipper', error });
    }
};

// Lấy danh sách tất cả các shipper
export const getAllShippers = async (req, res) => {
    try {
        const shippers = await Shipper.find();
        res.status(200).json(shippers);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách shipper', error });
    }
};
// Xem chi tiết một shipper
export const getShipperById = async (req, res) => {
    try {
        const { id } = req.params;
        const shipper = await Shipper.findById(id);
        
        if (!shipper) {
            return res.status(404).json({ message: 'Không tìm thấy shipper' });
        }

        res.status(200).json(shipper);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy shipper', error });
    }
};

// Cập nhật thông tin shipper
export const updateShipper = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, vehicle, phone, store, status, rating } = req.body;

        const updatedShipper = await Shipper.findByIdAndUpdate(
            id,
            { name, vehicle, phone, store, status, rating },
            { new: true } // Trả về dữ liệu mới sau khi cập nhật
        );

        if (!updatedShipper) {
            return res.status(404).json({ message: 'Không tìm thấy shipper' });
        }

        res.status(200).json({ message: 'Cập nhật shipper thành công!', shipper: updatedShipper });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật shipper', error });
    }
};

// Xóa shipper
export const deleteShipper = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedShipper = await Shipper.findByIdAndDelete(id);

        if (!deletedShipper) {
            return res.status(404).json({ message: 'Không tìm thấy shipper' });
        }

        res.status(200).json({ message: 'Xóa shipper thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa shipper', error });
    }
};
//Tim fkiếm theo tên shipper
export const GetShippersByName = async (req, res) => {
    try {
      const { name } = req.body;  // Lấy name từ body của request
  
      // Tìm kiếm shipper theo trường "name"
      const shippers = await Shipper.find({
        name: { $regex: new RegExp(name, "i") } // Tìm kiếm theo tên
      });
  
      if (shippers.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy shipper nào" });
      }
  
      return res.status(StatusCodes.OK).json(shippers);
    } catch (error) {
      console.error(error); // Log lỗi để xem chi tiết
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message || "Lỗi server"
      });
    }
  };
  

  
  

