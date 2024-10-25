import {orderService } from '../services/order.service.js';

// Tạo order mới
const createOrder = async (req, res) => {
  try {
    const userId = req.user && req.user.userId; // Kiểm tra chắc chắn req.user tồn tại
    if (!userId) {
      return res.status(401).json({ message: 'Người dùng không hợp lệ hoặc chưa đăng nhập' });
    }
    const orderItems = req.body.items; // Dữ liệu từ client
    const orderId = await orderService.createOrder(userId, orderItems);
    return res.status(201).json({ orderId });
  } catch (error) {
    console.error('Lỗi khi tạo order:', error);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const userId = req.user && req.user.userId; // Kiểm tra chắc chắn req.user tồn tại
    if (!userId) {
      return res.status(401).json({ message: 'Người dùng không hợp lệ hoặc chưa đăng nhập' });
    }
    const orders = await orderService.getUserOrders(userId);
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách orders:', error);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};


// Xóa order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const success = await orderService.deleteOrder(orderId);
    if (success) {
      // Trả về thông báo thành công
      return res.status(200).json({ message: 'Xóa order thành công' });
    } else {
      return res.status(404).json({ message: 'Order không tồn tại' });
    }
  } catch (error) {
    console.error('Lỗi khi xóa order:', error);
    return res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};


export const orderController = { 
    createOrder, 
    getUserOrders, 
    deleteOrder 
};
