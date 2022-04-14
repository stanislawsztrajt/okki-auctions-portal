import Cookies from 'js-cookie';
import API_URL from '../../API_URL'
import axios from 'axios'
import { socket } from '../../config/web-sockets.js';

export const jwt = Cookies.get('jwt') ? Cookies.get('jwt') : false;
export const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : false;
export const authorization = { headers: { Authorization: `Bearer ${jwt}` } };
export const userAcceptedCookie = Cookies.get('user-accepted-cookies') ? Cookies.get('user-accepted-cookies') : false;
// 2592000000 = 1 month
export const additionalTimeToDelete = 2592000000;

// Functions

let lastSeenMessageObj = {}
export const notReadConversations = []

export const fetchLastSeenMessages = async (conversation) => {
  await axios.get(`${API_URL}/last-seen-messages`, {
    headers: {
      conversation_id: conversation.id,
      Authorization: `Bearer ${jwt}`
    }
  })
  .then(res => {
    lastSeenMessageObj = res.data[0]
    compareLastSeenMessageWithLatest(conversation, lastSeenMessageObj)
  })
  .catch(err => console.log(err))
}

export const compareLastSeenMessageWithLatest = (conversation, lastSeenMessageObj) => {
  const secondUserMessages = conversation.messages.filter(message => message.sender_id !== user.id && !message.isIdMessage);

  if(secondUserMessages.length > 0 && secondUserMessages.length !== undefined) {
    const secondUserLastSendMessageObj = secondUserMessages[secondUserMessages.length-1]
    if(secondUserLastSendMessageObj.id !== lastSeenMessageObj.lastSeenMessage_id || notReadConversations.length > 0) {
      if(window.location.pathname.includes(secondUserLastSendMessageObj.sender_id)) {
        updateLastSeenMessage(secondUserLastSendMessageObj.id)
        const readConversationId = notReadConversations.findIndex(el => el === conversation.code)
        notReadConversations.splice(readConversationId, 1)
        if(notReadConversations.length === 0) hideNotifications()
      } else {
        displayNotifications()
        if(!notReadConversations.includes(conversation.code)) notReadConversations.push(conversation.code)
      }
    }
  }
}

const updateLastSeenMessage = async (secondUserLastSendMessage_id) => {
  await axios.put(`${API_URL}/last-seen-messages/${lastSeenMessageObj.id}`, { lastSeenMessage_id: secondUserLastSendMessage_id }, authorization)
  .catch(err => err)
}

export const displayNotifications = async () => {
  socket.emit('displayNotifications')
}

const hideNotifications = async () => {
  socket.emit('hideNotifications')
}