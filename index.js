const express = require("express");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/message-routes");
const Message = require('../models/message');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(messageRoutes);

mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => console.log('Connected to MongoDB'))
	.catch((err) => console.log(`DB connection error: ${err}`)); 

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	}
});

io.on('connection', (socket) => {
	console.log(`a user connected: ${socket.id}`);
	console.log(`${socket}`);
	
	Message
	.find()
	.then((data) => {
		io.emit('get_all_messages', messages);
	})
	.catch((err) => handleError(res, err));
	
	socket.on('send_message', (msg) => {
		io.emit('recieve_message', msg);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on ${process.env.PORT}`);
});
