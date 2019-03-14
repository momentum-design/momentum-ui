import * as types from './actionTypes';

const initialState = {
  loggedIn: false,
};

const loginReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.LOGIN_USER:
      return Object.assign({}, state, {
        email: action.email,
        loggedIn: true,
      });
    case types.LOGOUT_USER:
      return Object.assign({}, state, {
        ...state,
        loggedIn: false,
      });
    default:
      return state;
  }
};

export default loginReducer;
