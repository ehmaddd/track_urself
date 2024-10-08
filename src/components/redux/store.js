import { createStore } from 'redux';

// Initial state with pre-filled users
const initialState = {
  users: [
    { username: 'john_doe', password: 'password123' },
    { username: 'jane_smith', password: 'password456' },
  ],
  loggedInUser: null,
};

// Reducer to manage user-related actions
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        ...state,
        users: [...state.users, action.payload], // Add new user to the state
      };
    case 'LOGIN_USER':
      const user = state.users.find(
        (user) =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );
      if (user) {
        return { ...state, loggedInUser: user.username };
      } else {
        return { ...state, loggedInUser: null };
      }
    case 'LOGOUT_USER':
      return { ...state, loggedInUser: null };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(userReducer);

export default store;
