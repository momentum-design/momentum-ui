import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tab is supplemental, clickable component used to help navigate content
 * @param props
 * @returns {XML}
 * @constructor
 */

export default class Tab extends React.PureComponent {
  static displayName = 'Tab';

  componentDidUpdate() {
    this.props.focus && this.tabLink.focus();
  }

  render() {
    const {
      heading,
      active,
      onPress,
      onKeyDown,
      role,
      focus,
      className,
      disabled
      } = this.props;

    /* Due to Collab UI must keep anchor element instead of button
     eventhough accessibility would like the anchor element to be switched
     to a button. */
    /* eslint-disable */
    return (
      <li className={
      'cui-tab__item' +
      `${(className && ` ${className}`) || ''}` +
      `${active ? ' active' : ''}` +
      `${disabled ? ' disabled' : ''}`}
        {...(!disabled ? {tabIndex: '-1'} : {})}
        >
        <a
          ref={ref => (this.tabLink = ref)}
          role={role}
          href='javascript:void(0)'
          onKeyDown={onKeyDown}
          onClick={onPress}
          tabIndex={focus ? 0 : -1}
          aria-current={active}
          >
          {heading}
        </a>
      </li>
    );
  }
}

/* eslint-enable */

Tab.propTypes = {
  /**
   * required function for onClick events
   */
  onPress: PropTypes.func,
  /**
   * required function for keyPress events
   */
  onKeyDown: PropTypes.func,
  /**
   * required heading prop type
   */
  heading: PropTypes.string.isRequired,
  /**
   * optional active prop type
   */
  active: PropTypes.bool,
  /** focus prop for whether focus should change */
  focus: PropTypes.bool,
  /**
   * optional role prop type
   */
  role: PropTypes.string,
  /**
   * optional className prop
   */
  className: PropTypes.string,
  /**
   * optional disabled prop
   */
  disabled: PropTypes.bool,
};

Tab.defaultProps = {
  active: false,
  myKey: 0,
  onPress: null,
  onKeyPress: null,
  role: 'tab',
  focus: false,
  className: '',
  disabled: false
};
