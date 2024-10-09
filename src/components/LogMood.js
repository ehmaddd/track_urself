import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashNav from './DashNav';
import MoodNav from './MoodNav';
import './LogMood.css';

// Action creator for logging mood
const logMood = (mood) => ({
    type: 'LOG_MOOD',
    payload: mood,
});

function LogMood() {
    const dispatch = useDispatch();
    const [valence, setValence] = useState(0);
    const [arousal, setArousal] = useState(0);
    const [duration, setDuration] = useState('');
    const [trigger, setTrigger] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [errors, setErrors] = useState({});

    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const navigate = useNavigate();

    const triggerOptions = [
        'Work',
        'Family',
        'Friends',
        'Health',
        'Finance',
        'Others',
    ];

    useEffect(() => {
      if (!loggedInUser) {
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
    });

    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        // Clear error message for the field
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));

        switch (fieldName) {
            case 'valence':
                setValence(value);
                break;
            case 'arousal':
                setArousal(value);
                break;
            case 'duration':
                setDuration(value);
                break;
            case 'date':
                setDate(value);
                break;
            case 'time':
                setTime(value);
                break;
            case 'trigger':
                setTrigger(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        let formErrors = {};
        if (valence === '') formErrors.valence = 'Valence level is required';
        if (arousal === '') formErrors.arousal = 'Arousal level is required';
        if (duration === '') formErrors.duration = 'Duration is required';
        if (!date) formErrors.date = 'Date is required';
        if (!time) formErrors.time = 'Time is required';
        if (!trigger) formErrors.trigger = 'Trigger is required';

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const moodLog = {
            userId: loggedInUser,
            valence: Number(valence),
            arousal: Number(arousal),
            duration,
            date,
            time,
            trigger
        };

          dispatch(logMood(moodLog));

          setValence(0);
          setArousal(0);
          setDuration('');
          setTrigger('');
          setDate(new Date().toISOString().slice(0, 10));
          setTime(new Date().toLocaleTimeString());
    };

    return (
        <>
            <DashNav />
            <div className="nav-bar">
                <h1 className="nav-title">Mood Logger</h1>
                <MoodNav id={loggedInUser} />
                <Outlet />
            </div>

            <div className="mood-logger-container">
                <form onSubmit={handleSubmit} className="mood-logger-form">
                    <table className="mood-logger-table">
                        <tbody>
                            <tr>
                                <td className="mood-form-group">
                                    <label>Valence
                                        <br />
                                        <span style={{ color: 'grey', fontSize: '0.75rem'}}>(Positivity/Negativity)</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="-10"
                                        max="10"
                                        value={valence}
                                        onChange={(e) => handleChange(e, 'valence')}
                                        className="slider"
                                    />
                                    <span className="value-display">{valence}</span>
                                    {errors.valence && <div className="error">{errors.valence}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td className="mood-form-group">
                                    <label>Arousal
                                        <br />
                                        <span style={{ color: 'grey', fontSize: '0.75rem'}}>(Intensity)</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={arousal}
                                        onChange={(e) => handleChange(e, 'arousal')}
                                        className="slider"
                                    />
                                    <span className="value-display">{arousal}</span>
                                    {errors.arousal && <div className="error">{errors.arousal}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td className="mood-form-group">
                                    <label>Duration
                                    <br />
                                    <span style={{ color: 'grey', fontSize: '0.75rem'}}>(minutes)</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={duration}
                                        onChange={(e) => handleChange(e, 'duration')}
                                        placeholder="Duration in minutes"
                                        min="0"
                                        max="60"
                                        step="1"
                                    />
                                    {errors.duration && <div className="error">{errors.duration}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td className="mood-form-group">
                                    <label>Date:</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => handleChange(e, 'date')}
                                    />
                                    {errors.date && <div className="error">{errors.date}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td className="mood-form-group">
                                    <label>Time:</label>
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => handleChange(e, 'time')}
                                    />
                                    {errors.time && <div className="error">{errors.time}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td className="mood-form-group">
                                    <label>Trigger:</label>
                                    <select
                                        value={trigger}
                                        onChange={(e) => handleChange(e, 'trigger')}
                                        className="trigger-dropdown"
                                    >
                                        <option value="">-- Select --</option>
                                        {triggerOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.trigger && <div className="error">{errors.trigger}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="submit" className="submit-btn">Log Mood</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}

export default LogMood;
