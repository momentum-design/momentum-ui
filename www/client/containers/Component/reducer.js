import * as types from './actionTypes';

const initialState = {
  components: {},
  loading: false,
  error: null,
  codePreference: 'core',
};

const componentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMPONENT_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null,
      });
    case types.FETCH_COMPONENT_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message,
      });
    case types.FETCH_COMPONENT_SUCCESS:
      return Object.assign({}, state, {
        components: {
          ...state.components,
          [action.id]: action.component,
        },
        loading: false,
        error: null,
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

export default componentReducer;
