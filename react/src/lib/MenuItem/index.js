import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import {
  EventOverlay,
  Icon, 
  ListItem,
} from '@collab-ui/react/';

class MenuItem extends React.Component {
  static displayName = 'MenuItem';

  state = {
    anchorRef: null,
  };

  handleKeyDown = e => {
    const { onClick, index } = this.props;
    const { handleKeyDown, handleClick } = this.context;
    if (
      e.which === 32
      || e.which === 13
      || e.charCode === 32
      || e.charCode === 13
    ) {
      onClick && onClick(e);
      handleClick && handleClick(index, this, e);
      e.preventDefault();
    } else {
      handleKeyDown && handleKeyDown(index, this, e);
    }
  };

  handleClick = e => {
    const { handleClick } = this.context;
    const { index, onClick } = this.props;

    onClick && onClick(e);
    handleClick && handleClick(index, this, e);
  };

  render () {
    const {
      children,
      className,
      content,
      isHeader,
      isOpen,
      label,
      selectedValue,
      ...props
    } = this.props;

    const otherProps = omit({...props}, ['onClick', 'keepMenuOpen']);

    return (
      <div
        className={
          'cui-menu-item' +
          `${(className && ` ${className}`) || ''}`
        }
        aria-expanded={isOpen}
        aria-haspopup={!!children}
      >
        <ListItem
          active={isOpen}
          focusOnLoad
          isReadOnly={isHeader}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          ref={ref => !this.state.anchorRef && this.setState({anchorRef: ref})}
          role="menuitem"
          {...otherProps}
        >
          <div className="cui-menu-item__content">
            { content || label }
          </div>
          <div className="cui-menu-item__selected-value" title={selectedValue}>
            {children && selectedValue}
          </div>
          <div className="cui-menu-item__arrow">
            {children && <Icon name="arrow-right_16"/>}
          </div>
        </ListItem>
        {
          isOpen &&
          <EventOverlay
            anchorNode={this.state.anchorRef}
            isOpen={isOpen}
            direction="right-top"
            closeOnClick={false}
          >
            <div
              aria-label={label}
              role="menu"
              className="cui-menu-item-container"
            >
              {children}
            </div>
          </EventOverlay>
        }
      </div>
    );
  }
}

MenuItem.contextTypes = {
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
};

MenuItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.element,
  index: PropTypes.array,
  isHeader: PropTypes.bool,
  isOpen: PropTypes.bool,
  keepMenuOpen: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  selectedValue: PropTypes.string,
};

MenuItem.defaultProps = {
  children: null,
  className: '',
  content: null,
  isHeader: false,
  isOpen: false,
  keepMenuOpen: false,
  label: '',
  onClick: null,
  selectedValue: '',
};

export default MenuItem;