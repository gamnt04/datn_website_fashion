import { Router } from "express";
const router = Router();
import { createPaymentUrl, returnUrll } from "../controllers/OnlineCheckoutController/OnlineCheckoutController";
import { updateOrderStatus } from "../controllers/Orders/orders";

// router.get('/orderlist', renderOrderList);
// router.get('/create_payment_url', renderCreatePayment);
// router.get('/querydr', renderQueryDR);
// router.get('/refund', renderRefund);

// router.post('/vnpay', createPaymentUrl);
router.post("/create_payment_url", createPaymentUrl);
router.get("/vnpay_return", returnUrll);
router.put("/orders/:id",   updateOrderStatus);
router.get('/payment/result', async (req, res) => {
    const { vnp_ResponseCode, vnp_TransactionNo } = req.query;
  
    if (vnp_ResponseCode === '00') {
      
      res.json({ message: 'Thanh toán thành công' });
    } else {
      // Thanh toán thất bại
      res.json({ message: 'Thanh toán thất bại' });
    }
  });
export default router;
