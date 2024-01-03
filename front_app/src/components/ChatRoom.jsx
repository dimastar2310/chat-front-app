//import React from 'react';
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {socket,sendSocketMessage} from '../network/chat.api';
//import { set } from 'react-hook-form';


//now we talking abouth public chat room
//for now i retriving all the messages 
const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { loginName } = useParams();

  useEffect(() => {



    const fetchMessages = async () => {
      
      try {
        const response = await fetch('http://127.0.0.1:3030/api/public_chat/retrive_message');
        if (response.ok) {
          const data = await response.json();
          console.log(data); //this got logged in browser
          setMessages(data);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchMessages();
    
      socket.on('server-msg', (data) => {
        setMessages([...messages, data]);
      });
      
            
}, []);

// useEffect(() => {
//   socket.on('server-msg', (data) => {
//     setMessages([...messages, data.message]);
//   });
// }, []);

 


  const handleSendMessage = async (e) => {
    e.preventDefault(); //prevent page refresh
    //e.preventDefault(); //prevent page refresh
    
    if (newMessage.trim() !== '') {
      console.log('iam at if new message trim ');
      //const timestamp = new Date().toISOString();
      // const message = { username: loginName, text: newMessage, timestamp:timestamp };
      const message = { username: loginName, text: newMessage};
      await sendSocketMessage(message);//messaging to everyone from external file
      setMessages([...messages, message]); 
      setNewMessage('');
      
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div style={{ height: '300px', width: '700px', border: '1px solid #ccc', padding: '10px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.username}:</strong>
            <strong>{console.log("the message is :",message)}:</strong>
            <span style={{ marginLeft: '10px', color: '#888' }}>
              {/* {new Date(message.timestamp).toLocaleString()} */}
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};


export { ChatRoom };
