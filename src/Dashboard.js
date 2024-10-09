import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';
// import FetchMoodColor from './components/FetchMoodColor';
// import FetchFitness from './components/FetchFitness';
// import FetchTodo from './components/FetchTodo';
// import FetchBudget from './components/FetchBudget';
// import FetchEvents from './components/FetchEvents';
// import DashNav from './components/DashNav';
import './Dashboard.css';

function Dashboard() {
  const user = localStorage.getItem('user');
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  // const storedUserId = localStorage.getItem('user');
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  
  // const today = new Date().toISOString().split('T')[0];  // Get today's date in 'YYYY-MM-DD' format
  // const fifteenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 14)).toISOString().split('T')[0];  // Get date 15 days ago

  // const [moodDates, setMoodDates] = useState({
  //   propStartDate: fifteenDaysAgo,  // Default to 15 days ago
  //   propEndDate: today,  // Default to today
  // });

  // const handleStartDateChange = (e) => {
  //   setMoodDates(prevState => ({
  //     ...prevState,
  //     propStartDate: e.target.value
  //   }));
  // };

  // const handleEndDateChange = (e) => {
  //   setMoodDates(prevState => ({
  //     ...prevState,
  //     propEndDate: e.target.value
  //   }));
  // };

  useEffect(() => {
    if (!loggedInUser) {
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
  });

  //   verifyToken();
  // }, [token, navigate, userId, storedUserId]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
        <>
        <h1>{user}'s Dashboard</h1>
          {/* <DashNav />
          <p>Your Dashboard User ID: {userId}</p>
          <div className="dashboard-container">
            <div className="dashboard-column">
              <div className="mood-div">
                <h3 className="mood-heading">Mood Reflection</h3>
                <form className="mood-form">
                  <div className="form-group">
                    <label className='mood-label'>From</label>
                    <input 
                      type="date" 
                      className='mood-start-date' 
                      value={moodDates.propStartDate}
                      onChange={handleStartDateChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label className='mood-label'>To</label>
                    <input 
                      type="date" 
                      className='mood-end-date' 
                      value={moodDates.propEndDate}
                      onChange={handleEndDateChange} 
                    />
                  </div>
                </form>
                <FetchMoodColor propStartDate={moodDates.propStartDate} propEndDate={moodDates.propEndDate} />
              </div>
              <div className="fitness-div">
                <FetchFitness />
              </div>
            </div>
            <div>
              <div className="todo-div">
                <FetchTodo />
              </div>
            </div>
            <div>
              <div className="budget-div">
                <FetchBudget />
              </div>
              <div className="events-div">
                <FetchEvents />
              </div>
            </div>
          </div> */}
        </>
  );
}

export default Dashboard;
