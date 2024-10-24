
export const chatBot = async (req, res) => {
    const userMessage = req.body.message;

    try {
        if (userMessage.includes(('hi') || ('hello') || ('xin chào') || ('chào'))) {
            res.status(200).json({ reply: 'Chào bạn! Shop của chúng tôi có thể giúp gì cho bạn hôm nay?' });
        } else if (userMessage.includes('giá quần áo')) {
            res.status(200).json({ reply: 'Shop chúng tôi có nhiều mức giá khác nhau. Bạn muốn tìm sản phẩm trong khoảng giá nào để mình tư vấn?' });
        } else if (userMessage.includes('khuyến mãi')) {
            res.status(200).json({ reply: 'Hiện tại chúng tôi có chương trình giảm giá 15% cho tất cả các sản phẩm khi mua từ 2 chiếc trở lên. Bạn có muốn biết thêm chi tiết không?' });
        } else if (userMessage.includes('còn hàng')) {
            res.status(200).json({ reply: 'Chúng tôi hiện còn rất nhiều mẫu mới. Bạn đang quan tâm đến loại sản phẩm nào để mình kiểm tra giúp?' });
        } else if (userMessage.includes('chất liệu')) {
            res.status(200).json({ reply: 'Sản phẩm của chúng tôi được làm từ các loại chất liệu cao cấp như cotton 100%, lụa và vải lanh. Bạn có yêu cầu cụ thể về chất liệu không?' });
        } else if (userMessage.includes('size')) {
            res.status(200).json({ reply: 'Shop có đầy đủ các size từ S đến XL. Bạn có muốn biết thêm về kích thước cụ thể không?' });
        } else if (userMessage.includes('màu sắc')) {
            res.status(200).json({ reply: 'Chúng tôi có sẵn các màu: Đen, Trắng, Xanh và Đỏ. Bạn muốn chọn màu nào cho sản phẩm?' });
        } else if (userMessage.includes('chính sách đổi trả')) {
            res.status(200).json({ reply: 'Chính sách của chúng tôi cho phép đổi trả trong vòng 7 ngày nếu sản phẩm chưa qua sử dụng và còn nguyên tem mác. Bạn có thắc mắc gì thêm về việc đổi trả không?' });
        } else if (userMessage.includes('giao hàng')) {
            res.status(200).json({ reply: 'Chúng tôi hỗ trợ giao hàng toàn quốc với phí giao hàng là 30.000 VND. Miễn phí giao hàng cho đơn hàng trên 500.000 VND.' });
        } else if (userMessage.includes('thanh toán')) {
            res.status(200).json({ reply: 'Shop chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng, ví điện tử, và thanh toán khi nhận hàng. Bạn muốn chọn hình thức nào?' });
        } else if (userMessage.includes('mẫu mới')) {
            res.status(200).json({ reply: 'Shop vừa có các mẫu mới về cho mùa thu năm nay. Bạn có muốn xem qua các bộ sưu tập mới không?' });
        } else if (userMessage.includes('bảo quản quần áo')) {
            res.status(200).json({ reply: 'Để bảo quản sản phẩm tốt, chúng tôi khuyên bạn nên giặt tay với nước lạnh và phơi nơi thoáng mát. Bạn cần thêm thông tin về việc bảo quản không?' });
        } else if (userMessage.includes('đánh giá khách hàng')) {
            res.status(200).json({ reply: 'Sản phẩm của chúng tôi nhận được rất nhiều đánh giá tích cực. Bạn có muốn xem đánh giá chi tiết của khách hàng khác không?' });
        } else if (userMessage.includes('xu hướng')) {
            res.status(200).json({ reply: 'Các mẫu áo phông và váy maxi hiện đang là xu hướng hot nhất năm nay. Bạn có quan tâm đến sản phẩm nào trong xu hướng này không?' });
        } else if (userMessage.includes('combo')) {
            res.status(200).json({ reply: 'Chúng tôi có các gói combo mua 2 tặng 1 cho tất cả sản phẩm thời trang. Bạn muốn tìm hiểu thêm về chương trình này không?' });
        } else if (userMessage.includes('ưu đãi thành viên')) {
            res.status(200).json({ reply: 'Khách hàng thành viên sẽ được giảm thêm 5% trên tổng hóa đơn. Bạn có muốn đăng ký thành viên ngay bây giờ không?' });
        } else {
            res.status(200).json({ reply: 'Cảm ơn bạn đã quan tâm! Shop có thể giúp gì thêm cho bạn không?' });
        }
    } catch (error) {
        res.status(500).json({ reply: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.' });
    }

};
