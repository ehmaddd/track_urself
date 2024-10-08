// Action to register a new user
export const registerUser = (username, password) => ({
    type: 'REGISTER_USER',
    payload: { username, password },
  });
  
  // Action to log in a user
  export const loginUser = (username, password) => ({
    type: 'LOGIN_USER',
    payload: { username, password },
  });
  
  // Action to log out a user
  export const logoutUser = () => ({
    type: 'LOGOUT_USER',
  });
  