import React from 'react';
import PropTypes from 'prop-types';
import libraryIcon from '@collab-ui/core/docs/assets/react.png';
import { ANG_URL, ANG2_URL, CORE_URL } from '../../constants';
import { NavLink } from 'react-router-dom';
import {
  ListItem,
  Topbar,
  TopbarNav,
  TopbarRight,
  TopbarMobile,
  List,
  ListSeparator,
  Button,
  Popover,
} from '@collab-ui/react';

export default class NavBar extends React.Component {
  render() {
    const { navItems } = this.props;
    const libraryName = 'Collab UI React';
    const createMainNav = () => {
      return Object.keys(navItems).reduce((agg, item, idx) => {
        if (idx === 0) return agg;

        const customAnchorNode = (
          <NavLink to={`/${item}`} activeClassName={'active'}>
            {item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()}
          </NavLink>
        );

        return agg.concat(
          <ListItem
            key={`${item}-${idx}`}
            customRefProp="innerRef"
            label={item.charAt(0).toUpperCase() + item.substr(1).toLowerCase()}
            customAnchorNode={customAnchorNode}
          />
        );
      }, []);
    };

    const topBarRightContent = (
      <List>
        <ListItem
          label="Angular (2+)"
          link={ANG2_URL}
          anchorClassName="dropdown-item"
        />
        <ListItem
          label="HTML/CSS"
          link={CORE_URL}
          anchorClassName="dropdown-item"
        />
        <ListItem
          label="AngularJS (1.X)"
          link={ANG_URL}
          anchorClassName="dropdown-item"
        />
      </List>
    );

    return (
      <header>
        <Topbar
          title="Collab UI React"
          color="light"
          icon="icon-cisco-logo"
          anchor="/">
          <TopbarNav>{createMainNav()}</TopbarNav>
          <TopbarRight>
            <Popover
              direction="bottom-right"
              content={topBarRightContent}
              popoverTrigger="Click"
              closeOnClick>
              <Button
                label={
                  <img
                    src={libraryIcon}
                    alt={libraryName}
                    className="user-image"
                  />
                }
                color={'link'}
                circle
                large
              />
            </Popover>
          </TopbarRight>
          <TopbarMobile>
            {topBarRightContent}
            <ListSeparator />
            {createMainNav()}
          </TopbarMobile>
        </Topbar>
      </header>
    );
  }
}

NavBar.propTypes = {
  navItems: PropTypes.object,
};
NavBar.defaultProps = {
  navItems: {},
};
