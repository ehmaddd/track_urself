import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import authReducer  from './reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
  }
});

export default store;
