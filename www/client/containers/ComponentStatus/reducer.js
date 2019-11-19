import * as types from './actionTypes';

let initialState = {
  components: null,
  componentStatus: null,
  loading: true,
  error: null,
  keyword: '',
};

const componentOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMPONENTS_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null,
      });
    case types.FETCH_COMPONENTS_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message,
      });
    case types.FETCH_COMPONENTS_SUCCESS:
      initialState.components = action.components;
      return Object.assign({}, state, {
        components: action.components,
        componentStatus: initialState.componentStatus,
        loading: initialState.componentStatus === null,
        error: null,
      });
    case types.FETCH_COMPONENT_STATUS_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null,
      });
    case types.FETCH_COMPONENT_STATUS_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message,
      });
    case types.FETCH_COMPONENT_STATUS_SUCCESS:
      initialState.componentStatus = action.componentStatus;
      return Object.assign({}, state, {
        components: initialState.components,
        componentStatus: action.componentStatus,
        loading: initialState.components === null,
        error: null,
      });
    default:
      return state;
  }
};

export default componentOverviewReducer;
