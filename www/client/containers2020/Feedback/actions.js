import * as types from './actionTypes';
import config from '../../config';

export const updateFeedback = form => dispatch =>
  dispatch({
    type: types.FEEDBACK_UPDATE_FORM,
    form
  });

export const resetFeedback = form => dispatch =>
  dispatch({
    type: types.FEEDBACK_INITIAL_FORM,
    form
  });

export const submitFeedback = form => async(dispatch) => {
  dispatch({ type: types.FEEDBACK_LOADING });

  try {
    const response = await fetch(`${config.FEEDBACK_URL}`, {
      method: 'POST',
      body: form
    });

    if(response.status !== 200){
      dispatch({ type: types.FEEDBACK_ERROR });
    } else {
      dispatch({ type: types.FEEDBACK_SUCCESS });
    }

  } catch (error) {
    dispatch({ type: types.FEEDBACK_ERROR });
  }
};
