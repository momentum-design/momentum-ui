import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Header from './AppHeader';
import AppFooter from './AppFooter';
import SideNav from '../containers/SideNav';
import Routes from '../containers/Routes';
import Routes2020 from '../containers2020/Routes';
import { connect } from 'react-redux';
import Media from 'react-media';
import ScrollToTop from '../momentum-ui/ScrollToTop';
import AppHeader2020 from '../components2020/AppHeader';
import AppFooter2020 from '../components2020/AppFooter';
import Feedback2020 from '../components2020/FeedBack';

class App extends React.Component {

  render() {
    const { location } = this.props;

    if (location.indexOf('2020') === -1) {
      return (<ScrollToTop>
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
      </ScrollToTop>);
    } else {
      return (<ScrollToTop>
        <AppHeader2020 location = {location} />
        <Routes2020 />
        <Feedback2020 />
        <AppFooter2020 />
      </ScrollToTop>);
    }

  }
}

const mapStateToProps = state => ({
  location: state.router.location.pathname,
});

App.propTypes = {
  location: PropTypes.string,
};

export default hot(module)(connect(mapStateToProps)(App));
