import * as types from './actionTypes';

const initialState = {
  componentNotFound: false,
  component: {},
  loading: false,
  error: null,
  codePreference: 'core',
};

const componentsReducer2020 = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMPONENT_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null,
        componentNotFound: false,
      });
    case types.FETCH_COMPONENT_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message,
      });
    case types.FETCH_COMPONENT_SUCCESS:
      return Object.assign({}, state, {
        component: action.component,
        loading: false,
        error: null,
        componentNotFound: false,
      });
    case types.FETCH_COMPONENT_NOT_FOUND:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: null,
        componentNotFound: true,
      });
    case types.SET_CODE_PREFERENCE:
      return Object.assign({}, state, {
        ...state,
        codePreference: action.codePreference,
      });
    default:
      return state;
  }
};

export default componentsReducer2020;
