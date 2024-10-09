// src/redux/actions.js

export const registerUser = (userData) => {
    return {
      type: 'REGISTER_USER',
      payload: userData,
    };
  };
  
  export const loginUser = (username) => {
    return {
      type: 'LOGIN_USER',
      payload: username,
    };
  };
  