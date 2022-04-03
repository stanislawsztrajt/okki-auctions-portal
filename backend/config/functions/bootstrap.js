'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
var io = require('socket.io')(strapi.server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

  io.on('connection', function(socket) {
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
  });
};
