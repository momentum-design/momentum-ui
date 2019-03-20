import * as types from './actionTypes';
import config from '../../config';

const setComponentsData = components => {
  return {
    type: types.FETCH_COMPONENTS_SUCCESS,
    components,
  };
};

const setError = error => {
  return {
    type: types.FETCH_COMPONENTS_ERROR,
    error,
  };
};

export const filterComponentsData = keyword => dispatch => {
  return dispatch({
    type: types.FILTER_COMPONENTS,
    keyword: keyword.trim().toLowerCase(),
  });
};

export const fetchAllComponentData = () => dispatch => {
  return fetch(`${config.COMPONENTS_URL}`)
    .then(res => res.json())
    .then(components =>
      dispatch(setComponentsData(components))
    )
    .catch(error => dispatch(setError(error)));
};