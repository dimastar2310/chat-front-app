import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { socket, sendSocketMessage } from '../network/chat.api';
import { useForm } from 'react-hook-form';
const ChatRoom3 = () => {
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]);
  const { loginName } = useParams();

  const fetchMessagesFromServer = async () => {
    console.log("i am at fetch messages");
    try {
      const response = await fetch('http://127.0.0.1:3030/api/public_chat/retrive_message'); // Replace with your endpoint
      if (response.ok) {
        const data = await response.json();
        setMessages(data); // Assuming your response contains a 'messages' array
      } else {
        console.error('Failed to fetch messages.');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => { //this fired before render
    console.log("i am at use effect");
    socket.on('server-msg', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg.message]);
    });

    fetchMessagesFromServer(); // Fetch messages when component mounts

    // return () => {
    //   // Clean-up function if needed
    //   socket.off('server-msg'); // Remove the 'server-msg' event listener
    // };
  }, []); // Empty dependency array to execute only on initial mount

  const onSubmit = async (data) => {
    if (data.newMessage.trim() !== '') {
      const message = { username: loginName, text: data.newMessage };
      await sendSocketMessage(message);
      reset();
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      {/* Display fetched messages */}
      <div style={{ height: '300px', width: '700px', border: '1px solid #ccc', padding: '10px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.username}:</strong> {message.text}
          </div>
        ))}
      </div>
      {/* Form for sending messages */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Type your message..."
          {...register('newMessage')}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export { ChatRoom3 };
