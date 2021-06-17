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
  ADD_IMAGE_TO_EXPERIENCE,
  ADD_IMAGE_TO_EXPERIENCE2,
  ADD_IMAGE_TO_EXPERIENCE3,
  ADD_IMAGE_TO_EXPERIENCE4,
  ADD_SESSION,
  ADD_SESSION_FAIL,
  ADD_SESSION_SUCCESS,
  UPDATE_SESSION_FAIL,
  UPDATE_SESSION_SUCCESS,
  UPDATE_SESSION,
} from '../constants/experienceConstants';

const initialState = {
  experiences: [],
  experienceDetails: {},
  isLoading: false,
};
export const experiencesReducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_ALL_EXPERIENCES:
      return {
        isLoading: true,
        experiences: [],
      };
    case FETCH_ALL_EXPERIENCES_SUCCESS:
      return {
        isLoading: false,
        experiences: payload.experiences,
        experiencesCount: payload.experiencesCount,
      };
    case FETCH_ALL_EXPERIENCES_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case FETCH_EXPERIENCE_DETAILS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_EXPERIENCE_DETAILS_SUCCESS:
      return {
        isLoading: false,
        experience: payload,
      };
    case FETCH_EXPERIENCE_DETAILS_FAIL:
      return {
        ...state,
        error: payload,
      };
    case ADD_EXPERIENCE:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        experience: payload,
      };
    case ADD_EXPERIENCE_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    case UPDATE_EXPERIENCE:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        experience: payload.experience,
      };

    case UPDATE_EXPERIENCE_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    case ADD_IMAGE_TO_EXPERIENCE:
      return {
        ...state,
        experience: {
          ...state.experience,
          photo: payload,
        },
      };
    case ADD_IMAGE_TO_EXPERIENCE2:
      return {
        ...state,
        experience: {
          ...state.experience,
          photo2: payload,
        },
      };
    case ADD_IMAGE_TO_EXPERIENCE3:
      return {
        ...state,
        experience: {
          ...state.experience,
          photo3: payload,
        },
      };
    case ADD_IMAGE_TO_EXPERIENCE4:
      return {
        ...state,
        experience: {
          ...state.experience,
          photo4: payload,
        },
      };
    case ADD_SESSION:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        session: payload,
      };
    case ADD_SESSION_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    case UPDATE_SESSION:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        session: payload,
      };

    case UPDATE_SESSION_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    default:
      return state;
  }
};
