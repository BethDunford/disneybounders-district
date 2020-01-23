import Axios from "axios";

const initialState = {
    posts: [],
    username: "",
    user_id: null,
    profile_image: "",
    profile_description: "",
    loading: false
}

const EDIT_PROFILE = "EDIT_PROFILE";
// const DELETE_PROFILE = "DELETE_PROFILE";

export function editProfile(user_id, updated_profile) {
    console.log(updated_profile)
    return {
    type: EDIT_PROFILE,
    payload: Axios.put(`/api/profile/${user_id}`, updated_profile)
    }
}

// export function deleteProfile(user_id) {
//     return{
//         type: DELETE_PROFILE,
//         payload: Axios.delete(`/api/profile/${user_id}`)
//     }
// }

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
        // case `${DELETE_PROFILE}_PENDING`: {
        //     return{
        //         ...state,
        //         loading: true
        //     }
        // }
        // case `${DELETE_PROFILE}_FULFILLED`: {
        //     return{
        //         ...state,
        //         user_id: payload.data.user_id,
        //         loading: false
        //     }
        // }
        default:
            return state;
    }
}