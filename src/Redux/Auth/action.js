import { LOGIN } from "./actionTypes";


const login = (data) => {
    const login = (data) => {
        return {
            type: LOGIN,
            details: data
        }
    }
    return (dispatch) => {
        dispatch(login(data));
    }
}

export { login };


export const AuthActions = {
    login,
}