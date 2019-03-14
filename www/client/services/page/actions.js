import * as types from './actionTypes';
import config from '../../config';

const loadingPageData = id => (
  { id, type: types.FETCH_PAGE_PENDING }
);

const setPageData = (id, data) => (
  { type: types.FETCH_PAGE_SUCCESS, id, data }
);

const errorPageData = (id, error) => (
  { type: types.FETCH_PAGE_ERROR, id, error }
);

export const fetchPageData = id => async(dispatch) => {
  dispatch(loadingPageData(id));

  try {
    const response = await fetch(`${config.PAGES_URL}/${id}`);
    const pageData = await response.json();

    dispatch(setPageData(id, pageData));
  } catch (error) {
    dispatch(errorPageData(id, error));
  }
};