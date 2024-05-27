const express = require('express');
const authController = require('../controllers/authController');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users', auth, authController.getAllUsers);

module.exports = router;
