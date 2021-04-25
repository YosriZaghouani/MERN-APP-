import {combineReducers} from 'redux';
import userReducer from './userReducer';
import {experiencesReducers} from './experienceReducers';
import {localExperience} from './localExperience';

export default combineReducers({
  userReducer,
  experiencesReducers,
  localExperience,
});
