// src/reducers/authReducer.js

const initialState = {
    loggedInUser: null,
    users: [],
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            return {
                ...state,
                users: [...state.users, { username: action.payload.username, password: action.payload.password }],
                loading: false,
            };
        case 'LOGIN_USER':
            const user = state.users.find(user => user.username === action.payload.username && user.password === action.payload.password);
            return {
                ...state,
                loggedInUser: user ? user.username : null,
                error: user ? null : 'Invalid credentials',
            };
        case 'LOGOUT_USER':
            return { ...state, loggedInUser: null };
        default:
            return state;
    }
};

export default authReducer;
