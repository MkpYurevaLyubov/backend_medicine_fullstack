const Router = require('express');
const router = new Router();
const { authenticateToken } = require('../Middleware/authenticateToken.middleware');

const { createUser, authUser, allOrders, allDoctors } = require('../Controllers/medicine.controller');

router.post('/createUser', createUser);
router.post('/authUser', authUser);
router.get('/allOrders', authenticateToken, allOrders);
router.get('/allDoctors', authenticateToken, allDoctors);

module.exports = router;