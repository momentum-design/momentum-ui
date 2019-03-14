import * as types from './actionTypes';
import config from '../../config';

export const fetchChangelogData = () => async dispatch => {
  dispatch({ type: types.FETCH_CHANGELOG_PENDING });
  try {
    const response = await fetch(`${config.CHANGELOG_URL}`);
    const responseJson = await response.json();
    if (response.status !== 200) {
      dispatch({ type: types.FETCH_CHANGELOG_ERROR });
    } else {
      dispatch({
        type: types.FETCH_CHANGELOG_SUCCESS,
        changelogs: responseJson,
      });
    }
  } catch (error) {
    dispatch({
      type: types.FETCH_CHANGELOG_ERROR,
      error: error,
    });
  }
};