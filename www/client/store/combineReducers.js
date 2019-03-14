import { combineReducers } from 'redux';
import userReducer from '../services/user/reducer';
import pageReducer from '../services/page/reducer';
import routesReducer from '../containers/Routes/reducer';
import changelogReducer from '../containers/Changelog/reducer';
import componentOverviewReducer from '../containers/ComponentOverview/reducer';
import componentsReducer from '../containers/Component/reducer';
import feedbackReducer from '../containers/Feedback/reducer';
import iconsReducer from '../containers/Icons/reducer';
import searchResultsReducer from '../containers/SearchResults/reducer';
import { connectRouter } from 'connected-react-router';

const createRootReducer = history => combineReducers({
  changelogReducer,
  componentOverviewReducer,
  componentsReducer,
  feedbackReducer,
  iconsReducer,
  pageReducer,
  routesReducer,
  router: connectRouter(history),
  searchResultsReducer: searchResultsReducer,
  user: userReducer,
});

export default createRootReducer;