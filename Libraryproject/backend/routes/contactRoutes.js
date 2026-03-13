const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contactController');

// POST route /api/contact
router.post('/', sendContactMessage);

module.exports = router;
