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

  componentDidUpdate (prevProps, prevState, prevContext) {
    const { focusIndex } = this.context;
    const { index } = this.props;

    typeof index === 'number'
    && index !== prevContext.focusIndex
    && index === focusIndex
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
  /** optional active prop typ */
  active: PropTypes.bool,
  /** Text to display for blindness accessibility features */
  ariaLabel: PropTypes.string,
  /** ID to reference for blindness accessibility feature */
  ariaLabelledBy: PropTypes.string,
  /** Children Nodes to Render inside button */
  children: PropTypes.node.isRequired,
  /** optional circle prop type */
  circle: PropTypes.bool,
  /** optional css class string */
  className: PropTypes.string,
  /** optional color prop type */
  color: PropTypes.string,
  /** optional containerLarge prop type */
  containerLarge: PropTypes.bool,
  /** Sets the attribute disabled to the button */
  disabled: PropTypes.bool,
  /** Sets the attribute expanded to the button */
  expand: PropTypes.bool,
  /** Href prop changes element to anchor element */
  href: PropTypes.string,
  /** This index used to control focus of Button within a ButtonGroup */
  index: PropTypes.number,
  /** Text to display inside the button */
  label: PropTypes.string,
  /** optional large prop type */
  large: PropTypes.bool,
  /** Activates the loading animation and sets the button to disabled */
  loading: PropTypes.bool,
  /** Handler to be called when the user taps the button */
  onClick: PropTypes.func,
  /** optional prop to remove style */
  removeStyle: PropTypes.bool,
  /** Size className */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Additional styling applied to the button */
  style: PropTypes.object,
  /** optional tag prop type */
  tag: PropTypes.oneOf(['button', 'input', 'a']),
  /** optional type prop type */
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
* @name Default Buttons
*
* @category controls
* @component button
* @section default
*
* @js

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
* @name Button Color
* @description Create colored buttons by passing in the color prop.
*
* @category controls
* @component button
* @section color
*
* @js

export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>

        <div>color=(blue)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            color='blue'
          >
            Test Me
          </Button>
        </div>
        <br />

        <div>color=(none)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            color='none'
          >
            Test Me
          </Button>
        </div>
        <br />
      </div>
    </div>
  );
}

**/

/**
* @name Button Sizes
* @description Create large buttons by passing in the <code>large</code> prop.
*
* @category controls
* @component button
* @section large
*
* @js
*
export default function ButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className="example-spacing">

        <div>size=(none)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size='none'
          >
            Test Me
          </Button>
        </div>
        <br />

        <div>size=(28)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size={28}
          >
            Test Me
          </Button>
        </div>
        <br />

        <div>Default size=(36)</div>
        <div>
          <Button
            ariaLabel='For the Win'
          >
            Test Me
          </Button>
        </div>
        <br />

        <div>size=(40)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size={40}
          >
            Test Me
          </Button>
        </div>
        <br />


        <div>size=(52)</div>
        <div>
          <Button
            ariaLabel='For the Win'
            size={52}
          >
            Test Me
          </Button>
        </div>
        <br />

      </div>
    </div>
  );
}
*/

/**
* @name Button Tags
* @description Button with Tag
*
* @category controls
* @component button
* @section tags
*
*
* @js
export default function ButtonTags() {
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
* @name Button with Color
* @description Button with Color
*
* @category controls
* @component button
* @section colors
*
*
* @js
export default function ButtonColors() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Color Attribute</div>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => {}}
          ariaLabel='For the Win'
          color='blue'
        />
      </div>
    </div>
  );
}
**/

/**
* @name Expanded Buttons
* @description Create block level buttons —those that span the full width of a parent— by passing in the <code>expand</code> prop.
*
* @category controls
* @component button
* @section expanded
*
*
* @js

export default function ButtonExpanded() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => {}}
          ariaLabel='For the Win'
          expand
        />
      </div>
    </div>
  );
}
**/

/**
* @name Disabled Buttons
* @description Create large buttons by passing in the <code>disabled</code> prop.
*
* @category controls
* @component button
* @section disabled
*
*
* @js

export default function ButtonDisabled() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
    <div className='columns small-3'>
      <Button
        children='Test Me'
        onClick={() => {}}
        ariaLabel='For the Win'
        disabled
      />
    </div>
    </div>
  );
}
**/

/**
* @name Loading Buttons
* @description Create loading buttons by passing in the <code>loading</code> prop.
*
* @category controls
* @component button
* @section loading
*
*
* @js

export default function ButtonLoading() {
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

/**
* @name Button with circle
* @description Button with circle, default is small
*
* @category controls
* @component button
* @section circle
*
*
* @js
import { Icon } from '@collab-ui/react';

export default function ButtonShape() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div className='columns small-3'>
        <Button
          children={<Icon name='icon-search_12' />}
          onClick={() => {}}
          ariaLabel='For the Win'
          circle
        />
      </div>
    </div>
  );
}
**/

/**
* @name Circular Buttons
* @description Create circular buttons by passing in the <code>circle</code> prop.
*
* @category controls
* @component button
* @section circle
*
*
* @js
import { Icon } from '@collab-ui/react';

export default function ButtonLargeCircle() {
  return(
    <div>
      <div className='row' style={{marginBottom: '1rem'}}>
        <div className="example-spacing">

          <div>size=(none)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size='none'
            >
              <Icon name='icon-private_8' />
            </Button>
          </div>
          <br />

          <div>size=(20)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={20}
            >
              <Icon name='icon-private_8' />
            </Button>
          </div>
          <br />

          <div>size=(28)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              color='blue'
              size={28}
            >
              <Icon name='icon-plus_12' color='white' />
            </Button>
          </div>
          <br />

          <div>size=(32)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={32}
            >
              <Icon name='icon-plus_14' />
            </Button>
          </div>
          <br />


          <div>Default size=(36)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
            >
              <Icon name='icon-plus_14' />
            </Button>
          </div>
          <br />

          <div>size=(40)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={40}
            >
              <Icon name='icon-plus_14' />
            </Button>
          </div>
          <br />


          <div>size=(44)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={44}
            >
              <Icon name='icon-arrow-tail-down_14' />
            </Button>
          </div>
          <br />

          <div>size=(56)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={56}
            >
              <Icon name='icon-arrow-tail-down_20' />
            </Button>
          </div>
          <br />

          <div>size=(68)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={68}
            >
              <Icon name='icon-arrow-tail-down_28' />
            </Button>
          </div>
          <br />

          <div>size=(72)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={72}
            >
              <Icon name='icon-active-speaker_32' />
            </Button>
          </div>
          <br />

          <div>size=(84)</div>
          <div>
            <Button
              ariaLabel='For the Win'
              circle
              size={84}
            >
              <Icon name='icon-blocked_36' />
            </Button>
          </div>
          <br />


        </div>
      </div>
    </div>
  );
}
**/
