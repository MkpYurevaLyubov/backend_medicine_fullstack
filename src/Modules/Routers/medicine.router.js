const Router = require('express');
const router = new Router();

const { createUser, authUser } = require('../Controllers/medicine.controller');

router.post('/createUser', createUser);
router.post('/authUser', authUser);

module.exports = router;