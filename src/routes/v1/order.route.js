import express from 'express';
import { orderController } from '../../controllers/order.controller.js';
import authenticateJWT from '../../middlewares/authenticateJWT.js';

const router = express.Router();

// Tạo order mới
router.route('/create').post(authenticateJWT, orderController.createOrder);

// Lấy danh sách
router.route('/user-orders').get(authenticateJWT, orderController.getUserOrders);

// Xóa 
router.route('/:orderId').delete(authenticateJWT, orderController.deleteOrder);

export const orderRouter = router;
