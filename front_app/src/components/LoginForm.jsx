import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const API = 'http://127.0.0.1:3030/api/users/login';

  const handleLogin = async (data) => {
    if (data.username && data.password) {
      try {
        const response = await fetch(API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: data.username,
            password: data.password,
          }),
        });

        if (response.ok) {
          navigate(`/chat_room/${data.username}`);
        } else {
          setLoginError('User does not exist.'); // Set error message for login failure
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Username"
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 2, message: 'Username is too short' },
          })}
        />
        {errors.username && <span>{errors.username.message}</span>}
        
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={togglePasswordVisibility}
        />
        <label htmlFor="showPassword">Show Password</label>

        <button type="submit">Login</button>
        <Link to="/register">Register</Link> 

        {loginError && <span>{loginError}</span>} {/* Display login error message */}
      </form>
    </div>
  );
};

export default LoginForm;
