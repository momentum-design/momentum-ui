import React from 'react';
import PropTypes from 'prop-types';

/**
 * DropdownMenu is component for rendering dropdown menu
 * @param props
 * @returns {XML}
 * @constructor
 */

export default class DropdownMenu extends React.Component {
  static displayName = 'DropdownMenu';

  render() {
    const { isNested, children } = this.props;
    const { isOpen, visibleClass } = this.context;

    return (
      <div
        className={
          `cui-list` +
          `${isNested ? ' nested' : ''}` +
          `${isOpen ? ' visible' : ''}` +
          ` ${visibleClass}`
        }
        ref={ref => (this.menu = ref)}
        role="menu"
      >
        {children}
      </div>
    );
  }
}

DropdownMenu.contextTypes = {
  /** optional isOpen prop type */
  isOpen: PropTypes.bool,
  /** optional visibleClass prop type */
  visibleClass: PropTypes.string
};

DropdownMenu.propTypes = {
  /** optional nested boolean */
  isNested: PropTypes.bool,
  /** required function for onClick events */
  children: PropTypes.node
};

DropdownMenu.defaultProps = {
  isOpen: false,
  visibleClass: '',
  isNested: false,
  children: null
};
