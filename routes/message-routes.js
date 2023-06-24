const express = require('express');
const cors = require("cors");

const {
	getMessages,
	sendMessage,
} = require('../controllers/message-controller');

const router = express.Router();
router.use(cors());

router.get('/list', getMessages);
router.post('/send', sendMessage);
router.delete('/delete', deleteAllMessages);

module.exports = router;
