/**
 * @category layout
 * @component side-nav
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, ListItemSection } from '@collab-ui/react';

class SideNav extends React.Component {
  state = {
    expanded: this.props.expanded
  };

  handleNavToggle = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { children, navSectionNode, navSectionTitle, topMenu, expandable, className } = this.props;
    const { expanded } = this.state;
    const topMenuTitle = topMenu ? 'top' : 'sub';

    const navSectionTitleText= navSectionTitle
      ? (
        <h3
          className={`cui-side-nav__title--${topMenuTitle}`}
        >
          <button
            className='cui-side-nav__button'
            onClick={() => {expandable ? this.handleNavToggle() : false;}}>
            {navSectionTitle}
            {
              expandable &&
                (
                  expanded
                  ? <Icon name='arrow-up_16' />
                  : <Icon name='arrow-down_16' />
                )
            }
          </button>
        </h3>
      )
      : navSectionNode && React.cloneElement(
        navSectionNode,
        {
          ...expandable && { onClick: () => this.handleNavToggle() }
        },
        [
          ...navSectionNode.props.children,
          ...expandable &&
            <ListItemSection position='right' key='side-nav--expand-section'>
              {
                expanded
                ? <Icon name='arrow-down_12' />
                : <Icon name='arrow-up_12' />
              }
            </ListItemSection>
          ]
      );


    return (
      <div className={
        'cui-side-nav' +
        ` cui-side-nav--${(!expandable || expanded) ? 'expanded' : 'collapse'}` +
        `${className && ` ${className}` || ''}`
      }>
        {navSectionTitleText}
        {children}
      </div>
    );
  }
}

SideNav.propTypes = {
  /** @prop Children nodes to Render inside side navigation | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
  /** @prop Set to make the navigation expandable | false */
  expandable: PropTypes.bool,
  /** @prop Set navigation expanded or collapsed | false */
  expanded: PropTypes.bool,
  /** @prop Node to replace NavSection | null */
  navSectionNode: PropTypes.node,
  /** @prop Title for the side navigation | '' */
  navSectionTitle: PropTypes.string,
  /** @prop Sets side navigation as the top level | false */
  topMenu: PropTypes.bool,
};

SideNav.defaultProps = {
  children: null,
  expandable: false,
  expanded: false,
  navSectionNode: null,
  navSectionTitle: '',
  topMenu: false,
};

SideNav.displayName = 'SideNav';

export default SideNav;

/**
* @component side-nav
* @section default
* @react
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'

export default class SideNavDefault extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;

    return (
      <div className='row'>
        <SideNav navSectionTitle='OVERVIEW' topMenu>
          <List>
            <ListItem label='Platform Introduction' customAnchorNode={anchorNode} />
            <ListItem label='Bots' customAnchorNode={anchorNode} />
            <ListItem label='Widgets' customAnchorNode={anchorNode} />
            <ListItem label='Integration' customAnchorNode={anchorNode} />
            <ListItem label='Guest Issuer' customAnchorNode={anchorNode} />
          </List>
        </SideNav>
      </div>
    );
  }
}
**/

/**
* @component side-nav
* @section expand
* @react
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'

export default class SideNavExpand extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;

    return (
      <div className='row'>
        <SideNav navSectionTitle='Guides' expandable expanded={false}>
          <List>
            <ListItem label='Authentication' customAnchorNode={anchorNode} />
            <ListItem label='Admin API' customAnchorNode={anchorNode} />
            <ListItem label='Webhooks' customAnchorNode={anchorNode} />
            <ListItem label='Compliance' customAnchorNode={anchorNode} />
          </List>
        </SideNav>
      </div>
    );
  }
}
**/

/**
* @component side-nav
* @section nested
* @react
import { List, ListItem, SideNav } from '@collab-ui/react';
import { NavLink } from 'react-router-dom'

export default class SideNavNested extends React.PureComponent {
  render() {
    const anchorNode = <NavLink to='/containers/list-item' />;

    return (
      <div className='row'>
        <SideNav navSectionTitle='Reference' expandable expanded={false}>
          <List>
            <ListItem label='Admins' customAnchorNode={anchorNode} />
            <ListItem label='Devices' customAnchorNode={anchorNode} />
            <ListItem label='Licenses' customAnchorNode={anchorNode} />
            <SideNav navSectionTitle='Messages' className='cui-side-nav__reference' expandable expanded={false}>
              <List>
                <ListItem label='List Messages' customAnchorNode={anchorNode} />
                <ListItem label='Create a Messages' customAnchorNode={anchorNode} />
                <ListItem label='Get Message Details' customAnchorNode={anchorNode} />
                <ListItem label='Delete a Message' customAnchorNode={anchorNode} />
              </List>
            </SideNav>
          </List>
        </SideNav>
      </div>
    );
  }
}
**/
