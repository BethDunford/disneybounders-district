import Axios from "axios";

const initialState = {
    posts: [],
    username: "",
    profile_image: "",
    profile_description: "",
    loading: false
}

// const GET_SESSION = "GET_SESSION";
const EDIT_PROFILE = "EDIT_PROFILE";

// export function getSession(){
//     return {
//         type: GET_SESSION,
//         payload: Axios.get("/auth/user")
//     }
// }

export function editProfile(user_id, updated_profile) {
    console.log(updated_profile)
    return {
    type: EDIT_PROFILE,
    payload: Axios.put(`/api/profile/${user_id}`, updated_profile)
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case `${EDIT_PROFILE}_PENDING`: {
            return{
                ...state,
                loading: true
            }
        }
        case `${EDIT_PROFILE}_FULFILLED`: {
            return{
                ...state,
                profile_image: payload.data.profile_image,
                profile_description: payload.data.profile_description,
                loading: false
            }
        }
        default:
            return state;
    }
}