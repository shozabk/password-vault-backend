const express = require('express');
const credentialController = require('../controllers/credentialsController');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/credentials', auth, credentialController.createCredential);
router.get('/credentials/', auth, credentialController.getCredentials);

module.exports = router;
