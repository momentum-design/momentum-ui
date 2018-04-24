import * as types from '../constants';

const initialState = {
  error: null,
  loading: false,
  icons: []
};

const icons = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ICONS_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null
      });
    case types.FETCH_ICONS_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message
      });
    case types.FETCH_ICONS_SUCCESS:
      return Object.assign({}, state, {
        icons: action.icons,
        loading: false,
        error: null
      });
    default:
      return state;
  }
};
export default icons;
