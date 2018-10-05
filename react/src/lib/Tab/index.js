import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tab is supplemental, clickable component used to help navigate content
 * @param props
 * @returns {XML}
 * @constructor
 */

class Tab extends React.PureComponent {

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
  /** @prop Set Tab with an active state | false */
  active: PropTypes.bool,
  /** @prop Optional CSS class name */
  className: PropTypes.string,
  /** @prop Sets the attribute disabled to the Tab | false */
  disabled: PropTypes.bool,
  /** @prop Specifies if Tab should automatically get focus when page loads | false */
  focus: PropTypes.bool,
  /** @prop Tab Heading Text */
  heading: PropTypes.string.isRequired,
  /** @prop Currently unused prop myKey | 0 */
  myKey: PropTypes.number,
  /** @prop Callback function invoked when user presses a key | null */
  onKeyDown: PropTypes.func,
  /** @prop Callback function invoked when user presses on the Tab | null */
  onPress: PropTypes.func,
  /** @prop Tab's anchor role type | 'tab' */
  role: PropTypes.string,
};

Tab.defaultProps = {
  active: false,
  className: '',
  disabled: false,
  focus: false,
  myKey: 0,
  onKeyDown: null,
  onPress: null,
  role: 'tab',
};

Tab.displayName = 'Tab';

export default Tab;