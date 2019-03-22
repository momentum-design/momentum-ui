/** @component sidebar */

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Icon, ListItem, ListItemSection } from '@collab-ui/react';
import SidebarContext from '../SidebarContext';
import SidebarNavContext from '../SidebarNavContext';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import { UIDConsumer, UIDFork } from 'react-uid';

class SidebarNavItem extends React.Component {
  state = {
    expanded: this.props.expanded
  };

  componentDidMount() {
    this.setParentContext();
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

  getHeaderLevel = () => {
    const { level } = this.props;

    if (!level) {
      return 'primary';
    } else if (level === 'primary') {
      return 'secondary';
    } else if (level === 'secondary') {
      return 'tertiary';
    }
  }

  setParentContext = () => {
    const { children, setContext } = this.props;
    const nextLevel = children && this.getHeaderLevel() || 'primary';

    nextLevel
    && setContext
    && setContext(nextLevel);
  }

  render() {
    const {
      children,
      className,
      level,
      icon,
      title,
      titleNode,
      ...props
    } = this.props;
    const { expanded } = this.state;

    const otherProps = omit({...props}, [
      'expanded',
      'primary',
      'secondary',
      'setContext',
      'tertiary',
    ]);

    const getIcon = () => {
      const { secondary } = this.props;

      if(typeof icon === 'string') {
        return (
          <Icon 
            name={icon} 
            sizeOverride 
            size={secondary ? 20 : 16} 
          />
        );
      } else return icon;
    };

    const getSection = id => (
      !titleNode
        ? (
          <ListItem
            className={className} 
            id={id}
            onClick={() => {children ? this.handleNavToggle() : false;}}
            {...otherProps}
          >
            {
              icon &&
              <ListItemSection position='left'>
                {getIcon()}
              </ListItemSection>
            }
            <ListItemSection position='center'>
              {title}
            </ListItemSection>
            {
              children &&
              <ListItemSection position='right'>
                {
                  expanded
                  ? <Icon name='arrow-up_12' />
                  : <Icon name='arrow-down_12' />
                }
              </ListItemSection>
            }
          </ListItem>
        )
        : React.cloneElement(titleNode, { 
            id,
            onClick : () => {children ? this.handleNavToggle() : false;}
        })
    );

    const getHeaderLevel = () => {
      if (!level) {
        return 'primary';
      } else if (level === 'primary') {
        return 'secondary';
      } else if (level === 'secondary') {
        return 'tertiary';
      }
    };

    const headerLevel = getHeaderLevel();

    return (
      <UIDConsumer name={id => `cui-sidebar__nav-item-${id}`}>
        {id => {
          return (
            <React.Fragment>
              {getSection(id)}
              {
                children &&
                <UIDFork>
                  <div className={
                    'cui-sidebar-nav__group' +
                    ` cui-sidebar-nav__group--${headerLevel}` +
                    ` cui-sidebar-nav__group--${(!children || expanded) ? 'expanded' : 'collapsed'}`
                  }>
                    <SidebarNavContext.Provider value={{ level: headerLevel }}>
                      {children}
                    </SidebarNavContext.Provider>
                  </div>
                </UIDFork>
              }
            </React.Fragment>
          );
        }}
      </UIDConsumer>
    );
  }
}

SidebarNavItem.propTypes = {
  /** @prop Children nodes to Render inside side navigation | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
  /** @prop Set navigation expanded or collapsed | false */
  expanded: PropTypes.bool,
  /** @prop Icon string or node for the title | null */
  icon: PropTypes.node,
  // Internal Context Use Only
  level: PropTypes.string,
  // Internal Context Use Only
  primary: PropTypes.bool,
  // Internal Context Use Only
  secondary: PropTypes.bool,
  // Internal Context Use Only
  setContext: PropTypes.func,
  // Internal Context Use Only
  tertiary: PropTypes.bool,
  /** @prop Node to replace title | null */
  titleNode: PropTypes.node,
  /** @prop Title for the side navigation | '' */
  title: PropTypes.string,
};

SidebarNavItem.defaultProps = {
  children: null,
  expanded: false,
  icon: null,
  level: null,
  primary: false,
  secondary: false,
  tertiary: false,
  titleNode: null,
  title: '',
  setContext: null,
};

SidebarNavItem.displayName = 'SidebarNavItem';

export default mapContextToProps(
  [SidebarContext, SidebarNavContext],
  (sidebarContext, sidebarNavContext) => ({
    ...sidebarContext,
    ...sidebarNavContext
  }),
  SidebarNavItem
);