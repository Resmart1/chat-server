const Message = require('../models/message');

const handleError = (res, error) => {
	res.status(500).json({ error });
}

const getMessages = (req, res) => {
	console.log('Запрос всех сообщений');
	
	Message
		.find()
		.then((data) => {
			res.send({ status: "ok", data: data });
		})
		.catch((err) => handleError(res, err));
}

const sendMessage = (req, res) => {
	const { user, message } = req.body;
	console.log(`${user} отправил сообщение: ${message}`);
	
	if (user.trim() !== '' && message.trim() !== '') {
	Message
		.create({
			user,
			message,
			date: new Date()		
		})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => handleError(res, err));
	}
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
