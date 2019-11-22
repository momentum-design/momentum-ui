import * as types from './actionTypes';
import config from '../../config';
import handleErrors from '../../utils/handleErrors';
import mockup from './dataVisualizationMockUp';

const setRoutes = routes => {
  return { type: types.FETCH_ROUTES_SUCCESS, routes };
};

const setError = error => {
  return { type: types.FETCH_ROUTES_ERROR, error };
};

const filterRouteData = menuData => {
  let dataVisualizationIndex = -1;
  menuData.map((item, index) => {
    if (item.object_slug === 'charts') {
      dataVisualizationIndex = index;
    }
  });
  if (dataVisualizationIndex !== -1) {
    menuData.splice(dataVisualizationIndex, 1);
  }
  menuData.push(mockup);
  return menuData.map(item => {
    if (item.children) {
      item.children.map(child => {
        if (child.children) {
          child.children.map(grandchild => {
            grandchild.path = `${item.object_slug}/${child.object_slug}/${grandchild.object_slug}`;
            return grandchild;
          });
        }
        child.path = item.object_slug === child.object_slug
          ? `${item.object_slug}`
          : `${item.object_slug}/${child.object_slug}`;
        return child;
      });
    }
    item.path = item.object_slug;
    return item;
  });
};

const fetchRoutes = () => dispatch => {
  dispatch({ type: types.FETCH_ROUTES_PENDING });

  return fetch(config.MENUS_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      const data = filterRouteData(json.items);
      dispatch(setRoutes(data));
      return data;
    })
    .catch(error => dispatch(setError(error)));
};

export default fetchRoutes;
