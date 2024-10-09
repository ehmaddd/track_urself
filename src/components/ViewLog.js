import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import DashNav from '../components/DashNav';
import MoodNav from './MoodNav';
import './ViewLog.css'; // Import the CSS file

function ViewLog() {
  const storedUserId = localStorage.getItem('user');
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const moods = useSelector((state) => state.mood.moods[loggedInUser]);
  const navigate = useNavigate();
  const [moodLogs, setMoodLogs] = useState([]);
  const [filteredMoodLogs, setFilteredMoodLogs] = useState([]);

  // State for date range filter
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // State for counter input
  const [recordCount, setRecordCount] = useState(10);

  useEffect(() => {
    const today = new Date();
    setEndDate(today.toISOString().split('T')[0]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    setStartDate(sevenDaysAgo.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
    setMoodLogs(moods);
  });

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const deleteMoodLog = async (logId) => {
    
  };

  // Function to handle the date range filter
  const handleFilter = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const filteredLogs = moodLogs.filter((mood) => {
      const moodDate = new Date(mood.date);
      return moodDate >= start && moodDate <= end;
    });

    setFilteredMoodLogs(filteredLogs);
  };

  // Function to handle showing a specific number of records
  const handleShowRecords = () => {
    const limitedLogs = moodLogs.slice(0, recordCount); // Limit the mood logs based on recordCount
    setFilteredMoodLogs(limitedLogs);
  };

  useEffect(() => {
    // Update filtered logs when moodLogs or recordCount changes
    handleShowRecords();
  }, [moodLogs, recordCount]);

  return (
    <>
      <DashNav />
        <>
          <div className="nav-bar">
            <h1 className="nav-title">View Log</h1>
            <MoodNav id={storedUserId} />
          </div>
          <Outlet />
          <div className="log-filter-container">
            <div className="filter-left">
              <label htmlFor="startDate">From:</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label htmlFor="endDate">To:</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button onClick={handleFilter}>Filter</button>
            </div>
            <div className="filter-right">
              <label htmlFor="recordCount">Show:</label>
              <input
                id="recordCount"
                type="number"
                min="1"
                value={recordCount}
                onChange={(e) => setRecordCount(e.target.value)}
              />
            </div>
          </div>
          <div className="mood-logs-container">
            {filteredMoodLogs.length > 0 ? (
              <table className="mood-logs-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Valence</th>
                    <th>Arousal</th>
                    <th>Duration</th>
                    <th>Trigger</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMoodLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.time}</td>
                      <td>{formatDate(log.date)}</td>
                      <td>{log.valence}</td>
                      <td>{log.arousal}</td>
                      <td>{log.duration} minutes</td>
                      <td>{log.trigger}</td>
                      <td>
                        <button 
                          className="delete-button"
                          onClick={() => deleteMoodLog(log.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No mood logs found</p>
            )}
          </div>
        </>
    </>
  );
}

export default ViewLog;
