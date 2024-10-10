const initialState = {
    moods: {},
};

const moodReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_MOOD': {
            const { userId, ...newMood } = action.payload;
            
            // Get the existing moods for the user or initialize an empty array
            const existingMoods = state.moods[userId] || [];
            
            return {
                ...state,
                moods: {
                    ...state.moods,
                    [userId]: [...existingMoods, newMood]
                }
            };
        }
        default:
            return state; // Return the current state if no action matches
    }
};

export default moodReducer;
