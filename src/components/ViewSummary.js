import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashNav from '../components/DashNav';
import MoodNav from './MoodNav';
import MoodChart from './MoodChart';
import './ViewSummary.css';

function ViewSummary() {
  const storedUserId = localStorage.getItem('user');
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const moods = useSelector((state) => state.mood.moods[loggedInUser]);
  const navigate = useNavigate();
  const [moodLogs, setMoodLogs] = useState([]);

  useEffect(() => {
    if (!loggedInUser) {
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
    setMoodLogs(moods);
    }, []);

  return (
    <>
      <DashNav />
        <>
          <div className="nav-bar">
            <h1 className="nav-title">View Summary</h1>
            <MoodNav id={loggedInUser} />
          </div>
          <Outlet />
          <MoodChart data={moodLogs} />
        </>
    </>
  );
}

export default ViewSummary;
