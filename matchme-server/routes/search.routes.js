const express = require('express');
const { searchUsers } = require('../controllers/search.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', auth, searchUsers);

module.exports = router;
