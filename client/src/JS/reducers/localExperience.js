import {CREATE_EXPERIENCE} from '../constants/experienceConstants';

const initialState = {};
export const localExperience = (state = initialState, {type, payload}) => {
  switch (type) {
    case CREATE_EXPERIENCE:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
