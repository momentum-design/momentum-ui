// import handleErrors from '../../utils/handleErrors';
import queryString from 'query-string';

const ACCESS_TOKEN = 'access_token';

const setSessionAccessToken = token => {
  return new Promise(resolve => {
    sessionStorage.setItem(ACCESS_TOKEN, token);
    resolve(token);
  });
};

// const clearSessionAccessToken = () => {
//   sessionStorage.removeItem(ACCESS_TOKEN);
// };

const parseHash = hash => {
  return new Promise(resolve => {
    const parsedHash = queryString.parse(hash);
    resolve(parsedHash.access_token);
  });
};

const getAuthToken = location => {
  return new Promise((resolve, reject) => {
    let auth_token = null;
    if (location.hash) {
      parseHash(location.hash)
        .then(token => setSessionAccessToken(token))
        .then(token => resolve(token))
        .catch(error => {
          reject(error);
        });
    }
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      auth_token = sessionStorage.getItem(ACCESS_TOKEN);
      resolve(auth_token);
    }
  });
};

export default getAuthToken;
