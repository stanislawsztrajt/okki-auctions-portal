import Cookies from 'js-cookie';
import API_URL from '../../API_URL'
import axios from 'axios'
import { socket } from '../../config/web-sockets.js';
import vulgarWords from '../jsons files/vulgarWords.json'

export const jwt = Cookies.get('jwt') ? Cookies.get('jwt') : false;
export const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : false;
export const authorization = { headers: { Authorization: `Bearer ${jwt}` } };
export const userAcceptedCookie = Cookies.get('user-accepted-cookies') ? Cookies.get('user-accepted-cookies') : false;
// 2592000000 = 1 month
export const additionalTimeToDelete = 2592000000;
export const auctionsAtPage = 10

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
  const secondUserMessages = conversation.messages.filter(message => message.sender_id !== user.id);

  if(secondUserMessages.length > 0 && secondUserMessages.length !== undefined) {
    const secondUserLastSendMessageObj = secondUserMessages[secondUserMessages.length-1]
    if(secondUserLastSendMessageObj.id !== lastSeenMessageObj.lastSeenMessage_id) {
      if(window.location.pathname.includes(secondUserLastSendMessageObj.sender_id)) {
        updateLastSeenMessage(secondUserLastSendMessageObj.id, conversation.code)
      } else {
        displayNotifications()
        if(!notReadConversations.includes(conversation.code)) notReadConversations.push(conversation.code)
      }
    }
  }
}

export const updateLastSeenMessage = (secondUserLastSendMessage_id, conversationCode) => {
  axios.put(`${API_URL}/last-seen-messages/${lastSeenMessageObj.id}`, { lastSeenMessage_id: secondUserLastSendMessage_id }, authorization)
  .catch(err => err)
  const readConversationCode = notReadConversations.findIndex(code => code === conversationCode)
  notReadConversations.splice(readConversationCode, 1)
  if(notReadConversations.length === 0) hideNotifications()
}

export const displayNotifications = async () => {
  socket.emit('displayNotifications')
}

const hideNotifications = async () => {
  socket.emit('hideNotifications')
}

export function findVulgarWord(array){
  for(let i = 0; i < vulgarWords.length; i++) {
    for(let j = 0; j < array.length; j++) {
      if(array[j].toLowerCase().includes(vulgarWords[i].toLowerCase())) {
        return true;
      }
    }
  }
  return false;
}