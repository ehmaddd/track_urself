import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

const DashNav = () => {
  const users = useSelector((state) => state.auth.users);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  return (
    <nav className="navbar">
      <ul className="nav-ul">
        <li>
          <Link to={`/dashboard/${loggedInUser}`}>Dashboard</Link>
        </li>
        <li>
          <Link to={`/dashboard/${loggedInUser}/mood_tracker`}>Mood</Link>
        </li>
        <li>
          <Link to={`/dashboard/${loggedInUser}/fitness_tracker`}>Fitness</Link>
        </li>
        <li>
          <Link to={`/dashboard/${loggedInUser}/todo`}>ToDoList</Link>
        </li>
        <li>
          <Link to={`/dashboard/${loggedInUser}/budget`}>Budget</Link>
        </li>
        <li>
        <Link to={`/dashboard/${loggedInUser}/events`}>Events</Link>
        </li>
        <li>
          <Link to="/signout" class="signout-button">Sign Out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashNav;
