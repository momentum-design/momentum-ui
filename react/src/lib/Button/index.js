/** @component button */

import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@momentum-ui/react';
import omit from 'lodash/omit';

class Button extends React.Component {
  static displayName = 'Button';

  componentDidMount() {
    /* eslint-disable no-console */
    const { ariaLabel, ariaLabelledBy, index } = this.props;
    const { focusIndex, focusOnLoad } = this.context;
    (!ariaLabel && !ariaLabelledBy)
      &&
      console.warn('[@momentum-ui/react] Button: Accessibility could be improved with ariaLabel');

    focusOnLoad
    && focusIndex === index
    && this.refs.button.focus();
    /* eslint-enable no-console */
  }

  componentWillUpdate() {
    this.prevContext = this.context;
  }

  componentDidUpdate () {
    const { focusIndex } = this.context;
    const { index } = this.props;

    typeof index === 'number'
    && index === focusIndex
    && focusIndex !== this.prevContext.focusIndex
    && this.refs.button.focus();
  }

  handleKeyDown = e => {
    const { onClick, index } = this.props;
    const { handleKeyDown, handleClick } = this.context;
    if (e.which === 32 || e.which === 13 ||
        e.charCode === 32 || e.charCode === 13) {
      handleClick && handleClick(e, index);
      onClick && onClick(e);
    } else {
      handleKeyDown && handleKeyDown(e, index);
    }
  };

  handleClick = e => {
    const { handleClick } = this.context;
    const { index, onClick } = this.props;

    onClick && onClick(e);
    handleClick && handleClick(e, index);
  };

  render() {
    const {
      active,
      ariaLabel,
      ariaLabelledBy,
      children,
      circle,
      className,
      color,
      containerLarge,
      disabled,
      expand,
      href,
      index,
      isButtonGroup,
      label,
      loading,
      large,
      removeStyle,
      size,
      style,
      tag,
      type,
      ...props
    } = this.props;

    const otherProps = omit({...props}, [
      'onClick'
    ]);

    const { focusIndex } = this.context;

    const isButtonGroupIcon = () => (
      isButtonGroup
        && children
        && React.Children.toArray(children).reduce((prev, child) =>
          prev
            ? prev
            : child.type && child.type.displayName === 'Icon'
        , false)
    );

    const getChildren = () => {
      return (
        [
          loading &&
          <div key='child-0'>
            <Loading />
          </div>,
          <span
            className='md-button__children'
            style={{ opacity: `${loading ? 0 : 1}` }}
            key='child-1'
          >
            {children}
          </span>
        ]
      );
    };

    const getColor = () => {
      if (removeStyle) return false;

      return color === 'none' ? 'color-none' : color;
    };

    // Method for deprecated large prop
    const getSize = () => {
      if (removeStyle) return false;
      /* eslint-disable no-console */
      const validButtonSize = checkButtonSize();

      if (!circle && !validButtonSize) {
        console.warn('[@momentum-ui/react] Button: selected size is not supported for non-circular button. Size will default to 36');

        return '36';
      } else if (large) {
        console.warn('[@momentum-ui/react] Button: large prop is deprecated and will be removed. Please use size prop.');

        return !circle
          ? '52'
          : '44';

      } else {
        return size === 'none' ? 'size-none' : size;
      }
      /* eslint-enable no-console */
    };

    const checkButtonSize = () => (
      ['none', '28', '36', '40', '52', 28, 36, 40, 52].includes(size)
    );

    const button = React.createElement(
      tag,
      {
        ref: 'button',
        className:
          'md-button' +
          `${(circle && ` md-button--circle`) || ''}` +
          `${(isButtonGroupIcon() && ` md-button--icon-group`) || ''}` +
          `${(getSize() && ` md-button--${getSize()}`) || ''}` +
          `${(expand && ` md-button--expand`) || ''}` +
          `${(color && ` md-button--${getColor()}`) || ''}` +
          `${(removeStyle && ' md-button--none') || ''}` +
          `${(active && !disabled && ` active`) || ''}` +
          `${(className && ` ${className}`) || ''}`,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        style: style,
        disabled: disabled || loading,
        alt: ariaLabel || label,
        href: (tag === 'a' && href) || undefined,
        type: tag !== 'a' && type || '',
        ...ariaLabel
          ? { 'aria-label': ariaLabel }
          : { 'aria-labelledby': ariaLabelledBy },
        tabIndex: (typeof index !== 'number'
          || index === focusIndex)  ? 0 : -1,
        ...tag && tag !== 'button' && {role: 'button'},
        ...otherProps,
      },
      getChildren()
    );

    return (
      label
        ?
        <div
          className={`md-button__container${containerLarge ? '' : '--small'}`}
        >
          {button}
          <div className='md-button__label'>
            {label}
          </div>
        </div>
        :
        button
    );
  }
}

Button.contextTypes = {
  focusIndex: PropTypes.number,
  focusOnLoad: PropTypes.bool,
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
};

Button.propTypes = {
  /** @prop Sets active css styling | false */
  active: PropTypes.bool,
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: PropTypes.string,
  /** @prop ID to reference for blindness accessibility feature | '' */
  ariaLabelledBy: PropTypes.string,
  /** @prop Children Nodes to Render inside Button | null */
  children: PropTypes.node.isRequired,
  /** @prop Sets circle css styling | false */
  circle: PropTypes.bool,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets optional Button color | '' */
  color: PropTypes.string,
  /** @prop Sets containerLarge css styling | false */
  containerLarge: PropTypes.bool,
  /** @prop Sets the attribute disabled to Button | false */
  disabled: PropTypes.bool,
  /** @prop Sets expand css styling to widen the Button | false */
  expand: PropTypes.bool,
  /** @prop Href prop changes element to anchor element | '' */
  href: PropTypes.string,
  /** @prop This index is used to control focus of Button within a ButtonGroup | null */
  index: PropTypes.number,
  /** @prop Determines whether class should be applied to ButtonGroups with Icons as descendants | false */
  isButtonGroup: PropTypes.bool,
  /** @prop Text to display inside the button | '' */
  label: PropTypes.string,
  /** @prop Depreciated large css styling, use size instead | false */
  large: PropTypes.bool,
  /** @prop Activates the loading animation and sets the button to disabled | false */
  loading: PropTypes.bool,
  /** @prop Handler to be called when the user taps the button | null */
  onClick: PropTypes.func,
  /** @prop Optional prop to remove Button's default style | false */
  removeStyle: PropTypes.bool,
  /** @prop Optional string or number size prop | 36 */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** @prop Additional css styling applied to the button | {} */
  style: PropTypes.object,
  /** @prop Optional tag to define type of element | 'button' */
  tag: PropTypes.oneOf(['button', 'input', 'a']),
  /** @prop Optional html type | 'button' */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

Button.defaultProps = {
  active: false,
  ariaLabel: '',
  ariaLabelledBy: '',
  children: null,
  circle: false,
  className: '',
  color: '',
  containerLarge: false,
  disabled: false,
  expand: false,
  href: '',
  index: null,
  isButtonGroup: false,
  label: '',
  large: false,
  loading: false,
  onClick: null,
  removeStyle: false,
  size: 36,
  style: {},
  tag: 'button',
  type: 'button',
};

export default Button;
