import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { ListItem } from '@collab-ui/react/';

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
      handleClick && handleClick(e, index, this);
      e.preventDefault();
    } else {
      handleKeyDown && handleKeyDown(e, index, this);
    }
  };

  handleClick = e => {
    const { handleClick } = this.context;
    const { index, onClick, value, label } = this.props;

    onClick && onClick(e, {value, label});
    handleClick && handleClick(e, index, this);
  };

  render () {
    const {
      children,
      className,
      isHeader,
      isOpen,
      label,
      ...props
    } = this.props;

    const otherProps = omit({...props}, [
      'index',
      'keepMenuOpen',
      'onClick',
    ]);

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
          className={`${(isHeader && `cui-menu-item__header`) || ''}`}
          focusOnLoad
          isReadOnly={isHeader}
          {...!isHeader && { onClick: this.handleClick }}
          {...!isHeader && { onKeyDown: this.handleKeyDown }}
          ref={ref => !this.state.anchorRef && this.setState({anchorRef: ref})}
          role="menuitem"
          {...otherProps}
        >
          {
            label || children
          }
        </ListItem>
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
  index: PropTypes.array,
  isHeader: PropTypes.bool,
  isOpen: PropTypes.bool,
  keepMenuOpen: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

MenuItem.defaultProps = {
  children: null,
  className: '',
  isHeader: false,
  isOpen: false,
  keepMenuOpen: false,
  label: '',
  onClick: null,
  value: '',
};

export default MenuItem;
