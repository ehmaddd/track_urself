import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashNav from './DashNav';
import FitNav from './FitNav';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';
import './TrackBp.css';

const storeBp = (bp) => ({
  type: 'STORE_BP',
  payload: bp,
});

function TrackBp() {
  const dispatch = useDispatch();
  const storedUserId = localStorage.getItem('user');
  const userId = storedUserId;
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const fetchedData = useSelector((state) => state.fitness[loggedInUser]?.bp || []);
  const navigate = useNavigate();

  const [bpData, setBpData] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    systolic: '',
    diastolic: ''
  });

  const [chartData, setChartData] = useState({
    systolic: [],
    diastolic: []
  });

  const processChartData = (data) => {
    setChartData({
      systolic: data.map(entry => ({ date: entry.date, level: entry.systolic })),
      diastolic: data.map(entry => ({ date: entry.date, level: entry.diastolic }))
    });
  };

  useEffect(() => {
    if (!loggedInUser) {
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
    processChartData(fetchedData);
  }, [loggedInUser, navigate, fetchedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      user_id: loggedInUser,
      date: formData.date,
      time: formData.time,
      systolic: parseFloat(formData.systolic),
      diastolic: parseFloat(formData.diastolic)
    };
  };

  return (
    <div>
      <DashNav />
      <div className="nav-bar">
            <h1 className="nav-title">Track Blood Pressure</h1>
            <FitNav id={userId} />
          </div>
      <div className="track-bp-container">

      <form onSubmit={handleSubmit} className="bp-form">
        <div className="form-elements">
          <div className="bp-form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
          </div>
          <div className="bp-form-group">
            <label>Time:</label>
            <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
          </div>
          <div className="bp-form-group">
            <label>Systolic:</label>
            <input type="number" name="systolic" value={formData.systolic} step="0.1" onChange={handleInputChange} required />
          </div>
          <div className="bp-form-group">
            <label>Diastolic:</label>
            <input type="number" name="diastolic" value={formData.diastolic} step="0.1" onChange={handleInputChange} required />
          </div>
        </div>
        <button type="submit" className="bp-btn-submit">Submit</button>
      </form>

        <div className="bp-charts-container">
          <h2>Systolic Blood Pressure</h2>
          <div className="chart">
            <Chart
              type="line"
              options={{
                chart: {
                  id: 'systolic-bp-chart',
                },
                xaxis: {
                  categories: chartData.systolic.map(entry => format(new Date(entry.date), 'dd/MM')),
                  title: {
                    text: 'Date',
                  },
                  labels: {
                    rotate: -45, // Rotate labels if needed
                  },
                },
                yaxis: {
                  title: {
                    text: 'Systolic Level',
                  },
                },
                title: {
                  text: 'Systolic Blood Pressure',
                  align: 'center',
                },
                stroke: {
                  curve: 'smooth',
                  width: 2,
                },
                markers: {
                  size: 4,
                },
              }}
              series={[
                {
                  name: 'Systolic Level',
                  data: chartData.systolic.map(entry => entry.level),
                },
              ]}
              width="100%"
              height="400px"
            />
          </div>

          <h2>Diastolic Blood Pressure</h2>
          <div className="chart">
            <Chart
              type="line"
              options={{
                chart: {
                  id: 'diastolic-bp-chart',
                },
                xaxis: {
                  categories: chartData.diastolic.map(entry => format(new Date(entry.date), 'dd/MM')),
                  title: {
                    text: 'Date',
                  },
                  labels: {
                    rotate: -45, // Rotate labels if needed
                  },
                },
                yaxis: {
                  title: {
                    text: 'Diastolic Level',
                  },
                },
                title: {
                  text: 'Diastolic Blood Pressure',
                  align: 'center',
                },
                stroke: {
                  curve: 'smooth',
                  width: 2,
                },
                markers: {
                  size: 4,
                },
              }}
              series={[
                {
                  name: 'Diastolic Level',
                  data: chartData.diastolic.map(entry => entry.level),
                },
              ]}
              width="100%"
              height="400px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackBp;
