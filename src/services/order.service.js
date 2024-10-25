import { pool } from '../configs/database.js';


  // Tạo order mới
  const createOrder = async (userId, orderItems)=> {
    try {
      const connection = await pool.getConnection();
      await connection.beginTransaction();

      // Tạo order
      const [orderResult] = await connection.query('INSERT INTO orders (user_id) VALUES (?)', [userId]);
      const orderId = orderResult.insertId;
      console.log(orderResult);
      // Thêm các sản phẩm vào order
      for (const item of orderItems) {
        await connection.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.productId, item.quantity, item.price]
        );
        console.log(item);
      }

      await connection.commit();
      return orderId;
    } catch (error) {
      console.error('Lỗi khi tạo order:', error);
      throw error;
    }
  }

  // Lấy danh sách orders của user
  const getUserOrders = async (userId) => {
    try {
      const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
      console.log('Orders:', orders); // In kết quả ra để kiểm tra
      if (orders.length === 0) {
        return []; // Không có orders nào
      }
  
      const ordersWithItems = [];
      for (const order of orders) {
        const [items] = await pool.query(
          'SELECT product_id, quantity, price FROM order_items WHERE order_id = ?',
          [order.id]
        );
        console.log('Items cho order', order.id, ':', items); // In kết quả items
        ordersWithItems.push({ ...order, items });
      }
  
      return ordersWithItems;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách orders:', error);
      throw error;
    }
  };
  
  

  // Xóa order
  const deleteOrder = async (orderId)=>{
    try {
      const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [orderId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Lỗi khi xóa order:', error);
      throw error;
    }
  }


export const orderService = { createOrder, getUserOrders, deleteOrder };
