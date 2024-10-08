import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, loginUser, logoutUser } from './actions';
import './index.css';

function Login() {
  const users = useSelector((state) => state.users);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Dispatch action to register the user
    dispatch(registerUser(username, password));
    alert('Registration successful!');

    // Clear form fields and reset error
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Dispatch action to log in the user
    dispatch(loginUser(username, password));

    if (!users.find((user) => user.username === username)) {
      setLoginError('Invalid username or password');
    } else {
      setLoginError('');
    }
  };

  return (
    <div className="form-container">
      {loggedInUser ? (
        <div>
          <h2>Welcome, {loggedInUser}!</h2>
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
      ) : (
        <>
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleRegister}>
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
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>

          <h2>Login</h2>
          {loginError && <p className="error">{loginError}</p>}
          <form onSubmit={handleLogin}>
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
        </>
      )}

      <h3>Registered Users:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
