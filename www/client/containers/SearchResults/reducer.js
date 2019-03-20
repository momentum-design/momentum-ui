import * as types from './actionTypes';

const initialState = {
  results: [],
  loading: true,
  error: null,
};

const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SEARCH_RESULTS_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null,
      });
    case types.FETCH_SEARCH_RESULTS_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message,
      });
    case types.FETCH_SEARCH_RESULTS_SUCCESS:
      return Object.assign({}, state, {
        results: action.results,
        loading: false,
        error: null,
      });
    default:
      return state;
  }
};

export default searchResultsReducer;
