import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  error: null,
  history: []
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    }
  }
});

export const { setWeather, setError, addToHistory } = weatherSlice.actions;
export default weatherSlice.reducer;
