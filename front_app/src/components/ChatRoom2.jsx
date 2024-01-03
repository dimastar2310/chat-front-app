import { useForm } from 'react-hook-form';
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {socket,sendSocketMessage} from '../network/chat.api';



const ChatRoom2 = () => {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { loginName } = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3030/api/public_chat/retrive_message');
        if (response.ok) {
          const data = await response.json();
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
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  const onSubmit = async (data) => {
    data.preventDefault(); //prevent page refresh

    if (data.newMessage.trim() !== '') {
      const message = { username: loginName, text: data.newMessage };
      await sendSocketMessage(message);
      setMessages((prevMessages) => [...prevMessages, message]);
      reset();
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div style={{ height: '300px', width: '700px', border: '1px solid #ccc', padding: '10px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.username}:</strong> {message.text}
            <span style={{ marginLeft: '10px', color: '#888' }}>
              {/* Display the timestamp if available */}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Type your message..."
          {...register('newMessage')}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export { ChatRoom2 };
