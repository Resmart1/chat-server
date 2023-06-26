const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.set('strictQuery', true);

const messageSchema = new Schema({
	user: String,
	message: String,
	date: Date,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
