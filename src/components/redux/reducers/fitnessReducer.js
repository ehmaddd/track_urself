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
        default:
            return state;
    }
};

export default fitnessReducer;