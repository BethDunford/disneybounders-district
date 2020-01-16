import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postsReducer';
import profileReducer from './reducers/profileReducer';

const rootReducer = combineReducers({
    authReducer,
    postsReducer,
    profileReducer
})

export default createStore(rootReducer, applyMiddleware(promise));