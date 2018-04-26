/**
 * @category layout
 * @component accordion
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class AccordionGroup extends React.Component {
  static displayName = 'AccordionGroup';

  static childContextTypes = {
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
  };

  getChildContext = () => {
    return {
      onClick: this.props.onClick,
      onKeyDown: this.props.onKeyDown,
    };
  }

  componentWillMount () {
    if(!this.verifyChildren()) {
      throw new Error('AccordionGroup should contain 2 children ' +
        'AccordionHeader and AccordionContent respectively.');
    }
  }

  verifyChildren = () => {
    const { children } = this.props;
    const childrenArr = React.Children.toArray(children);
    return (
      children &&
      childrenArr.length === 2 &&
      childrenArr[0].type.displayName === 'AccordionHeader' &&
      childrenArr[1].type.displayName === 'AccordionContent'
    );
  }

  render() {
    const { children, className, isExpanded, disabled, focus } = this.props;

    const setGroupContent = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        disabled,
        focus,
      });
    });

    return (
      <div
        aria-expanded={isExpanded}
        className={
          `cui-accordion__group` +
          `${(disabled && ' cui-accordion__group--disabled') || ''}` +
          `${(isExpanded && ` cui-accordion__group--active`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
      >
        {setGroupContent}
      </div>
    );
  }
}

AccordionGroup.propTypes = {
  children: PropTypes.node,
  isExpanded: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  focus: PropTypes.bool,
};

AccordionGroup.defaultProps = {
  children: null,
  isExpanded: false,
  onClick: null,
  onKeyDown: null,
  className: '',
  disabled: false,
  focus: false,
};
