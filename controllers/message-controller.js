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
	const date = new Date();
	console.log('date', date);
	console.log('dateType', typeof date);
	Message
		.create(
			{
				user,
				message,
				date: new ISODate(date),
			}
		)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => handleError(res, err));
}

const deleteAllMessages = (req, res) => {
	const { secret } = req.body;
	console.log(secret);
	if (secret === process.env.SECRET) {
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
