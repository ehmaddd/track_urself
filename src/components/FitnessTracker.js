import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashNav from './DashNav';
import FitNav from './FitNav';
import './FitnessTracker.css';

const storeFitness = (profile) => ({
  type: 'STORE_PROFILE',
  payload: profile,
});

function FitnessTracker() {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  // const fitnessData = useSelector((state) => state.fitness[loggedInUser].profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [weight, setWeight] = useState('');
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    height: '',
    weight: '',
    blood_group: '',
    eye_sight_left: 0,
    eye_sight_right: 0,
    disability: false,
    heart_problem: false,
    diabetes: false,
    kidney_issue: false,
  });
  const [lastWorkout, setLastWorkout] = useState({
    date: '',
    time: '',
    duration: '',
    calories: '',
    averageDuration: 0,
    averageCalories: 0,
  });

  useEffect(() => {
    if (!loggedInUser) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [loggedInUser]);

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const fetchProfileData = () => {
    // if (fitnessData && fitnessData.length) {
    //   const userProfile = fitnessData.data[0];
    //   setFormData({
    //     dob: userProfile.dob || '',
    //     gender: userProfile.gender || '',
    //     height: userProfile.height || '',
    //     weight: userProfile.weight || '',
    //     blood_group: userProfile.blood_group || '',
    //     eye_sight_left: userProfile.eye_sight_left || 0,
    //     eye_sight_right: userProfile.eye_sight_right || 0,
    //     disability: userProfile.disability || false,
    //     heart_problem: userProfile.heart_problem || false,
    //     diabetes: userProfile.diabetes || false,
    //     kidney_issue: userProfile.kidney_issue || false,
    //   });
    // }
  };

  // const fetchWorkoutData = () => {
  //   // Simulated workout data fetching logic
  //   const workoutData = fitnessData?.workouts || [];
  //   const today = new Date();
  //   const sevenDaysAgo = new Date(today);
  //   sevenDaysAgo.setDate(today.getDate() - 7);

  //   const lastWeekWorkouts = workoutData.filter((workout) => {
  //     const workoutDate = new Date(workout.date);
  //     return workoutDate >= sevenDaysAgo && workoutDate <= today;
  //   });

  //   const totalDuration = lastWeekWorkouts.reduce((total, workout) => total + workout.duration, 0);
  //   const totalCalories = lastWeekWorkouts.reduce((total, workout) => total + workout.calories, 0);

  //   const averageDuration = lastWeekWorkouts.length ? totalDuration / lastWeekWorkouts.length : 0;
  //   const averageCalories = lastWeekWorkouts.length ? totalCalories / lastWeekWorkouts.length : 0;

  //   if (lastWeekWorkouts.length > 0) {
  //     const latestWorkout = lastWeekWorkouts[0];
  //     setLastWorkout({
  //       date: new Date(latestWorkout.date).toLocaleDateString(),
  //       time: latestWorkout.time,
  //       duration: latestWorkout.duration,
  //       calories: latestWorkout.calories,
  //       averageDuration,
  //       averageCalories,
  //     });
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      user_id: loggedInUser,
      gender: formData.gender,
      dob: formData.dob,
      height: parseFloat(formData.height).toFixed(2),
      weight: parseFloat(formData.weight).toFixed(2),
      blood_group: formData.blood_group,
      eye_sight_left: formData.eye_sight_left,
      eye_sight_right: formData.eye_sight_right,
      disability: formData.disability,
      heart_problem: formData.heart_problem,
      diabetes: formData.diabetes,
      kidney_issue: formData.kidney_issue,
    };
    dispatch(storeFitness(requestBody));
    // setProfile(fitnessData);
  };

  return (
    <div>
      <DashNav />
      <div className="nav-bar">
        <h1 className="nav-title">{profile ? 'Your Profile' : 'Create Your Profile'}</h1>
        {profile && <FitNav id={loggedInUser} />}
      </div>

      <div className="fitness-tracker-container">
        {/* {profile ? ( */}
          <div className="profile-summary-container">
            <h5>Summary</h5>
            <div className="profile-table">
              <div className="profile-row">
                <div className="profile-cell"><strong>Age:</strong> {calculateAge(formData.dob)}</div>
                <div className="profile-cell"><strong>Gender:</strong> {formData.gender}</div>
              </div>
              <div className="profile-row">
                <div className="profile-cell"><strong>Height:</strong> {formData.height}</div>
                <div className="profile-cell"><strong>Weight:</strong> {weight || formData.weight}</div>
              </div>
              <div className="profile-row">
                <div className="profile-cell"><strong>Blood Group:</strong> {formData.blood_group}</div>
                <div className="profile-cell"><strong>Eye Sight:</strong> {formData.eye_sight_left}(L) - {formData.eye_sight_right}(R)</div>
              </div>
              <div className="profile-row">
                <div className="profile-cell"><strong>Disability:</strong> {formData.disability ? 'Yes' : 'No'}</div>
                <div className="profile-cell"><strong>Diabetes:</strong> {formData.diabetes ? 'Yes' : 'No'}</div>
              </div>
              <div className="profile-row">
                <div className="profile-cell"><strong>Heart Problem:</strong> {formData.heart_problem ? 'Yes' : 'No'}</div>
                <div className="profile-cell"><strong>Kidney Issue:</strong> {formData.kidney_issue ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        
          <form onSubmit={handleSubmit} className="fitness-form">
            <div className="profile-form-group">
              <label>Gender:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="profile-form-group">
              <label>Dob:</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
            </div>

            <div className="profile-form-group">
              <label>Height (cm):</label>
              <input type="number" name="height" value={formData.height} min="140" onChange={handleInputChange} required />
            </div>

            <div className="profile-form-group">
              <label>Weight (kg):</label>
              <input type="number" name="weight" value={formData.weight} min="40" onChange={handleInputChange} required />
            </div>

            <div className="profile-form-group full-width">
              <label>Blood Group:</label>
              <select name="blood_group" className="bloodgroup-dd" value={formData.blood_group} onChange={handleInputChange} required>
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="profile-form-group">
              <label>Eye Sight (Left):</label>
              <input type="range" name="eye_sight_left" min="0" max="20" value={formData.eye_sight_left} onChange={handleInputChange} />
            </div>

            <div className="profile-form-group">
              <label>Eye Sight (Right):</label>
              <input type="range" name="eye_sight_right" min="0" max="20" value={formData.eye_sight_right} onChange={handleInputChange} />
            </div>

            <div className="profile-form-group">
              <label>
                <input type="checkbox" name="disability" checked={formData.disability} onChange={handleInputChange} />
                Physical Disability
              </label>
            </div>

            <div className="profile-form-group">
              <label>
                <input type="checkbox" name="diabetes" checked={formData.diabetes} onChange={handleInputChange} />
                Diabetes
              </label>
            </div>

            <div className="profile-form-group">
              <label>
                <input type="checkbox" name="heart_problem" checked={formData.heart_problem} onChange={handleInputChange} />
                Heart Problem
              </label>
            </div>

            <div className="profile-form-group">
              <label>
                <input type="checkbox" name="kidney_issue" checked={formData.kidney_issue} onChange={handleInputChange} />
                Kidney Problem
              </label>
            </div>

            <div className="submit-button-container">
              <button type="submit">Save Profile</button>
            </div>
          </form>
        )

        <div className="workout-summary">
          <h5>Last Workout</h5>
          {lastWorkout.date ? (
            <div>
              <p>Date: {lastWorkout.date}</p>
              <p>Time: {lastWorkout.time}</p>
              <p>Duration: {lastWorkout.duration} minutes</p>
              <p>Calories: {lastWorkout.calories} kcal</p>
              <p>Average Duration (last 7 days): {lastWorkout.averageDuration} minutes</p>
              <p>Average Calories (last 7 days): {lastWorkout.averageCalories} kcal</p>
            </div>
          ) : (
            <p>No recent workouts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FitnessTracker;
