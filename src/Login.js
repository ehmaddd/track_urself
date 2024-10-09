import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const users = useSelector((state) => state.auth.users);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser); // Access loggedInUser from Redux state
  const [loginError, setLoginError] = useState(''); // State for handling login errors

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch login action with username and password
    dispatch({ type: 'LOGIN_USER', payload: { username, password } });
  };

  // Use useEffect to navigate after the Redux state updates
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem('user', loggedInUser);
      navigate(`/dashboard/${loggedInUser}`);
    } else if (users.error) {
      setLoginError(users.error);
      navigate(`/login`);
    }
  }, [loggedInUser, users.error, navigate]);

  return (
    <div className="form-container">
      <h2>Login</h2>
      {loginError && <p className="error">{loginError}</p>} {/* Display error message if any */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
