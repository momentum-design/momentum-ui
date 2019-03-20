import * as types from './actionTypes';

export function loginUser(email) {
  return dispatch => {
    return dispatch({
      type: types.LOGIN_USER,
      email,
    });
  };
}

export function logoutUser () {
  return dispatch => {
    return dispatch({
      type: types.LOGOUT_USER,
      email: '',
    });
  };
}

