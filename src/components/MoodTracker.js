import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom';
import { useSelector} from 'react-redux';
import DashNav from '../components/DashNav';
import MoodNav from '../components/MoodNav';
import MoodGrid from '../components/MoodGrid';
import valenceImg from '../images/valence_measure.png';
import './Nav.css';

function MoodTracker() {
  const user = localStorage.getItem('user');
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const navigate = useNavigate();
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [moodData, setMoodData] = useState([]);

  // const fetchMoodData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/fetch_mood_data?userId=${userId}&year=${year}`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch mood data');
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error fetching mood data:', error);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    if (!loggedInUser) {
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
  });

    // const loadData = async () => {
    //   try {
    //     const data = await fetchMoodData();
    //     setMoodData(data);
    //   } catch (error) {
    //     console.error('Error loading mood data:', error);
    //   }
    // };

  return (
        <>
          <DashNav />
          <div className="nav-bar">
            <h1 className="nav-title">Mood Tracker</h1>
            {/* <MoodNav id={userId} /> */}
          </div>
          {/* <MoodGrid data={moodData} /> */}
          <img src={valenceImg} class="valence-img"></img>
          <Outlet />
          <p>Your Mood Track User ID: {loggedInUser}</p>
        </>
      )
}

export default MoodTracker;
