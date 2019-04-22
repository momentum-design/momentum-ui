import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import {
  // List,
  ListItem,
  Topbar,
  TopbarNav,
  TopbarMobile,
  TopbarRight,
  // Popover,
  // Button,
} from '@momentum-ui/react';
import logo from '../../assets/momentum-design.svg';
import getUser from '../../services/user/actions';
// import SearchButton from '../../momentum-ui/SearchButton';
import SideNav from '../../containers/SideNav';
import _ from 'lodash';

class AppHeader extends Component {
  state = {
    hideNav: true,
    expandSearch: false,
    keyword: null,
  };

  componentDidMount() {
    this.props.getUser(location);
    this.showNav(this.props.path);
    this.setSearchButton(this.props.path);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.showNav(this.props.path);
      this.setSearchButton(this.props.path);
    }
  }

  logoutUser = () => {
    console.log('log out user'); // eslint-disable-line no-console
    // this.props.actions.logoutUser();
  };

  showNav = path => {
    this.setState({
      hideNav: path === '/' ? false : true,
    });
  };

  getDefaultAvatar = () => {};

  searchPath = '/search';

  setSearchButton = path => {
    this.setState({
      expandSearch: path === this.searchPath,
    });
  };

  handleSearchExpand = () => {
    this.setState({
      expandSearch: true,
    });
  };

  handleSearchInput = e => {
    this.setState({
      keyword: e.target.value.trim(),
    });
  };

  render() {
    // const {
      // photo,
      // push,
      // search,
    // } = this.props;
    const {
      // expandSearch,
      hideNav,
      // keyword
    } = this.state;
    // const logoIcon = <i className="icon icon-cisco-logo" />;
    const wordMark = <img src={logo} alt="Cisco Momentum Design" />;
    // const getAvatar = () => {
    //   const number = Math.floor(Math.random() * 101);
    //   const gender = Math.random() >= 0.5 ? 'women' : 'men';
    //   return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
    // };
    const navItems = (
      <Fragment>
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/design-principles" activeClassName={'active'}>
              Design Principles
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/guidelines" activeClassName={'active'}>
              Guidelines
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/styles" activeClassName={'active'}>
              Styles
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/components" activeClassName={'active'}>
              Components
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/resources" activeClassName={'active'}>
              Resources
            </NavLink>
          }
        />
      </Fragment>
    );
    // const topBarPopoverContent = (
    //   <List>
    //     <ListItem onClick={this.logoutUser}>Log out</ListItem>
    //   </List>
    // );

    // const topbarRight = this.props.isAuthenticated ? (
    //   <div className="md-top-bar__user">
    //     {/* <Popover
    //       direction="bottom-right"
    //       content={topBarPopoverContent}
    //       popoverTrigger="Click"
    //       closeOnClick> */}
    //     <button className="md-avatar md-button--none" aria-haspopup="true" onClick={this.logoutUser}>
    //       <img className="user-image" src={photo} onError={this.getDefaultAvatar} alt="user" />
    //     </button>
    //     {/*</Popover> */}
    //   </div>
    // ) : (
    //   <div className="md-top-bar__logged-out">
    //     <Link to="/login">Log In</Link>
    //   </div>
    // );

    return (
      <Fragment>
        <Topbar color="light" image={wordMark} brandAnchorElement={<NavLink to="/" />} fixed>
          {!hideNav && <TopbarNav>{navItems}</TopbarNav>}
          {/* <TopbarNav>{navItems}</TopbarNav> */}
          {/* <TopbarNav>Hello</TopbarNav> */}
          <TopbarRight>
            {/* <SearchButton
              name="searchButton"
              htmlId="searchButton"
              expanded={expandSearch}
              value={search && search.q || ''}
              onExpand={this.handleSearchExpand}
              onChange={this.handleSearchInput}
              onKeyDown={e => {
                if (e.key === 'Enter' && keyword.length > 0) {
                  push(this.searchPath + '?q=' + keyword);
                }
              }}
            /> */}
            {/* {topbarRight} */}
          </TopbarRight>
          <TopbarMobile shouldCloseOnClick={false} >
            <SideNav className="docs-mobile-nav" />
          </TopbarMobile>
        </Topbar>
      </Fragment>
    );
  }
}

AppHeader.propTypes = {
  getUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  // push: PropTypes.func.isRequired,
  path: PropTypes.string,
  // photo: PropTypes.string,
  search: PropTypes.object,
};

AppHeader.defaultProps = {
  isAuthenticated: false,
  path: '',
  // photo: null,
  search: null,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    photo: state.user.photo,
    path: state.router.location.pathname,
    search: _.chain(state.router.location.search)
      .replace('?', '')
      .split('&')
      .map(_.partial(_.split, _, '=', 2))
      .fromPairs()
      .value(),
  };
}

export default connect(
  mapStateToProps,
  {
    getUser,
    // push
  }
)(AppHeader);
