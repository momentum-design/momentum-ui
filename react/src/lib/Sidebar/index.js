/** @component sidebar */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import SidebarContext from '../SidebarContext';
import { UIDReset } from 'react-uid';

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
      children,
      className,
      expandable,
      isFixed,
      isPageLevel,
      theme,
      withIcons,
      withTopbar,
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

    return (
      <div 
        className={
          'cui-sidebar' +
          `${theme && ` cui-sidebar--${theme}` || ''}` +
          `${isFixed && ` cui-sidebar--fixed` || ''}` +
          `${!isPageLevel && ` cui-sidebar--global` || ''}` +
          `${withTopbar && ` cui-sidebar--topbar` || ''}` +
          `${withIcons && !isPageLevel && ` cui-sidebar--indented` || '' }` +
          `${hasTiers() && ` cui-sidebar--nested` || ''}` +
          ` cui-sidebar--${(!expandable || expanded) ? 'expanded' : 'collapsed'}` +
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
    );
  }
}

Sidebar.propTypes = {
  /** @prop Children nodes to Render inside side navigation | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
  /** @prop Set to make the navigation expandable | true */
  expandable: PropTypes.bool,
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
  /** @prop Sets padding for Topbar | false */
  withTopbar: PropTypes.bool,
};

Sidebar.defaultProps = {
  children: null,
  className: '',
  expandable: true,
  expanded: true,
  isFixed: false,
  isPageLevel: false,
  theme: '',
  withIcons: true,
  withTopbar: false,
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;