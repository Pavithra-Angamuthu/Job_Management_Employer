import { LOGIN, NOT_LOGIN } from "./actionTypes";


const initialState = {
    success: false,
    details: {}
};



const authReducer = (state = initialState, action) => {
    console.log("--> action  : ", action)
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                details:  action.details,
                success: true,
            };

        case NOT_LOGIN:
            return {
                ...state,
                success: false,
            };
        default:
            return state;
    }
};

export default authReducer;