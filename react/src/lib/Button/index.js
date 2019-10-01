/** @component button */

import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@momentum-ui/react';
import omit from 'lodash/omit';
import { UIDConsumer } from 'react-uid';
import ButtonGroupContext from '../ButtonGroupContext';
import SelectableContext, { makeKeyboardKey } from '../SelectableContext';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';

class Button extends React.Component {
  componentDidMount() {
    /* eslint-disable no-console */
    const { ariaLabel, ariaLabelledBy } = this.props;
    (!ariaLabel && !ariaLabelledBy)
      &&
      console.warn('[@momentum-ui/react] Button: Accessibility could be improved with ariaLabel');
    /* eslint-enable no-console */
  }

  handleKeyDown = (e, eventKey) => {
    const { onClick, parentOnSelect, parentKeyDown } = this.props;
    if (e.which === 32 || e.which === 13 ||
        e.charCode === 32 || e.charCode === 13) {

      parentOnSelect && parentOnSelect(e, { eventKey });
      onClick && onClick(e);
    } else {
      parentKeyDown && parentKeyDown(e, eventKey);
    }
  };

  handleClick = (e, eventKey) => {
    const { onClick, parentOnSelect } = this.props;

    onClick && onClick(e);
    parentOnSelect && parentOnSelect(e, { eventKey });
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
      eventKey,
      expand,
      href,
      keyboardKey,
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
      'id',
      'onClick',
      'parentOnSelect',
      'parentKeyDown'
    ]);

    const isButtonGroupIcon = isButtonGroup => (
      isButtonGroup
        && children
        && React.Children.toArray(children).reduce((prev, child) =>
          prev
            ? prev
            : child.type && child.type.displayName === 'Icon'
        , false)
    );

    const getChildren = () => {
      return children
        && [
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
        ];
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

    const getTabIndex = ({ isButtonGroup, focus }) => {
      if(!isButtonGroup) {
        return 0;
      } else if (isButtonGroup && focus) {
        return 0;
      } else return -1;
    };

    const withContext = () => (
      <UIDConsumer name={id => `md-button-${id}`}>
        {id => (
          <ButtonGroupContext.Consumer>
            {context => {
              let contextProps = {};

              contextProps.id = this.props.id || id;
              contextProps.uniqueKey = eventKey || contextProps.id;
              contextProps.active = active || (context && context.active === contextProps.uniqueKey);
              contextProps.isButtonGroup = (context && context.isButtonGroup) || false;
              contextProps.focus = context && context.focus === contextProps.uniqueKey;
              contextProps.width = (context && context.width) || null;
              contextProps.tabIndex = disabled ? null : getTabIndex(contextProps);

              return createElement(contextProps);
            }}
          </ButtonGroupContext.Consumer>
        )}
        </UIDConsumer>
    );

    const keyboardNavKey = makeKeyboardKey(keyboardKey || label || children);

    const createElement = cxtProps => React.createElement(
      tag,
      {
        ref: ref => this.button = ref,
        className:
          'md-button' +
          `${(circle && ` md-button--circle`) || ''}` +
          `${(isButtonGroupIcon(cxtProps.isButtonGroup) && ` md-button--icon-group`) || ''}` +
          `${(getSize() && ` md-button--${getSize()}`) || ''}` +
          `${(expand && ` md-button--expand`) || ''}` +
          `${(color && ` md-button--${getColor()}`) || ''}` +
          `${(removeStyle && ' md-button--none') || ''}` +
          `${(cxtProps.active && !disabled && ` active`) || ''}` +
          `${(className && ` ${className}`) || ''}`,
        id: cxtProps.id,
        'data-md-event-key': cxtProps.uniqueKey,
        onClick: e => this.handleClick(e, cxtProps.uniqueKey),
        onKeyDown: e => this.handleKeyDown(e, cxtProps.uniqueKey),
        style: {
          style,
          ...cxtProps.width && { width: cxtProps.width }
        },
        disabled: disabled || loading,
        alt: ariaLabel || label,
        href: (tag === 'a' && href) || undefined,
        type: tag !== 'a' && type || '',
        ...keyboardNavKey && { 'data-md-keyboard-key': keyboardNavKey },
        ...cxtProps.focus && { 'aria-current': `${cxtProps.focus}` },
        ...ariaLabel
          ? { 'aria-label': ariaLabel }
          : { 'aria-labelledby': ariaLabelledBy },
        tabIndex: cxtProps.tabIndex,
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
          {withContext()}
          <div className='md-button__label'>
            {label}
          </div>
        </div>
        :
        withContext()
    );
  }
}

Button.propTypes = {
  /** @prop Sets active css styling | false */
  active: PropTypes.bool,
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: PropTypes.string,
  /** @prop ID to reference for blindness accessibility feature | '' */
  ariaLabelledBy: PropTypes.string,
  /** @prop Children Nodes to Render inside Button | null */
  children: PropTypes.node,
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
  /** @prop Unique string used for tracking events among ancestors | '' */
  eventKey: PropTypes.string,
  /** @prop Sets expand css styling to widen the Button | false */
  expand: PropTypes.bool,
  /** @prop Href prop changes element to anchor element | '' */
  href: PropTypes.string,
  /** @prop Sets Button id | null */
  id: PropTypes.string,
  /** @prop Unique string used for keyboard navigation | '' */
  keyboardKey: PropTypes.string,
  /** @prop Text to display inside the button | '' */
  label: PropTypes.string,
  /** @prop Depreciated large css styling, use size instead | false */
  large: PropTypes.bool,
  /** @prop Activates the loading animation and sets the button to disabled | false */
  loading: PropTypes.bool,
  /** @prop Handler to be called when the user taps the button | null */
  onClick: PropTypes.func,
  // Internal Context Use Only
  parentKeyDown: PropTypes.func,
  // Internal Context Use Only
  parentOnSelect: PropTypes.func,
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
  eventKey: '',
  expand: false,
  href: '',
  id: '',
  keyboardKey: '',
  label: '',
  large: false,
  loading: false,
  onClick: null,
  parentKeyDown: null,
  parentOnSelect: null,
  removeStyle: false,
  size: 36,
  style: {},
  tag: 'button',
  type: 'button',
};

Button.displayName = 'Button';

export default mapContextToProps(
  SelectableContext,
  context => context,
  Button
);
