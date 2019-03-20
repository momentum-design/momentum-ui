import * as types from './actionTypes';
import config from '../../config';

const setComponentData = (id, component) => {
  return { type: types.FETCH_COMPONENT_SUCCESS, id, component };
};

const setError = error => {
  return { type: types.FETCH_COMPONENT_ERROR, error };
};

export const setCodePreference = type => dispatch => {
  return dispatch({
    type: types.SET_CODE_PREFERENCE, codePreference: type
  });
};

export const fetchComponentData = id => dispatch => {
  return fetch(`${config.COMPONENTS_URL}/${id}`)
    .then(res => res.json())
    .then(component => dispatch(setComponentData(id, component)))
    .catch(error => dispatch(setError(error)));
};