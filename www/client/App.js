import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Header from './components/AppHeader';
import AppFooter from './components/AppFooter';
import SideNav from './containers/SideNav';
import Routes from './containers/Routes';
import Routes2020 from './containers2020/Routes';
import { connect } from 'react-redux';
import Media from 'react-media';
import ScrollToTop from './momentum-ui/ScrollToTop';
import AppHeader2020 from './components2020/AppHeader';
import AppFooter2020 from './components2020/AppFooter';

const ARCHIVED_SITE = "?archive";

class App extends React.Component {
  componentDidMount() {
    const {
      history,
      search
    } = this.props;

    history.block(tx => {
      if (search === ARCHIVED_SITE) {
        tx.search = ARCHIVED_SITE;
      }
    });
  }

  render() {
    const { location, search } = this.props;
    const showArchive = search === ARCHIVED_SITE;

    return showArchive
      ? (
        <ScrollToTop>
          <div
            className={
              `docs-main` +
              `${location === '/' ? ' docs-main--home' : ''}`
            }>
            <Header />
            <Media
              query="(min-width: 1025px)"
              render={() => <SideNav className="docs-side-nav"/>}
            />
            <Routes />
            <AppFooter />
          </div>
        </ScrollToTop>
      )
      : (
          <ScrollToTop>
            <AppHeader2020 location = {location} />
            <Routes2020 />
            <AppFooter2020 />
          </ScrollToTop>
      );

  }
}

const mapStateToProps = state => ({
  location: state.router.location.pathname,
  search: state.router.location.search,
});

App.propTypes = {
  location: PropTypes.string,
  search: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default hot(module)(connect(mapStateToProps)(App));
