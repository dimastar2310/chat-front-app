import { io } from 'socket.io-client';

const {VITE_SERVER_URL} = import.meta.env;

console.log(`server_URL:VITE_SERVER_URL`);
console.log(`MODE: ${import.meta.env.MODE}`);


//connects to current domain/port/protocol
export const socket = io(VITE_SERVER_URL,{}); // Replace with your server URL
socket.on('connect', () => {
    console.log("socket connected:",socket.id);
});


export async function sendSocketMessage(msg) {
    console.log("sendSocketMessage:",msg);
    socket.emit('client-msg', {message:msg});
}



// Function to connect to the socket
// const connectSocket = () => {
//   if (!socket.connected) {
//     socket.connect();
//   }
// };

// // Function to disconnect from the socket
// const disconnectSocket = () => {
//   if (socket.connected) {
//     socket.disconnect();
//   }
// };

// // Function to send a message
// const sendMessage = (message) => {
//   socket.emit('chatMessage', message);
// };

// // Function to listen for incoming messages
// const subscribeToChat = (callback) => {
//   socket.on('message', (message) => {
//     callback(message);
//   });
// };

// export { connectSocket, disconnectSocket, sendMessage, subscribeToChat };
