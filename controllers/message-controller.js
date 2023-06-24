const Message = require('../models/message');


const handleError = (res, error) => {
	res.status(500).json({ error });
}

const getMessages = (req, res) => {
	Message
		.find()
		.then((data) => {
			res.send({ status: "ok", data: data });
		})
		.catch((err) => handleError(res, err));
}

const sendMessage = (req, res) => {
	console.log('ee', req.body)
	const { user, message } = req.body;
	Message
		.create(
			req.body
		)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => handleError(res, err));
}

const deleteAllMessages = (req, res) => {
	const { secret } = req.body;
	if (secret = env.process.SECRET) {
	Message
		.deleteMany()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => handleError(res, err));
	}
}

module.exports = {
	getMessages,
	sendMessage,
	deleteAllMessages,
};
