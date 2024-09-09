import mongoose from "mongoose";

// Điều kiện đầu số hợp lệ cho số điện thoại Việt Nam
const phoneRegex = /^(03|05|07|08|09)\d{8}$/;

// Hàm validate số điện thoại
const validatePhoneNumber = (phone) => {
    return phoneRegex.test(phone); // Kiểm tra số điện thoại theo định dạng Việt Nam
};

const ShipperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    vehicle: { type: String, required: true },
    phone: { 
        type: String, 
        required: true, 
        validate: {
            validator: validatePhoneNumber, // Sử dụng hàm validate riêng
            message: (props) => `${props.value} không phải là số điện thoại hợp lệ` // Thông báo lỗi
        }
    },
    store: { type: String, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['On delivery', 'Available', 'Offline'], 
        default: 'Available' 
    },
    rating: { 
        type: Number, 
        default: 0, 
        min: [0, 'Giá trị tối thiểu là 0'], 
        max: [5, 'Giá trị tối đa là 5'], 
    },
});


export default mongoose.model('Shippers', ShipperSchema);



