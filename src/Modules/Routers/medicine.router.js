const Router = require('express');
const router = new Router();
const { authenticateToken } = require('../Middleware/authenticateToken.middleware');

const {
  createUser,
  authUser,
  allDoctors
} = require('../Controllers/medicine.controller');

const {
  allOrders,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../Controllers/orders.controller');

router.post('/createUser', createUser);
router.post('/authUser', authUser);
router.get('/allOrders', authenticateToken, allOrders);
router.get('/allDoctors', allDoctors);
router.post('/createOrder', authenticateToken, createOrder);
router.patch('/updateOrder', authenticateToken, updateOrder);
router.delete('/deleteOrder', authenticateToken, deleteOrder);

module.exports = router;