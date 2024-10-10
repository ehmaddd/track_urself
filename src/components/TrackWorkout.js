import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashNav from './DashNav';
import FitNav from './FitNav';
import Chart from 'react-apexcharts';
import './TrackWorkout.css';

// Redux action to store workout data
const storeWorkout = (workout) => ({
  type: 'STORE_WORKOUT',
  payload: workout,
});

function TrackWorkout() {
  const dispatch = useDispatch();
  const storedUserId = localStorage.getItem('user');
  const userId = storedUserId;
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const fetchedData = useSelector((state) => state.fitness[loggedInUser]?.workouts || []);
  const navigate = useNavigate();

  const [workoutData, setWorkoutData] = useState(fetchedData);
  const [chartData, setChartData] = useState({
    dates: [],
    durations: [],
    caloriesBurned: [],
    categories: [],
    categoryFrequencies: [],
  });
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '',
    category: '',
    cburned: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!loggedInUser) {
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    setWorkoutData(fetchedData);
    processChartData(fetchedData);
  }, [fetchedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkDuplicate = () => {
    return workoutData.some((workout) => 
      workout.date === formData.date && 
      workout.time === formData.time && 
      workout.category === formData.category
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for duplicate entry
    if (checkDuplicate()) {
      setErrorMessage('This workout entry already exists.');
      return;
    }

    // Create the request body
    const requestBody = {
      userId: loggedInUser,
      date: formData.date,
      time: formData.time,
      category: formData.category,
      duration: parseFloat(formData.duration),
      cburned: parseFloat(formData.cburned),
    };

    dispatch(storeWorkout(requestBody));
    setFormData({
      date: '',
      time: '',
      duration: '',
      category: '',
      cburned: '',
    });
    setErrorMessage('');
  };

  // Process data for charts
  const processChartData = (data) => {
    // Extract dates, durations, and calories burned
    const dates = data.map((entry) => new Date(entry.date).toLocaleDateString());
    const durations = data.map((entry) => entry.duration || 0);
    const caloriesBurned = data.map((entry) => entry.cburned || 0);

    // Process categories
    const categoryCounts = data.reduce((acc, entry) => {
      const category = entry.category || 'No Category';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const categories = Object.keys(categoryCounts);
    const categoryFrequencies = Object.values(categoryCounts);

    setChartData({ dates, durations, caloriesBurned, categories, categoryFrequencies });
  };

  return (
    <>
      <DashNav />
      <div className="nav-bar">
        <h1 className="nav-title">Track Workout</h1>
        <FitNav id={userId} />
      </div>
      <div className="track-workout-container">
        <form onSubmit={handleSubmit} className="workout-form">
          <div className="workout-form-elements">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="workout-form-group">
              <label className="track-workout-label">Activity:</label>
              <select 
                name="category" 
                className="workout-category" 
                value={formData.category} 
                onChange={handleInputChange} 
                required
              >
                <option value="">Select Category</option>
                <option value="Walking">Walking</option>
                <option value="Jogging">Jogging</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Boating">Boating</option>
                <option value="Sports">Sports</option>
                <option value="Athletics">Athletics</option>
                <option value="Yoga">Yoga</option>
              </select>
            </div>
            <div className="workout-form-group">
              <label className="track-workout-label">Duration (mins):</label>
              <input 
                type="number" 
                name="duration" 
                className="duration-input" 
                value={formData.duration} 
                step="1" 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="workout-form-group">
              <label className="track-workout-label">Burned Calories:</label>
              <input 
                type="number" 
                name="cburned" 
                className="calories-input"  
                value={formData.cburned} 
                step="1" 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="workout-form-group">
              <label className="track-workout-label">Date:</label>
              <input 
                type="date" 
                className="workout-date-input" 
                name="date" 
                value={formData.date} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="workout-form-group">
              <label className="track-workout-label">Time:</label>
              <input 
                type="time" 
                className="workout-time-input" 
                name="time" 
                value={formData.time} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </div>
          <button type="submit" className="workout-btn-submit">Submit</button>
        </form>
        <div className="workout-charts-container">
          <h2>Workout Duration Over Time</h2>
          <div className="chart">
            <Chart
              type="line"
              className="workout-chart"
              options={{
                chart: {
                  id: 'duration-chart',
                },
                xaxis: {
                  categories: chartData.dates,
                  title: {
                    text: 'Date',
                  },
                },
                yaxis: {
                  title: {
                    text: 'Duration (mins)',
                  },
                },
                title: {
                  text: 'Workout Duration',
                  align: 'center',
                },
                stroke: {
                  curve: 'smooth',
                },
                markers: {
                  size: 4,
                },
              }}
              series={[{ name: 'Duration', data: chartData.durations }]}
              width="100%"
              height="400px"
            />
          </div>
          <h2>Calories Burned Over Time</h2>
          <div className="chart">
            <Chart
              type="line"
              className="workout-chart"
              options={{
                chart: {
                  id: 'calories-chart',
                },
                xaxis: {
                  categories: chartData.dates,
                  title: {
                    text: 'Date',
                  },
                },
                yaxis: {
                  title: {
                    text: 'Calories Burned',
                  },
                },
                title: {
                  text: 'Calories Burned',
                  align: 'center',
                },
                stroke: {
                  curve: 'smooth',
                },
                markers: {
                  size: 4,
                },
              }}
              series={[{ name: 'Calories Burned', data: chartData.caloriesBurned }]}
              width="100%"
              height="400px"
            />
          </div>
          <h2>Workout Categories</h2>
          <div className="chart">
            <Chart
              type="pie"
              className="workout-chart"
              options={{
                chart: {
                  id: 'category-chart',
                },
                labels: chartData.categories,
                title: {
                  text: 'Workout Categories',
                  align: 'center',
                },
                legend: {
                  position: 'bottom',
                },
              }}
              series={chartData.categoryFrequencies}
              width="100%"
              height="400px"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackWorkout;
