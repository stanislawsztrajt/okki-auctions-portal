const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)

const getUserSocket = async user_id =>{
  const sockets = await io.fetchSockets();
  const socketIndex = await sockets.findIndex(socket => socket.VideoChat_id === user_id);
  return sockets[socketIndex]?.id;
}

const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:8080",
		// origin: "https://okki.herokuapp.com",
    allowedHeadears: '*',
    credentials: true,
		methods: [ "GET", "POST" ]
	}
})

io.on("connection", (socket) => {
	socket.on("setVideoChatId", user_id =>{
    socket.VideoChat_id = user_id
  })

	socket.on("disconnect", async () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", async (data) => {
    const from_id = await getUserSocket(data.from);
    const userToCallId = await getUserSocket(data.userToCall);

    io.to(userToCallId).emit("callUser", { signal: data.signalData, from: from_id, userIdFrom: data.from })
	})

	socket.on("answerCall", async (data) => {
    const userToCallId = await getUserSocket(data.to);

		io.to(userToCallId).emit("callAccepted", data.signal)
	})

  socket.on('endCall', async (data) => {
    const userToCallId = await getUserSocket(data.userToCall);

		io.to(userToCallId).emit('endCall', data.ended)
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
      io.to(sockets[0].id).emit('newConversation', { conversation })
      // emit to myself
      socket.emit('createdNewConversation', { conversation })
    })

    socket.on('displayNotifications', () => {
      socket.emit('displayNotifications')
    })

    socket.on('hideNotifications', () => {
      socket.emit('hideNotifications')
    })
  })
})

const port = process.env.PORT || 5000

server.listen(port, () => console.log("server is running on port 5000"))