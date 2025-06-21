const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);

module.exports = router;
