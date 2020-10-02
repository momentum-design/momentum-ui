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
                  to='/2020/system'
                />
              }
              icon="tools_20"
              key='system'
              keyboardKey='System'
              onClick={onClick}
              title='System'
            />
            <SidebarNavItem
              icon="apps_20"
              key='tokens'
              keyboardKey='Tokens'
              title='Tokens'
            >
              <SidebarNavItem
                customAnchorNode={
                  <NavLink
                    activeClassName='active'
                    to='/2020/tokens/color'
                  />
                }
                key='color'
                keyboardKey='Color'
                onClick={onClick}
                title='Color'
              />
              <SidebarNavItem
                customAnchorNode={
                  <NavLink
                    activeClassName='active'
                    to='/2020/tokens/typography'
                  />
                }
                key='typography'
                keyboardKey='Typography'
                onClick={onClick}
                title='Typography'
              />
              <SidebarNavItem
                customAnchorNode={
                  <NavLink
                    activeClassName='active'
                    to='/2020/tokens/elevation'
                  />
                }
                key='elevation'
                keyboardKey='Elevation'
                onClick={onClick}
                title='Elevation'
              />
              <SidebarNavItem
                customAnchorNode={
                  <NavLink
                    activeClassName='active'
                    to='/2020/tokens/space'
                  />
                }
                key='space'
                keyboardKey='Space'
                onClick={onClick}
                title='Space'
              />
            </SidebarNavItem>
            <SidebarNavItem
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/2020/components'
                />
              }
              icon="accessories_20"
              key='components'
              keyboardKey='Components'
              onClick={onClick}
              title='Components'
            />
            <SidebarNavItem
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/2020/icons'
                />
              }
              icon="emoticons_20"
              key='icons'
              keyboardKey='Icons'
              onClick={onClick}
              title='Icons'
            />
            <SidebarNavItem
              customAnchorNode={
                <NavLink
                  activeClassName='active'
                  to='/2020/personality'
                />
              }
              icon="meet_20"
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
