import io from 'socket.io-client';

const serverURL = 'http://localhost:5000'
export const socket = io.connect(serverURL)