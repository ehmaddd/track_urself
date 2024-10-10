const initialState = {
    profile: {},
};

const fitnessReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_PROFILE': {
            const { user_id, ...profile } = action.payload;
            
            return {
                    [user_id] : {
                        profile
                    }
                }
        }
        default:
            return state;
    }
};

export default fitnessReducer;
