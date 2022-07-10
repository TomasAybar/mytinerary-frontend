import { combineReducers } from 'redux'; // nos devuelve un objeto cuyos valores son funciones reductoras en forma de objeto
import citiesReducer from './citiesReducer';
import tineraryReducer from './tineraryReducer';
import usersReducer from './userReducer';
import activityReducer from './activityReducer';

const mainReducer = combineReducers({ // Le pasamos todos nuestros reducers
    citiesReducer, tineraryReducer, usersReducer, activityReducer
})

export default mainReducer;