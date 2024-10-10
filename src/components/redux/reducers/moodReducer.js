const initialState = {
    moods: [],
};

const moodReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_MOOD': {
            const { userId, ...mood } = action.payload;
            
            return {
                ...state,
                moods: {
                    ...state.moods,
                    [userId]: [
                        ...(state.moods[userId] || []),
                        mood,
                    ],
                },
            };
        }
        default:
            return state; // Return the current state if no action matches
    }
};

export default moodReducer;
