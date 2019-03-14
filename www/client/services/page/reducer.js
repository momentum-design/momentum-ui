import * as types from './actionTypes';

const initialState = {
  pages: {}
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PAGE_PENDING:
      return Object.assign({}, state, {
        ...state,
        pages: {
          ...state.pages,
          [action.id]: {
            ...state.pages[action.id],
            loading: true,
            error: false
          },
        }
      });
    case types.FETCH_PAGE_ERROR:
    return Object.assign({}, state, {
      ...state,
      pages: {
        ...state.pages,
        [action.id]: {
          ...state.pages[action.id],
          loading: false,
          error: action.error.message
        },
      }
    });
    case types.FETCH_PAGE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        pages: {
          ...state.pages,
          [action.id]: {
            ...state.pages[action.id],
            ...action.data,
            loading: false,
            error: false
          },
        }
      });
    default:
      return state;
  }
};

export default pageReducer;
