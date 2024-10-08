import React, { useState, useEffect } from 'react';

function Register() {
  // Pre-filled users to mimic database records
  const prefilledUsers = [
    { username: 'john_doe', password: 'password123' },
    { username: 'jane_smith', password: 'password456' },
  ];

  // State to hold users (starting with pre-filled users)
  const [users, setUsers] = useState(prefilledUsers);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Reset users to the pre-filled data on refresh (mimic clearing the data)
  useEffect(() => {
    setUsers(prefilledUsers); // Only pre-filled data will persist on refresh
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Add the new user to the local state
    const newUser = { username, password };
    setUsers([...users, newUser]);

    alert('Registration successful!');
    // Clear the form fields and reset error
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}

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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      <h3>Registered Users:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Register;
