import Axios from "axios";

const initialState = {
    posts: [],
    caption: "",
    post_id: null,
    loading: false
}

const GET_ALL_POSTS = "GET_ALL_POSTS";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const GET_ALL_MY_POSTS = "GET_ALL_MY_POSTS";

export function getAllPosts(){
    return {
        type: GET_ALL_POSTS,
        payload: Axios.get("/api/posts")
    }
}

export function addPost(post){
    return {
        type: ADD_POST,
        payload: Axios.post("/api/posts", post)
    }
}

export function editPost(updated_post, post_id) {
    return {
    type: EDIT_POST,
    payload: Axios.put(`/api/posts/${post_id}`, updated_post)
    }
}

export function deletePost(post_id) {
    return {
        type: DELETE_POST,
        payload: Axios.delete(`/api/posts/${post_id}`)
    }
}

export function getAllMyPosts(user_id) {
    return {
        type: GET_ALL_MY_POSTS,
        payload: Axios.get(`/api/posts/${user_id}`)
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case `${GET_ALL_POSTS}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }
        case `${GET_ALL_POSTS}_FULFILLED`: {
            return{
                ...state,
                posts: payload.data,
                loading: false            }
        }
        case `${ADD_POST}_PENDING`: {
            return{
                ...state,
                loading: true
            }
        }
        case `${ADD_POST}_FULFILLED`: {
            return{
                ...state,
                posts: payload.data
            }
        }
        case `${EDIT_POST}_PENDING`: {
            return{
                ...state,
                loading: true
            }
        }
        case `${EDIT_POST}_FULFILLED`: {
            return{
                ...state,
                posts: payload.data,
                // loading: false
            }
        }
        case `${DELETE_POST}_PENDING`: {
            return{
                ...state,
                loading: true
            }
        }
        case `${DELETE_POST}_FULFILLED`: {
            return{
                ...state,
                posts: payload.data
            }
        }
        default:
            return state;
    }
}