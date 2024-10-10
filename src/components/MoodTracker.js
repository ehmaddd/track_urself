import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector} from 'react-redux';
import DashNav from '../components/DashNav';
import MoodNav from '../components/MoodNav';
import MoodGrid from '../components/MoodGrid';
import valenceImg from '../images/valence_measure.png';
import './Nav.css';

function MoodTracker() {
  const user = localStorage.getItem('user');
  const loggedInUser = useSelector((state) => state.auth.loggedInUser) || null;
  const navigate = useNavigate();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    if (!loggedInUser) {
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
  });

  return (
        <>
          <DashNav />
          <div className="nav-bar">
            <h1 className="nav-title">Mood Tracker</h1>
            <MoodNav id={loggedInUser} />
          </div>
          <MoodGrid />
          <img src={valenceImg} class="valence-img"></img>
          <Outlet />
          <p>Your Mood Track User ID: {loggedInUser}</p>
        </>
      )
}

export default MoodTracker;
