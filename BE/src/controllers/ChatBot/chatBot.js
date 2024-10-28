import axios from 'axios';

export const chatBot = async (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    const responses = {
        "hi": "Chào bạn! Shop của chúng tôi rất vui khi được phục vụ bạn. Hôm nay bạn đang cần tìm gì ạ? Quần áo, phụ kiện hay muốn xem qua các mẫu mới nhất của shop?",
        "hello": "Chào bạn! Shop của chúng tôi có thể giúp gì cho bạn hôm nay? Bạn có nhu cầu tìm sản phẩm nào không?",
        "xin chào": "Chào mừng bạn đến với shop! Bạn đang tìm sản phẩm gì? Chúng tôi có rất nhiều mẫu mã mới, sẵn sàng hỗ trợ bạn!",
        "chào": "Chào bạn! Bạn muốn shop tư vấn sản phẩm nào ạ? Mình rất sẵn lòng giúp bạn tìm ra sản phẩm phù hợp!",
        "giá quần áo": "Shop chúng tôi có rất nhiều sản phẩm với đa dạng mức giá để phù hợp với ngân sách của bạn. Bạn muốn tìm sản phẩm trong khoảng giá nào để mình tư vấn chính xác hơn nhé?",
        "quần áo giá rẻ": "Chúng tôi có các sản phẩm bắt đầu từ 150.000 VND. Nếu bạn muốn tìm quần áo giá phải chăng và chất lượng tốt, mình có thể đề xuất một vài mẫu nổi bật không ạ?",
        "quần áo cao cấp": "Dòng sản phẩm cao cấp của shop được thiết kế từ chất liệu cao cấp và thiết kế tinh tế, có giá từ 500.000 VND trở lên. Bạn đang cần sản phẩm nào để mình gợi ý các mẫu phù hợp nhé?",
        "khuyến mãi": "Hiện tại shop có chương trình giảm giá 15% cho tất cả các sản phẩm khi bạn mua từ 2 chiếc trở lên. Bạn có muốn biết thêm về chương trình này hoặc có sản phẩm nào cần tư vấn chi tiết không?",
        "ưu đãi": "Chúng tôi có các chương trình ưu đãi đặc biệt dành cho khách hàng mới và thành viên. Bạn có muốn tham gia hoặc xem qua các sản phẩm đang có ưu đãi không?",
        "giảm giá": "Shop đang có nhiều chương trình giảm giá hấp dẫn cho mùa này! Bạn quan tâm đến loại sản phẩm nào để mình giới thiệu những ưu đãi hiện có nhé?",
        "còn hàng": "Shop có rất nhiều mẫu đang có sẵn. Bạn quan tâm đến sản phẩm nào để mình kiểm tra ngay tình trạng tồn kho cho bạn?",
        "tình trạng hàng": "Chúng tôi luôn cập nhật các mẫu mới và duy trì nhiều sản phẩm phổ biến. Bạn cần tìm mẫu nào, mình sẽ kiểm tra giúp nhé!",
        "chất liệu": "Sản phẩm của chúng tôi được làm từ chất liệu cao cấp như cotton 100%, lụa, và vải lanh. Bạn có yêu cầu cụ thể nào về chất liệu không? Mình sẽ tìm sản phẩm phù hợp cho bạn.",
        "quần áo chất liệu gì": "Các mẫu của shop chủ yếu là cotton 100% và vải lụa thoáng mát, thích hợp cho cả thời tiết nóng và lạnh. Bạn có muốn xem các mẫu cụ thể không?",
        "size": "Shop có đầy đủ size từ S đến XL. Nếu bạn cần chi tiết kích thước từng size hoặc muốn tư vấn chọn size, hãy cho mình biết nhé!",
        "chi tiết size": "Dưới đây là kích thước chi tiết của từng size:\n\n- **Size S**: Vòng ngực 85-88 cm, vòng eo 65-67 cm, vòng mông 90-93 cm.\n- **Size M**: Vòng ngực 89-92 cm, vòng eo 68-71 cm, vòng mông 94-97 cm.\n- **Size L**: Vòng ngực 93-96 cm, vòng eo 72-75 cm, vòng mông 98-101 cm.\n- **Size XL**: Vòng ngực 97-100 cm, vòng eo 76-79 cm, vòng mông 102-105 cm.\n\nBạn cần hỗ trợ chọn size hay muốn tư vấn thêm không ạ?",
        "màu sắc": "Chúng tôi có các màu phổ biến như Đen, Trắng, Xanh và Đỏ. Bạn có muốn xem sản phẩm nào ở màu cụ thể không?",
        "màu sắc quần áo": "Shop có đa dạng màu sắc từ Đen, Trắng, Xanh đến các màu pastel. Nếu bạn cần tư vấn màu sắc phù hợp, cho mình biết nhé!",
        "chính sách đổi trả": "Chính sách đổi trả của chúng tôi cho phép đổi hoặc trả hàng trong vòng 7 ngày nếu sản phẩm còn nguyên tem mác và chưa qua sử dụng. Bạn có thêm câu hỏi gì về chính sách này không?",
        "đổi trả": "Shop hỗ trợ đổi trả trong 7 ngày kể từ khi nhận hàng. Nếu bạn gặp vấn đề gì với sản phẩm, hãy cho mình biết, mình sẽ hỗ trợ ngay nhé!",
        "giao hàng": "Chúng tôi giao hàng toàn quốc với phí giao hàng 30.000 VND và miễn phí giao hàng cho đơn trên 500.000 VND. Bạn muốn mình hỗ trợ đặt hàng và giao hàng đến đâu không?",
        "phí giao hàng": "Shop thu phí giao hàng 30.000 VND cho tất cả các đơn hàng. Với đơn trên 500.000 VND, bạn sẽ được miễn phí giao hàng. Nếu bạn cần tư vấn thêm, hãy cho mình biết nhé!",
        "thanh toán": "Chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng, ví điện tử và thanh toán khi nhận hàng. Bạn muốn chọn hình thức nào cho tiện lợi?",
        "cách thanh toán": "Bạn có thể thanh toán bằng nhiều phương thức khác nhau như chuyển khoản, ví điện tử, hoặc thanh toán khi nhận hàng. Nếu bạn cần trợ giúp thêm, mình rất sẵn lòng hỗ trợ!",
        "mẫu mới": "Shop vừa có thêm nhiều mẫu mới cho mùa thu. Bạn có muốn xem qua các bộ sưu tập mới không? Mình sẽ gửi link hoặc mô tả cho bạn.",
        "sản phẩm mới": "Những mẫu mới về của shop luôn bắt kịp xu hướng thời trang hiện đại. Bạn quan tâm đến loại sản phẩm nào để mình giới thiệu nhé!",
        "bảo quản quần áo": "Để bảo quản tốt, hãy giặt tay với nước lạnh và phơi nơi thoáng mát. Với quần áo màu đậm, bạn nên giặt riêng lần đầu để tránh phai màu. Cần tư vấn thêm về cách bảo quản không?",
        "giặt quần áo": "Shop khuyên bạn nên giặt tay và hạn chế dùng máy giặt. Điều này sẽ giữ cho chất liệu và màu sắc bền lâu hơn. Bạn có muốn biết cách bảo quản chất liệu cụ thể không?",
        "đánh giá khách hàng": "Sản phẩm của chúng tôi được khách hàng đánh giá rất cao về chất lượng và kiểu dáng. Bạn có muốn xem qua một vài đánh giá thực tế từ khách hàng không?",
        "feedback khách hàng": "Các sản phẩm của shop luôn nhận được phản hồi tích cực. Nếu bạn muốn biết thêm về đánh giá của khách hàng trước khi mua, mình có thể gửi một vài nhận xét nổi bật cho bạn nhé!",
        "xu hướng": "Hiện nay, áo phông và váy maxi là xu hướng hot nhất. Bạn có muốn xem qua những mẫu nổi bật trong xu hướng này không?",
        "trend quần áo": "Các sản phẩm như áo sơ mi oversize và quần ống rộng hiện đang rất được yêu thích. Nếu bạn muốn tìm đồ hợp trend, mình sẵn sàng gợi ý vài mẫu nhé!",
        "combo": "Chúng tôi có các gói combo mua 2 tặng 1 cho tất cả sản phẩm thời trang. Bạn muốn tìm hiểu thêm về chương trình này không?",
        "ưu đãi thành viên": "Khách hàng thành viên sẽ được giảm thêm 5% trên tổng hóa đơn. Bạn có muốn đăng ký thành viên để nhận ưu đãi không?",
    };


    try {
        const foundKeyword = Object.keys(responses).find(keyword => userMessage.includes(keyword));
        console.log(foundKeyword);

        if (foundKeyword) {
            res.status(200).json({ reply: responses[foundKeyword] });
        } else if (userMessage.includes('sản phẩm')) {
            const apiResponse = await axios.get('http://localhost:2004/api/v1/products', {
                params: {
                    limit: 5,
                    sort: '-createdAt'
                }
            });
            const products = apiResponse.data.data.docs;
            console.log(products);

            const productList = products.map(product => ({
                name_product: product.name_product,
                image_product: product.image_product,
            }));

            const replyMessage = `
                <p>Chúng tôi có các sản phẩm mới nhất:</p>
                ${productList.map(p => `
                    <div style="margin-bottom: 10px;">
                            <div>- ${p.name_product}</div>
                            <img src="${p.image_product}" alt="${p.name_product}" style="width:100px; height:auto;"/>
                    </div>
                `).join('')}
            `;

            res.status(200).json({ reply: replyMessage });
        } else {
            res.status(200).json({ reply: 'Cảm ơn bạn đã quan tâm! Shop có thể giúp gì thêm cho bạn không?' });
        }
    } catch (error) {
        res.status(500).json({ reply: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.' });
    }
};
