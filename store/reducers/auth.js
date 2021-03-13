import {LOGOUT, FORGOT, NEW_PASSWORD} from '../actions/auth';
import {AUTHENTICATE} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  admin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_PASSWORD:
      return state;
    case FORGOT:
      return state;
    case LOGOUT:
      return initialState;

    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        admin: action.admin,
      };
    default:
      return state;
  }
};
