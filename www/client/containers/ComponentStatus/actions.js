import * as types from './actionTypes';
import config from '../../config';

export const fetchAllComponentData = () => async dispatch => {
  dispatch({ type: types.FETCH_COMPONENTS_PENDING });
  try {
    const response = await fetch(`${config.COMPONENTS_URL}`);
    const responseJson = await response.json();
    if (response.status !== 200) {
      dispatch({ type: types.FETCH_COMPONENTS_ERROR });
    } else {
      dispatch({
        type: types.FETCH_COMPONENTS_SUCCESS,
        components: responseJson,
      });
    }
  } catch (error) {
    dispatch({
      type: types.FETCH_COMPONENTS_ERROR,
      error: error,
    });
  }
};

export const fetchComponentStatusData = () => async dispatch => {
  dispatch({ type: types.FETCH_COMPONENT_STATUS_PENDING });
  try {
    const response = await fetch(`${config.COMPONENT_STATUS_URL}`);
    const responseJson = await response.json();
    if (response.status !== 200) {
      dispatch({ type: types.FETCH_COMPONENT_STATUS_ERROR });
    } else {
      dispatch({
        type: types.FETCH_COMPONENT_STATUS_SUCCESS,
        componentStatus: responseJson,
      });
    }
  } catch (error) {
    dispatch({
      type: types.FETCH_COMPONENT_STATUS_ERROR,
      error: error,
    });
  }
};