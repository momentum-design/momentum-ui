import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem
} from '@momentum-ui/react';

class SideNavContainer extends React.PureComponent {
  render() {
    const {
      className,
      hideBrand,
      isFixed,
      location,
      logo,
      onClick,
      routes,
    } = this.props;

    const sideNav = (
      <Sidebar isFixed={isFixed} wrapperClass={className} >
        {
          !hideBrand &&
          (
            <SidebarHeader>
              {logo}
            </SidebarHeader>
          )
        }
        <SidebarBody>
          <SidebarNav trackActive={false}>
            <SidebarNavItem
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/system'
                />
              }
              key='system'
              keyboardKey='System'
              onClick={onClick}
              title='System'
            />
            <SidebarNavItem
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/tokens'
                />
              }
              key='tokens'
              keyboardKey='Tokens'
              onClick={onClick}
              title='Tokens'
            />
            <SidebarNavItem
              className="side-bar-sub-item"
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/tokens/color'
                />
              }
              key='color'
              keyboardKey='Color'
              onClick={onClick}
              title='Color'
            />
            <SidebarNavItem
              className="side-bar-sub-item"
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/tokens/typography'
                />
              }
              key='typography'
              keyboardKey='Typography'
              onClick={onClick}
              title='Typography'
            />
            <SidebarNavItem
              className="side-bar-sub-item"
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/tokens/elevation'
                />
              }
              key='elevation'
              keyboardKey='Elevation'
              onClick={onClick}
              title='Elevation'
            />
            <SidebarNavItem
              className="side-bar-sub-item"
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/tokens/space'
                />
              }
              key='space'
              keyboardKey='Space'
              onClick={onClick}
              title='Space'
            />
            <SidebarNavItem
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/components'
                />
              }
              key='components'
              keyboardKey='Components'
              onClick={onClick}
              title='Components'
            />
            <SidebarNavItem
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/icons'
                />
              }
              key='icons'
              keyboardKey='Icons'
              onClick={onClick}
              title='Icons'
            />
            <SidebarNavItem
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/personality'
                />
              }
              key='personality'
              keyboardKey='Personality'
              onClick={onClick}
              title='Personality'
            />
          </SidebarNav>
        </SidebarBody>
      </Sidebar>
    );

    return sideNav;
  }
}

const mapStateToProps = state => ({
  error: state.routesReducer.error,
  loading: state.routesReducer.loading,
  routes: state.routesReducer.routes,
});

SideNavContainer.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  hide: PropTypes.bool,
  hideBrand: PropTypes.bool,
  isFixed: PropTypes.bool,
  loading: PropTypes.bool,
  location: PropTypes.object.isRequired,
  logo: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  routes: PropTypes.array.isRequired,
};

SideNavContainer.defaultProps = {
  className: '',
  error: false,
  hide: true,
  hideBrand: false,
  isFixed: true,
  loading: false,
  onClick: null,
};

SideNavContainer.displayName = 'SideNavContainer';

export default withRouter(
  connect(mapStateToProps)(SideNavContainer)
);
