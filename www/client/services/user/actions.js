import * as types from './actionTypes';
import config from '../../config';
import handleErrors from '../../utils/handleErrors';
import getAuthToken from '../auth';
import { get, find } from 'lodash';

// const getAuthTokenFromSession = () => {
//   sessionStorage.getItem('access_token');
// };

// const getAuthTokenFromHash = () => {};

// const setAuth = authInfo => {
//   return { type: types.GET_AUTH_SUCCESS, authInfo };
// };

// const getAuth = () => dispatch => {
//   dispatch({ type: types.GET_AUTH_PENDING });

// if (check store for auth info) {

// }
// };

const getThumbnail = userInfo => {
  return get(userInfo, 'photos') ? find(userInfo.photos, ['type', 'thumbnail']).value : undefined;
};

// const setUserInfo = userInfo => {
//   return { type: types.GET_USER_SUCCESS, userInfo };
// };

// const getCiUser = token => {};

const getUser = location => dispatch => {
  dispatch({ type: types.GET_USER_PENDING });

  return getAuthToken(location)
    .then(token => {
      return fetch(config.CI_USER_URL, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(userInfo => {
      userInfo.photo = getThumbnail(userInfo);
      return dispatch({ type: types.GET_USER_SUCCESS, userInfo });
    })
    .catch(error => dispatch({ type: types.GET_USER_ERROR, error }));
};

export default getUser;
