/** @component sidebar */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import SidebarContext from '../SidebarContext';
import { UIDReset } from 'react-uid';
import { CollapseButton } from '@momentum-ui/react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: this.props.expanded,
      sidebarContext: {
        primary: true,
        secondary: false,
        setContext: this.setSidebarContext,
        tertiary: false,
      }
    };
  }

  componentDidUpdate(prevProps) {
    this.props.expanded !== prevProps.expanded
    && this.state.expanded !== this.props.expanded
    && this.setExpanded();
  }

  handleNavToggle = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  setExpanded = () => {
    this.setState({ expanded: this.props.expanded });
  }

  setSidebarContext = property => {
    this.setState(state => ({
      sidebarContext: {
        ...state.sidebarContext,
        [property]: true,
      }
    }));
  }

  render() {
    const {
      buttonProps,
      children,
      className,
      collapsable,
      isFixed,
      isPageLevel,
      theme,
      withToggle,
      withIcons,
      withTopbar,
      wrapperClass,
      ...props
    } = this.props;
    const { expanded, sidebarContext } = this.state;

    const otherProps = omit({...props}, [
      'expanded'
    ]);

    const hasTiers = () => {
      if(
        sidebarContext.secondary
        ||
        sidebarContext.tertiary
      ) {
        return true;
      } else {
        return false;
      }
    };

    const getCollapseClass = prefix => {
      if ((collapsable || withToggle) && !expanded && !withIcons) {
        return ` ${prefix}--collapsed`;
      } else if ((collapsable || withToggle) && !expanded && withIcons) {
        return ` ${prefix}--minimized`;
      } else return '';
    };

    return (
      <div className={
        'md-sidebar__wrapper' +
        `${isFixed && ` md-sidebar__wrapper--fixed` || ''}` +
        `${wrapperClass && ` ${wrapperClass}` || ''}`
      }>
        <div
          className={
            'md-sidebar' +
            `${theme && ` md-sidebar--${theme}` || ''}` +
            `${isFixed && ` md-sidebar--fixed` || ''}` +
            `${!isPageLevel && ` md-sidebar--global` || ''}` +
            `${withTopbar && ` md-sidebar--topbar` || ''}` +
            `${withIcons && !isPageLevel && ` md-sidebar--indented` || '' }` +
            `${hasTiers() && ` md-sidebar--nested` || ''}` +
            `${getCollapseClass('md-sidebar')}` +
            `${className && ` ${className}` || ''}`
          }
          {...otherProps}
        >
          <SidebarContext.Provider value={sidebarContext}>
            <UIDReset>
              {children}
            </UIDReset>
          </SidebarContext.Provider>
        </div>

        {
          withToggle &&
          <div 
            className={
              'md-sidebar__toggle' +
              `${getCollapseClass('md-sidebar__toggle')}`
          }>
            <CollapseButton 
              collapse={!expanded}
              onClick={this.handleNavToggle}
              {...buttonProps}
            />
          </div>
        }
      </div>
    );
  }
}

Sidebar.propTypes = {
  /**  @prop Optional CSS class for the toggle button | {} */
  buttonProps: PropTypes.object,
  /** @prop Children nodes to Render inside side navigation | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
  /** @prop Set to make the navigation collapsable | false */
  collapsable: PropTypes.bool,
  /** @prop Set navigation expanded or collapsed | true */
  expanded: PropTypes.bool,
  /** @prop Sets Sidebar to position fixed | false */
  isFixed: PropTypes.bool,
  /** @prop Sets Sidebar styling for page level | false */
  isPageLevel: PropTypes.bool,
  /** @prop Optional color theme | '' */
  theme: PropTypes.string,
  /** @prop Changes padding based on Icon nav | true */
  withIcons: PropTypes.bool,
  /** @prop Optional toggle button to expand/collapse sidebar | false */
  withToggle: PropTypes.bool,
  /** @prop Sets padding for Topbar | false */
  withTopbar: PropTypes.bool,
  /** @prop Optional CSS class string for sidebar wrapper | '' */
  wrapperClass: PropTypes.string,
};

Sidebar.defaultProps = {
  buttonProps: {},
  children: null,
  className: '',
  collapsable: false,
  expanded: true,
  isFixed: false,
  isPageLevel: false,
  theme: '',
  withIcons: true,
  withToggle: false,
  withTopbar: false,
  wrapperClass: '',
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
