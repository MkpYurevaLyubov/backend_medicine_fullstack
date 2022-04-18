const Router = require('express');
const router = new Router();

const { createUser } = require('../Controllers/medicine.controller');

router.post('/createUser', createUser);

module.exports = router;