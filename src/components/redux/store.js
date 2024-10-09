import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import authReducer  from './reducers/authReducer';
import moodReducer from './reducers/moodReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    mood: moodReducer,
  }
});

export default store;
