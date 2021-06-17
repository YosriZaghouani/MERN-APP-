import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_USER,
  UPDATE_FAIL,
  UPDATE_SUCCESS,
  UPDATE_USER,
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAIL,
  SEE_ALL_PREFERENCES,
  ADD_PREFERENCES,
  ADD_PREFERENCES_SUCCESS,
  ADD_PREFERENCES_FAIL,
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAIL,
  ADD_IMAGE_TO_PROFILE,
} from '../constants/action-types';
import {
  FETCH_ALL_EXPERIENCES,
  FETCH_ALL_EXPERIENCES_SUCCESS,
  FETCH_ALL_EXPERIENCES_FAIL,
  FETCH_EXPERIENCE_DETAILS,
  FETCH_EXPERIENCE_DETAILS_SUCCESS,
  FETCH_EXPERIENCE_DETAILS_FAIL,
  ADD_EXPERIENCE,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  CLEAR_ERRORS,
  UPDATE_EXPERIENCE_FAIL,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  ADD_IMAGE_TO_EXPERIENCE,
  ADD_IMAGE_TO_EXPERIENCE2,
  ADD_IMAGE_TO_EXPERIENCE3,
  ADD_IMAGE_TO_EXPERIENCE4,
  ADD_SESSION,
  ADD_SESSION_FAIL,
  ADD_SESSION_SUCCESS,
  FETCH_SESSION_DETAILS,
  FETCH_SESSION_DETAILS_SUCCESS,
  FETCH_SESSION_DETAILS_FAIL,
  UPDATE_SESSION_FAIL,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION,
} from '../constants/experienceConstants';

const addUser = newUser => async dispatch => {
  dispatch({
    type: REGISTER_USER,
  });
  try {
    const addRes = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, newUser);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};
export default addUser;
export const login = cred => async dispatch => {
  console.log('🚀 ~ file: index.js ~ line 74 ~ process.env.REACT_APP_BASE_URL', process.env);

  dispatch({
    type: LOGIN_USER,
  });

  try {
    const loginRes = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, cred);
    localStorage.setItem('token', loginRes.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loginRes.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};
export const getProfile = () => async dispatch => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_PROFILE,
  });
  try {
    const isAuth = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/current`, config);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: isAuth.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};
export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT,
  });
};
//Update User
export const updateProfile = (id, updatedProfile) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_USER,
    });

    const {data} = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/user/profile/${id}`,
      updatedProfile
    );
    dispatch({
      type: UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('🚀 ~ file: index.js ~ line 134 ~ error', error);
    dispatch({
      type: UPDATE_FAIL,
    });
  }
};
export const getUsers = () => async dispatch => {
  dispatch({type: FETCH_ALL_USERS});
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/users`);
    dispatch({
      type: FETCH_ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_USERS_FAIL,
      payload: error.response.data,
    });
  }
};
export const seePreferences = () => async dispatch => {
  try {
    const preferences = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/preferences`);
    dispatch({
      type: SEE_ALL_PREFERENCES,
      payload: preferences.data,
    });
  } catch (error) {
    console.error(error);
  }
};
export const addPreferences = (userId, preferenceId) => async dispatch => {
  dispatch({
    type: ADD_PREFERENCES,
  });
  try {
    const {data} = await axios.put(`/user/mypreferences/${userId}`, {
      preferenceId,
    });
    dispatch({
      type: ADD_PREFERENCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: ADD_PREFERENCES_FAIL,
      payload: error.response,
    });
  }
};
export const getUserDetails = id => async dispatch => {
  dispatch({type: FETCH_USER_DETAILS});
  try {
    const {data} = await axios.get(`/user/user/${id}`);
    dispatch({
      type: FETCH_USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.log('🚀 ~ file: experienceActions.js ~ line 38 ~ getExperienceDetails ~ error', error);
    dispatch({
      type: FETCH_USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const addExperience = newExperience => async dispatch => {
  dispatch({
    type: ADD_EXPERIENCE,
  });
  try {
    const addRes = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/experience`,
      newExperience
    );
    dispatch({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EXPERIENCE_FAIL,
      payload: error,
    });
  }
};
export const getExperiences = () => async dispatch => {
  try {
    dispatch({type: FETCH_ALL_EXPERIENCES});
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/experience`);
    dispatch({
      type: FETCH_ALL_EXPERIENCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_EXPERIENCES_FAIL,
      payload: error.response.data,
    });
  }
};
export const getExperienceDetails = id => async dispatch => {
  dispatch({type: FETCH_EXPERIENCE_DETAILS});
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/experience/${id}`);
    dispatch({
      type: FETCH_EXPERIENCE_DETAILS_SUCCESS,
      payload: data.experience,
    });
  } catch (error) {
    console.log('🚀 ~ file: experienceActions.js ~ line 38 ~ getExperienceDetails ~ error', error);
    dispatch({
      type: FETCH_EXPERIENCE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//delete experience
export const deleteExperience = id => async dispatch => {
  dispatch({type: DELETE_EXPERIENCE});
  try {
    const {data} = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/experience/${id}`);
    dispatch({
      type: DELETE_EXPERIENCE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log('🚀 ~ file: experienceActions.js ~ line 38 ~ getExperienceDetails ~ error', error);
    dispatch({
      type: DELETE_EXPERIENCE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateExperience = (id, updatedExperience) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_EXPERIENCE,
    });

    const {data} = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/experience/${id}`,
      updatedExperience
    );
    dispatch({
      type: UPDATE_EXPERIENCE_SUCCESS,
      payload: data,
    });
    dispatch(getExperienceDetails(id));
  } catch (error) {
    dispatch({
      type: UPDATE_EXPERIENCE_FAIL,
    });
  }
};
//clear Errors
export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
export const addImageToProfile = image => ({
  type: ADD_IMAGE_TO_PROFILE,
  payload: image,
});
export const addImageToExperience = image => ({
  type: ADD_IMAGE_TO_EXPERIENCE,
  payload: image,
});
export const addImageToExperience2 = image2 => ({
  type: ADD_IMAGE_TO_EXPERIENCE2,
  payload: image2,
});
export const addImageToExperience3 = image3 => ({
  type: ADD_IMAGE_TO_EXPERIENCE3,
  payload: image3,
});
export const addImageToExperience4 = image4 => ({
  type: ADD_IMAGE_TO_EXPERIENCE4,
  payload: image4,
});
export const addSession = newSession => async dispatch => {
  dispatch({
    type: ADD_SESSION,
  });
  try {
    const addRes = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/session`, newSession);
    dispatch({
      type: ADD_SESSION_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_SESSION_FAIL,
      payload: error,
    });
  }
};
export const getSessionDetails = id => async dispatch => {
  dispatch({type: FETCH_SESSION_DETAILS});
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/session`);
    dispatch({
      type: FETCH_SESSION_DETAILS_SUCCESS,
      payload: data.session,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SESSION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateSession = (id, updatedSession) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_SESSION,
    });

    const {data} = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/session`, updatedSession);
    dispatch({
      type: UPDATE_SESSION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SESSION_FAIL,
    });
  }
};
