import io from 'socket.io-client';

// const serverURL = 'http://localhost:5000'
const serverURL = 'https://okki-videochat.herokuapp.com'
export const socket = io.connect(serverURL)