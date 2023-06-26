const express = require("express");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/message-routes");
require('dotenv').config();
// const cors = require("cors");

const app = express();
app.use(express.json());
app.use(messageRoutes);
// app.use(cors());

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
	
	socket.on('send_message', (msg) => {
		socket.broadcast.emit('recieve_message', msg);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(process.env.PORT, () => {
	console.log(`listening on ${process.env.PORT}`);
});
