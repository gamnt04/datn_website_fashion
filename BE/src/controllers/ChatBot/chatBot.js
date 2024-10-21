export const chatBot = async (req, res) => {
    const userMessage = req.body.message;

    // Logic để trả lời người dùng, có thể sử dụng NLP hoặc đơn giản là các câu trả lời có sẵn
    let botReply;
    if (userMessage.includes('hello')) {
        botReply = 'Hi! How can I help you today?';
    } else if (userMessage.includes('bye')) {
        botReply = 'Goodbye! Have a great day!';
    } else {
        botReply = "Sorry, I didn't understand that.";
    }

    // Trả lời lại người dùng
    res.json({ reply: botReply });
}