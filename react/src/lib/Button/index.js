import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@collab-ui/react';

/**
 * @category controls
 * @component button
 * @variations collab-ui-react
 */

class Button extends React.Component {
  static displayName = 'Button';

  componentDidMount() {
    /* eslint-disable no-console */
    const { ariaLabel, ariaLabelledBy, index } = this.props;
    const { focusIndex, focusOnLoad } = this.context;
    (!ariaLabel && !ariaLabelledBy)
      &&
      console.warn('[@collab-ui/react] Button: Accessibility could be improved with ariaLabel');

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
      e.preventDefault();
    } else {
      handleKeyDown && handleKeyDown(e, index);
    }
  };

  handleClick = (e, onClick) => {
    const { handleClick } = this.context;
    const { index } = this.props;

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
      label,
      loading,
      large,
      onClick,
      removeStyle,
      size,
      style,
      tag,
      type,
      ...otherHTMLProps
    } = this.props;

    const { focusIndex } = this.context;

    const getChildren = () => {
      return (
        [
          loading &&
          <div key='child-0'>
            <Loading />
          </div>,
          <span
            className='cui-button__children'
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
        console.warn('[@collab-ui/react] Button: selected size is not supported for non-circular button. Size will default to 36');

        return '36';
      } else if (large) {
        console.warn('[@collab-ui/react] Button: large prop is deprecated and will be removed. Please use size prop.');

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
          'cui-button' +
          `${(circle && ` cui-button--circle`) || ''}` +
          `${(getSize() && ` cui-button--${getSize()}`) || ''}` +
          `${(expand && ` cui-button--expand`) || ''}` +
          `${(color && ` cui-button--${getColor()}`) || ''}` +
          `${(removeStyle && ' cui-button--none') || ''}` +
          `${(active && !disabled && ` active`) || ''}` +
          `${(className && ` ${className}`) || ''}`,
        onClick: e => this.handleClick(e, onClick),
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
        ...otherHTMLProps,
      },
      getChildren()
    );

    return (
      label
        ?
        <div
          className={`cui-button__container${containerLarge ? '' : '--small'}`}
        >
          {button}
          <div className='cui-button__label'>
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

/**
* @component button
* @section default
* @react
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}
**/

/**
* @component button
* @section tags
* @react
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Tag Attribute (a)</div>
      <div className='columns small-3'>
        <Button
          children='Link'
          onClick={() => {}}
          ariaLabel='For the Win'
          tag='a'
        />
      </div>
    </div>
  );
}
**/

/**
* @component button
* @section color
* @react
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row' style={{ marginBottom: '1rem' }}>
      <div>Color Attribute</div>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => { }}
          ariaLabel='For the Win'
          color='blue'
        />
      </div>
    </div>
  );
}
**/

/**
* @component button
* @section size
* @react
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className="example-spacing">
      <div>
        <Button
          ariaLabel='For the Win'
          size='none'
        >
          no size
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='For the Win'
          size={28}
        >
          size 28
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='For the Win'
        >
          size 36
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='For the Win'
          size={40}
        >
          size 40
        </Button>
      </div>
      <br />
      <div>
        <Button
          ariaLabel='For the Win'
          size={52}
        >
          size 52
        </Button>
      </div>
      <br />
    </div>
  );
}
**/

/**
* @component button
* @section circle
* @react
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row'>
      <Button
        children={<Icon name='icon-search_12' />}
        onClick={() => { }}
        ariaLabel='For the Win'
        circle
      />
    </div>
  );
}
**/

/**
* @component button
* @section expanded
* @react
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row'>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => { }}
          ariaLabel='For the Win'
          expand
        />
      </div>
    </div>
  );
}
**/

/**
* @component button
* @section disabled
* @react
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row' style={{ marginBottom: '1rem' }}>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => { }}
          ariaLabel='For the Win'
          disabled
        />
      </div>
    </div>
  );
}
**/

/**
* @component button
* @section loading
* @react
import { Button } from '@collab-ui/react';

export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => {}}
          ariaLabel='For the Win'
          loading
        />
      </div>
    </div>
  );
}
**/
