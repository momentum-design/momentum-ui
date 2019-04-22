import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Header from './AppHeader';
import AppFooter from './AppFooter';
import SideNav from '../containers/SideNav';
import Routes from '../containers/Routes';
import { connect } from 'react-redux';
import Media from 'react-media';
import ScrollToTop from '../momentum-ui/ScrollToTop';

class App extends React.Component {
  render() {
    const { location } = this.props;

    return (
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
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location.pathname,
});

App.propTypes = {
  location: PropTypes.string,
};

export default hot(module)(connect(mapStateToProps)(App));
