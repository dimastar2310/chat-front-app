import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import {ChatRoom3} from './components/ChatRoom3';
import RegisterForm from './components/RegisterForm';

const App = () => {
  return (
    <Router>
      <div style={{display:'flex',flexDirection:'column',alignItems: 'flex-end' }}>
        <h1>DimasChat</h1>
        <Routes>
          {/* Default route set to '/login' */}
          <Route path="/" element={<LoginForm />} />
          {/* <Route path="/login" element={<LoginForm />} /> */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/chat_room/:loginName" element={<ChatRoom3/>} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
