const Router = require('express');

const router = new Router();
const {
  authenticateToken,
} = require('../Middleware/authenticateToken.middleware');
const { refreshToken } = require('../Middleware/refreshToken.middleware');
const {
  createUser,
  authUser,
  createDoctor,
  allDoctors,
  deleteRfrTokenInUser,
} = require('../Controllers/medicine.controller');
const {
  allOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../Controllers/orders.controller');

router.post('/createUser', createUser);
router.post('/authUser', authUser);
router.post('/createDoctor', createDoctor);
router.get('/allDoctors', allDoctors);
router.get('/refreshToken', refreshToken);
router.delete('/deleteRfrToken', authenticateToken, deleteRfrTokenInUser);
router.get('/allOrders', authenticateToken, allOrders);
router.post('/createOrder', authenticateToken, createOrder);
router.patch('/updateOrder', authenticateToken, updateOrder);
router.delete('/deleteOrder', authenticateToken, deleteOrder);

module.exports = router;
