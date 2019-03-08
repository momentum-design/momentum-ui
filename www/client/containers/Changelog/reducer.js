import * as types from './actionTypes';

const initialState = {
  changelogs: {},
  loading: true,
  error: null,
};

const changelogReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CHANGELOG_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null,
      });
    case types.FETCH_CHANGELOG_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message,
      });
    case types.FETCH_CHANGELOG_SUCCESS:
      return Object.assign({}, state, {
        changelogs: action.changelogs,
        loading: false,
        error: null,
      });
    default:
      return state;
  }
};

export default changelogReducer;
