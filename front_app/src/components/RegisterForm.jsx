import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API = 'http://127.0.0.1:3030/api/users/register';

  const handleRegister = async (data) => {
    if (data.username && data.password && data.email) {
      try {
        const response = await fetch(API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
            email: data.email,
          }),
        });

        if (response.ok) {
          navigate(`/chat_room/${data.username}`);
        } else {
          console.error('Registration failed');
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
    <div >
      <h2>Register</h2>
      <form onSubmit={handleSubmit(handleRegister)} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Username"
          {...register('username', { required: true })}
        />
       
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', { required: true })}
          />
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          <label htmlFor="showPassword">Show Password</label>
       
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Write password again"
          {...register('confirmPassword', { required: true })}
        />
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
