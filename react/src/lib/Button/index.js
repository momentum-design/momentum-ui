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
    const { ariaLabel, ariaLabelledBy } = this.props;
    /* eslint-disable no-console */
    (!ariaLabel && !ariaLabelledBy)
      &&
      console.warn('Accessibility could be improved with ariaLabel');
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
      label,
      onClick,
      color,
      expand,
      ariaLabel,
      ariaLabelledBy,
      containerLarge,
      className,
      disabled,
      loading,
      large,
      style,
      type,
      tag,
      href,
      circle,
      children,
      index,
      ...otherHTMLProps
    } = this.props;

    const { focusIndex } = this.context;

    const getChildren = () => {
      return (
        [
          loading &&
          <div key='child-0'>
            <Loading small={circle && !large} />
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

    const button = React.createElement(
      tag,
      {
        ref: 'button',
        className:
          'cui-button' +
          `${(circle && ` cui-button--circle`) || ''}` +
          `${(large && ` cui-button--large`) || ''}` +
          `${(expand && ` cui-button--expand`) || ''}` +
          `${(color && ` cui-button--${color}`) || ''}` +
          `${(active && ` active`) || ''}` +
          `${(className && ` ${className}`) || ''}`,
        onClick: e => this.handleClick(e, onClick),
        onKeyDown: this.handleKeyDown,
        style: style,
        disabled: disabled || loading,
        alt: ariaLabel || label,
        href: (tag === 'a' && href) || undefined,
        type: tag !== 'a' && type || '',
        role: (tag !== 'button' && 'button') || '',
        ...ariaLabel
          ? { 'aria-label': ariaLabel }
          : { 'aria-labelledby': ariaLabelledBy },
        tabIndex: (typeof index !== 'number'
          || index === focusIndex)  ? 0 : -1,
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
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
  focusIndex: PropTypes.number,
};

Button.propTypes = {
  /**
   * Text to display inside the button
   */
  label: PropTypes.string,
  /**
   * Children Nodes to Render inside button
   */
  children: PropTypes.node.isRequired,
  /**
   * optional circle prop type
   */
  circle: PropTypes.bool,
  /**
 * optional active prop type
 */
  active: PropTypes.bool,
    /**
   * optional containerLarge prop type
   */
  containerLarge: PropTypes.bool,
  /**
   * optional large prop type
   */
  large: PropTypes.bool,
  /**
   * optional color prop type
   */
  color: PropTypes.string,
  /**
   * optional tag prop type
   */
  tag: PropTypes.oneOf(['button', 'input', 'a']),
  /**
   * optional type prop type
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  /**
   * Handler to be called when the user taps the button
   */
  onClick: PropTypes.func,
  /**
   * Href prop changes element to anchor element
   */
  href: PropTypes.string,
  /**
   * Text to display for blindness accessibility features
   */
  ariaLabel: PropTypes.string,
  /**
 * ID to reference for blindness accessibility features
 */
  ariaLabelledBy: PropTypes.string,
  /**
   * @ignore
   * optional css class string
   */
  className: PropTypes.string,
  /**
   * Sets the attribute expanded to the button
   */
  expand: PropTypes.bool,
  /**
   * Sets the attribute disabled to the button
   */
  disabled: PropTypes.bool,
  /**
   * Activates the loading animation and sets the button to disabled
   */
  loading: PropTypes.bool,
  /**
   * Additional styling applied to the button
   * @ignore
   */
  style: PropTypes.object,
  /**
   * This index used to control focus of Button within a ButtonGroup
   */
  index: PropTypes.number,
};

Button.defaultProps = {
  active: false,
  ariaLabel: '',
  ariaLabelledBy: '',
  containerLarge: false,
  expand: false,
  large: false,
  className: '',
  type: 'button',
  color: '',
  disabled: false,
  loading: false,
  style: {},
  onClick: null,
  tag: 'button',
  label: '',
  children: null,
  href: '',
  circle: false,
  index: null,
};

export default Button;

/**
* @name Default Buttons
* @description Default Button.
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
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}

**/

/**
* @name Large Buttons
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
      <div className='columns small-3'>
        <Button
          children='Test Me'
          onClick={() => {}}
          ariaLabel='For the Win'
          large
        />
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
        <div>Circle Button</div>
        <div className='columns small-3'>
          <Button
            children={<Icon name='icon-search_12' />}
            onClick={() => {}}
            ariaLabel='For the Win'
            circle
          />
        </div>
      </div>
      <div className='row' style={{marginBottom: '1rem'}}>
        <div>Large Circle Button</div>
        <div className='columns small-3'>
          <Button
            children={<Icon name='icon-search_16' />}
            onClick={() => {}}
            ariaLabel='For the Win'
            circle
            large
          />
        </div>
      </div>
    </div>
  );
}
**/
