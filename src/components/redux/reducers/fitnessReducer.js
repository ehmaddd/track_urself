const initialState = {
    fitness: {},
};

const fitnessReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_PROFILE':
            const { user_id, ...profileData } = action.payload; // Destructure user_id and other profile data
            return {
                ...state.fitness, // Spread existing fitness state
                [user_id]: { // Use user_id from payload
                    ...state.fitness[user_id],
                    profile: profileData, // Store the profile data
                },
            };
            case 'STORE_WORKOUT': {
                const { userId, ...newWorkout } = action.payload;
            
                // Safely get the user's existing data or initialize with an empty workouts array
                const existingUser = state[userId] || { workouts: [] };
            
                // Ensure existingUser.workouts is an array
                const existingWorkouts = Array.isArray(existingUser.workouts) ? existingUser.workouts : [];
            
                return {
                    ...state,
                    [userId]: {
                        ...existingUser,
                        workouts: [...existingWorkouts, newWorkout], // Append the new workout
                    },
                };
            };
            case 'STORE_SUGAR': {
                const { user_id, ...newSugar } = action.payload;
            
                const existingUser = state[user_id] || { sugar: [] };
            
                // Ensure existingUser.sugar is an array
                const existingSugars = Array.isArray(existingUser.sugar) ? existingUser.sugar : [];
            
                return {
                    ...state,
                    [user_id]: {
                        ...existingUser,
                        sugar: [...existingSugars, newSugar], // Append the new sugar
                    },
                };
            }
        default:
            return state;
    }
};

export default fitnessReducer;