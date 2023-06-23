const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const messageRoutes = require("./routes/message-routes");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(messageRoutes);

mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => console.log('Connected to MongoDB'))
	.catch((err) => console.log(`DB connection error: ${err}`));

app.listen(process.env.PORT, (err) => {
	err ? console.log(err) : console.log(`listening port ${process.env.PORT}`);
});

const chat = express();
const http = require('http');
const server = http.createServer(chat);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: ["https://resmart1.github.io/chatmore","http://localhost:3000"], 
		methods: ["GET", "POST"],
	}
});

io.on('connection', (socket) => {
	console.log(`a user connected: ${socket.id}`);

	socket.on('send_message', (msg) => {
		socket.broadcast.emit('recieve_message', msg);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(8080, () => {
	console.log('listening on *:8080');
});
