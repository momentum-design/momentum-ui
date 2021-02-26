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

const setComponentNotFound = componentNotFound => {
  return { type: types.FETCH_COMPONENT_NOT_FOUND, componentNotFound };
}

export const fetchComponentData = componentName => dispatch => {
  return fetch(`${config.COMPONENTS_URL}`)
    .then(res => res.json())
    .then(json => {

      let componentId = json.children.reduce((agg, component) => (
        component.name === componentName
          ? component.id
          : agg
      ), null);

      if (componentId === null) {
        return dispatch(setComponentNotFound(true));
      }
      return fetch(`${config.COMPONENTS_URL}/${componentId}`)
        .then(res => res.json())
        .then(component => dispatch(setComponentData(componentId, component)))
        .catch(error => dispatch(setError(error)));
    })
    .catch(error => dispatch(setError(error)));
};