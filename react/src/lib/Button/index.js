import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@collab-ui/react';

/**
 * @category controls
 * @component button
 * @variations collab-ui-react
 */

class Button extends React.PureComponent {
  static displayName = 'Button';

  handleKeyPress = e => {
    const { onClick } = this.props;
    e.preventDefault();
    if (e.which === 32 || e.which === 13) {
      return onClick(e);
    } else if (e.charCode === 32 || e.charCode === 13) {
      return onClick(e);
    }
  };

  render() {
    const {
      active,
      label,
      color,
      expand,
      onClick,
      ariaLabel,
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
      ...otherHTMLProps
    } = this.props;

    const getChildren = () => {
      return (
        [
          <div style={{opacity: `${loading ? 1 : 0}`}} key='child-0'>
            <Loading
              small={circle && !large}/>
          </div>,
          label && <span style={{opacity: `${loading ? 0 : 1}`}} key='child-1'>{label}</span>,
          !loading && children
        ]
      );
    };

    return React.createElement(
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
            onClick: onClick,
            onKeyPress: this.handleKeyPress,
            style: style,
            disabled: disabled || loading,
            alt: ariaLabel || label,
            href: (tag === 'a' && href) || undefined,
            type: tag !== 'a' && type || '',
            role: (tag !== 'button' && 'button') || '',
            'aria-label': ariaLabel || label,
            tabIndex: 0,
            ...otherHTMLProps,
          },
          getChildren()
        );
  }
}

Button.propTypes = {
  /**
   * Text to display inside the button
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Children Nodes to Render inside button
   */
  children: PropTypes.node,
  /**
   * optional circle prop type
   */
  circle: PropTypes.bool,
    /**
   * optional active prop type
   */
  active: PropTypes.bool,
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
};

Button.defaultProps = {
  active: false,
  ariaLabel: null,
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
          label='Test Me'
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
          label='Test Me'
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
          label='Link'
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
          label='Test Me'
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
          label='Test Me'
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
        label='Test Me'
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
          label='Test Me'
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
          label={<Icon name='icon-search_12' />}
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
            label={<Icon name='icon-search_12' />}
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
            label={<Icon name='icon-search_16' />}
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
