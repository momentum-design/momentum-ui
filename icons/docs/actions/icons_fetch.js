import * as types from '../constants';

const iconsURL = 'http://collab-ui-icons.cisco.com:8080/api/icons';

const setIcons = icons => {
  return {type: types.FETCH_ICONS_SUCCESS, icons};
};

const setError = error => {
  return {type: types.FETCH_ICONS_ERROR, error};
};

const compare = (a,b) => {
  return a.name > b.name ? 1 : -1;
};

const fetchIcons = () => async (dispatch) => {
  dispatch({type: types.FETCH_ICONS_PENDING });
  
  try {
    const fetchedIcons = await fetch(iconsURL, { method: 'GET'});
    const fetchedIconsToJSON = await fetchedIcons.json();
    const sortedIcons = fetchedIconsToJSON.sort(compare);

    return dispatch(setIcons(sortedIcons));
  } catch (e) {
    return dispatch(setError(e));
  }
};

export default fetchIcons;