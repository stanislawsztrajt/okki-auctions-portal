const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:8080",
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

  socket.on('join', ({ rooms, user_id }) => {
    socket.strapi_id = user_id

    rooms.forEach(room => {
      if(!socket.rooms.hasOwnProperty(room)) socket.join(room)
    })

    socket.on('joinToNewRoom', ({ room }) => {
      socket.join(room)
    })

    socket.on('sendMessage', ({ message, room }) => {
      // emit to second user in room
      socket.broadcast.to(room).emit('message', { message, room })
      // emit to myself
      socket.emit('message', { message, room })
    })

    socket.on('newConversation', async ({ seconUser_id, conversation }) => {
      let sockets = await io.fetchSockets();
      sockets = sockets.filter(socket => socket.strapi_id === seconUser_id)
      // emit to second user in room
      io.to(sockets[0].id).emit('newConversaion', { conversation })
      // emit to myself
      socket.emit('createdNewConversaion', { conversation })
    })

    socket.on('displayNotifications', () => {
      socket.emit('displayNotifications')
    })

    socket.on('hideNotifications', () => {
      socket.emit('hideNotifications')
    })
  })
})

server.listen(5000, () => console.log("server is running on port 5000"))