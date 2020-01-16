import axios from 'axios';

const initialState = {
    user_id: null,
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    profile_image: "",
    profile_description: "",
    loading: false
}

const GET_SESSION = "GET_SESSION";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

export function getSession(){
    return {
        type: GET_SESSION,
        payload: axios.get("/auth/user")
    }
}

export function registerUser(newUser){
    return {
        type: REGISTER_USER,
        payload: axios.post("/auth/register", newUser)
    }
}

export function loginUser(user) {
    return {
    type: LOGIN_USER,
    payload: axios.post("/auth/login", user)
    }
}

export function logoutUser() {
    axios.get("auth/logout")
    return{
        type: LOGOUT_USER
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case `${GET_SESSION}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }
        case `${GET_SESSION}_FULFILLED`: {
            return{
                ...state,
                user_id: payload.data.user_id,
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                username: payload.data.username,
                profile_image: payload.data.profile_image,
                profile_description: payload.data.profile_description,
                loading: false
            }
        }
        case `${REGISTER_USER}_PENDING`: {
            return{
                ...state,
                loading: true
            }
        }
        case `${REGISTER_USER}_FULFILLED`: {
            return{
                ...state,
                user_id: payload.data.user_id,
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                username: payload.data.username,
                profile_image: payload.data.profile_image,
                profile_description: payload.data.profile_description,
                loading: false
            }
        }
        case `${LOGIN_USER}_PENDING`: {
            return{
                ...state,
                loading: true
            }
        }
        case `${LOGIN_USER}_FULFILLED`: {
            return{
                ...state,
                user_id: payload.data.user_id,
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                username: payload.data.username,
                profile_image: payload.data.profile_image,
                profile_description: payload.data.profile_description,
                loading: false
            }
        }
        case LOGOUT_USER: {
            return{
                user_id: null,
                first_name: "",
                last_name: "",
                username: "",
                profile_image: "",
                profile_description: "",
                password: "",
                loading: false
            }
        }
        default:
            return state;
    }
}