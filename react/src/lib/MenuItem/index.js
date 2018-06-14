import React from 'react';
import PropTypes from 'prop-types';
import { 
  EventOverlay,
  ListItem,
  Icon } from '@collab-ui/react/';

export default class MenuItem extends React.Component {
  static displayName = 'MenuItem';

  state = {
    anchorRef: null,
  };

  handleKeyDown = e => {
    const { handleKeyDown } = this.context;
    const { index } = this.props;
    handleKeyDown && handleKeyDown(index, this, e);
  };
  
  handleClick = e => {
    const { handleClick } = this.context;
    const { index } = this.props;
    handleClick && handleClick(index, this, e);
  };
  
  render () {
    const {
      ariaLabel,
      className,
      disabled,
      focus,
      isHeader,
      isOpen,
      selectedValue,
      separator,
      subMenu,
      title,
      value
    } = this.props;
    return (
      <div
        className={
          'cui-menu-item' +
          `${(className && ` ${className}`) || ''}`
        }
        aria-expanded={isOpen}
        aria-haspopup={!!subMenu}
      >
        <ListItem
          active={isOpen}
          disabled={disabled}
          focus={focus}
          focusOnLoad
          isReadOnly={isHeader}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          ref={ref => !this.state.anchorRef && this.setState({anchorRef: ref})}
          role="menuitem"
          separator={separator}
          title={title}
          value={value}
        >
          <div className="cui-menu-item__content">
            {this.props.children}
          </div>
          <div className="cui-menu-item__selected-value" title={selectedValue}>
            {subMenu && selectedValue}
          </div>
          <div className="cui-menu-item__arrow">
            {subMenu && <Icon name="arrow-right_16"/>}
          </div>
        </ListItem>
        { isOpen ?
        <EventOverlay
          anchorNode={this.state.anchorRef}
          isOpen={isOpen}
          direction="right-top"
          closeOnClick={false}
        >
          <div
            aria-label={ariaLabel}
            role="menu"
          >
            {subMenu}
          </div>
        </EventOverlay> : null }
      </div>
    );
  }
}

MenuItem.contextTypes = {
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
};

MenuItem.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  index: PropTypes.array,
  isHeader: PropTypes.bool,
  isOpen: PropTypes.bool,
  focus: PropTypes.bool,
  menuItem: PropTypes.array,
  selectedValue: PropTypes.string,
  separator: PropTypes.bool,
  shouldCloseMenu: PropTypes.bool,
  subMenu: PropTypes.array,
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
};

MenuItem.defaultProps = {
  ariaLabel: '',
  className: '',
  children: null,
  disabled: false,
  focus: false,
  isHeader: false,
  isOpen: false,
  selectedValue: '',
  separator: false,
  shouldCloseMenu: false,
  subMenu: null,
  title: '',
  value: ''
};
