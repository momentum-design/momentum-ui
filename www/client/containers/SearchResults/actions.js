import * as types from './actionTypes';
// import config from '../../config';

import mockData from '../../../server/mockData/searchResults.json';

const setSearchResultsData = results => {
  return {
    type: types.FETCH_SEARCH_RESULTS_SUCCESS,
    results,
  };
};

// const setError = error => {
//   return {
//     type: types.FETCH_SEARCH_RESULTS_ERROR,
//     error,
//   };
// };

export const fetchSearchResultsData = () => dispatch => {
  //return fetch(`${config.SEARCH_URL}`)
  //  .then(res => res.json())
  //  .then(results =>
  //    dispatch(setSearchResultsData(results))
  //  )
  //  .catch(error => dispatch(setError(error)));

  dispatch(setSearchResultsData(mockData));

};
