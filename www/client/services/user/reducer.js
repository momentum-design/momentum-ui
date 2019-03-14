import * as types from './actionTypes';
import { get, find } from 'lodash';

const initialState = {
  isAuthenticated: false,
  userName: '',
  displayName: '',
  name: {},
  photo: '',
  id: '',
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null,
      });
    case types.GET_USER_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message,
      });
    case types.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        userName: action.userInfo.userName,
        displayName: action.userInfo.displayName,
        name: action.userInfo.name,
        photo: find(get(action.userInfo, 'photos'), ['type', 'thumbnail']).value,
        id: action.userInfo.id,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    default:
      return state;
  }
};

export default userReducer;
