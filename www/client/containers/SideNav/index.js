import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import logo from '../../assets/momentum-design.svg';
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
      onClick,
      routes,
    } = this.props;


    const isMatchingRoute = (index, path) => {
      const routesArray = location.pathname.match(/[^/]+/g) || [];
      const pathArray = path.match(/[^/]+/g) || [];

      return (
        routesArray[index]
        &&
        pathArray[pathArray.length - 1] === routesArray[index]
      );
    };

    const createNavLinks = routes.map((item, idx) => {
      return item.children
        ? (
          <SidebarNavItem
            icon={item.classes}
            key={`${item.id}-${idx}`}
            keyboardKey={item.title}
            title={item.title}
            {...isMatchingRoute(0, item.path) && { expanded: true }}
          >
              {
                item.children.map((child, childIdx) => (
                  child.children
                  ? (
                    <SidebarNavItem
                      key={`${child.id}-${childIdx}`}
                      keyboardKey={child.title}
                      title={child.title}
                      {...isMatchingRoute(1, child.path) && { expanded: true }}
                    >
                      {
                        child.children.map((grandchild, grandChildIdx) => (
                          <SidebarNavItem
                            onClick={onClick}
                            key={`${grandchild.id}-${grandChildIdx}`}
                            keyboardKey={grandchild.title}
                            title={grandchild.title}
                            customAnchorNode={
                              <NavLink
                                activeClassName='active'
                                to={`/${grandchild.path}`}
                              />
                            }
                          />
                        ))
                      }
                    </SidebarNavItem>
                  ) : (
                    <SidebarNavItem
                      customAnchorNode={
                        <NavLink
                          activeClassName='active'
                          to={`/${child.path}`}
                          //Only make Overview Pages exact matches
                          {...!child.path.match(/\//g) && { exact: true }}
                        />
                      }
                      key={`${child.id}-${idx}`}
                      keyboardKey={child.title}
                      onClick={onClick}
                      title={child.title}
                    />
                  )
                ))
              }
          </SidebarNavItem>
        )
        :
        (
          <SidebarNavItem
            customAnchorNode={
              <NavLink activeClassName='md-active-nav' to={`/${item.path}`} />
            }
            key={`${item.id}-${idx}`}
            keyboardKey={item.title}
            onClick={onClick}
            title={item.title}
          />
        );
    });

    const sideNav = (
      <Sidebar isFixed={isFixed} className={className} >
        {
          !hideBrand &&
          (
            <SidebarHeader>
              <NavLink to={'/'}>
                <img src={logo} style={{ width: '160px' }} alt="Cisco Momentum Design" />
              </NavLink>
            </SidebarHeader>
          )
        }
        <SidebarBody>
          <SidebarNav trackActive={false}>
            {createNavLinks}
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
