import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import { ListItem } from '@collab-ui/react/';

class MenuItem extends React.Component {

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

MenuItem.propTypes = {
  /** @prop Children nodes to render inside MenuItem | null */
  children: PropTypes.node,
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Index value of MenuItem | null */
  index: PropTypes.array,
  /** @prop Determines if MenuItem is the header | false */
  isHeader: PropTypes.bool,
  /** @prop Determines if MenuItem is open | false */
  isOpen: PropTypes.bool,
  /** @prop Set to keep the MenuItem open | false */
  keepMenuOpen: PropTypes.bool,
  /** @prop label text of MenuItem | '' */
  label: PropTypes.string,
  /** @prop Callback function invoked when user taps on MenutItem | null */
  onClick: PropTypes.func,
  /** @prop MenuItem value | '' */
  value: PropTypes.string,
};

MenuItem.defaultProps = {
  children: null,
  className: '',
  index: null,
  isHeader: false,
  isOpen: false,
  keepMenuOpen: false,
  label: '',
  onClick: null,
  value: '',
};

MenuItem.contextTypes = {
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
