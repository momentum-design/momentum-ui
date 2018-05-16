import React from 'react';
import PropTypes from 'prop-types';
import { EventOverlay, ListItem, Icon } from '@collab-ui/react/';

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
      isOpen,
      focus,
      isHeader,
      disabled,
      value,
      className,
      ariaLabel,
      subMenu,
      selectedValue,
      separator,
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
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          ref={ref => !this.state.anchorRef && this.setState({anchorRef: ref})}
          focus={focus}
          disabled={disabled}
          isReadOnly={isHeader}
          active={isOpen}
          value={value}
          role="menuitem"
          focusOnLoad
          separator={separator}
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

MenuItem.propTypes = {
  children: PropTypes.node,
  subMenu: PropTypes.array,
  isOpen: PropTypes.bool,
  focus: PropTypes.bool,
  isHeader: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  selectedValue: PropTypes.string,
  className: PropTypes.string,
  shouldCloseMenu: PropTypes.bool,
  ariaLabel: PropTypes.string,
  index: PropTypes.array,
  menuItem: PropTypes.array,
  separator: PropTypes.bool,
};

MenuItem.contextTypes = {
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
};

MenuItem.defaultProps = {
  children: null,
  subMenu: null,
  isOpen: false,
  focus: false,
  isHeader: false,
  disabled: false,
  value: '',
  className: '',
  shouldCloseMenu: false,
  ariaLabel: '',
  selectedValue: '',
  separator: false,
};
