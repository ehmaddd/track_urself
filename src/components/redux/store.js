import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import authReducer  from './reducers/authReducer';
import moodReducer from './reducers/moodReducer';
import fitnessReducer from './reducers/fitnessReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    mood: moodReducer,
    fitness: fitnessReducer,
  }
});

export default store;
