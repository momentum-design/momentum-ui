import * as types from './actionTypes';

const initialState = {
  components: null,
  loading: true,
  error: null,
  keyword: '',
};

const componentOverviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DATAVISUALIZATION_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null,
      });
    case types.FETCH_DATAVISUALIZATION_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message,
      });
    case types.FETCH_DATAVISUALIZATION_SUCCESS:
      return Object.assign({}, state, {
        components: action.components,
        loading: false,
        error: null,
      });
    case types.FILTER_DATAVISUALIZATION:
      return Object.assign({}, state, {
        ...state,
        keyword: action.keyword,
      });
    default:
      return state;
  }
};

export default componentOverviewReducer;
