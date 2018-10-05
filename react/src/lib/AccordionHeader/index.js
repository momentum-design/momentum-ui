/**
 * @category layout
 * @component accordion
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';

class AccordionHeader extends React.Component {
  static displayName = 'AccordionHeader';

  static contextTypes = {
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func
  };

  componentDidUpdate(prevProps) {
    const { focus } = this.props;
    !prevProps.focus && focus && this.headerRef.focus();
  }

  render() {
    const {
      children,
      className,
      disabled,
      showSeparator,
      height,
    } = this.props;

    const { onClick, onKeyDown } = this.context;

    return (
      <div
        role='button'
        ref={ref => this.headerRef = ref}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={!disabled ? 0 : -1}
        className={
          'cui-accordion__header' +
          `${(showSeparator && ` cui-accordion__header--separator`) || ''}` +
          `${(height && ` cui-accordion__header--${height}`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
      >
          {children}
          <span className="cui-accordion__header-icon"/>
      </div>
    );
  }
}

AccordionHeader.propTypes = {
  /** @prop Children nodes to render inside AccordionHeader | null  */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Set the attribute disabled to the AccordionHeader | false */
  disabled: PropTypes.bool,
  /** @prop Specifies if AccordionHeader automatically gets focus when page loads | false  */
  focus: PropTypes.bool,
  /** @prop Optional underline under Accordion menu item | false */
  showSeparator: PropTypes.bool,
  /** @prop Set the height of the AccordionHeader to either the default or 56px | '' */
  height: PropTypes.oneOf(['', 56]),
};

AccordionHeader.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  focus: false,
  showSeparator: true,
  height: '',
};

export default AccordionHeader;