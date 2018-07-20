import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@collab-ui/react';

/**
 * @category controls
 * @component call-control
 * @variations collab-ui-react
 */

class CallControl extends React.PureComponent {
  static displayName = 'CallControl';

  render() {
    const {
      active,
      ariaLabel,
      className,
      disabled,
      onClick,
      type,
      ...otherHTMLProps
    } = this.props;

    return (
      <Button
        ariaLabel={ariaLabel || type}
        circle
        className={
          'cui-call-control' +
          `${(type === 'cancel' && ` cui-call-control--cancel`) || ''}`+
          `${(active && ` cui-call-control--active`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        disabled={disabled}
        onClick={onClick}
        {...otherHTMLProps}
      >
        <Icon name={`${type}_24`} />
      </Button>
    );
  }
}

CallControl.propTypes = {
  /**
   * Sets the active state for the button
   */
  active: PropTypes.bool,
  /**
   * Text to display for blindness accessibility features
   */
  ariaLabel: PropTypes.string,
  /**
   * optional css class string
   */
  className: PropTypes.string,
  /**
   * Sets the attribute disabled to the button
   */
  disabled: PropTypes.bool,
  /**
   * Handler to be called when the user taps the button
   */
  onClick: PropTypes.func,
  /**
   * Optional size prop for circular button
   */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * optional call control prop type
   */
  type: PropTypes.oneOf(['microphone-muted', 'cancel', 'camera-muted', 'share-screen', 'speaker']),
};

CallControl.defaultProps = {
  active: false,
  ariaLabel: '',
  className: '',
  disabled: false,
  onClick: null,
  size: 56,
  type: '',
};

export default CallControl;

/**
* @name Default Call-Control
* @description Default Call-Control.
*
* @category controls
* @component call-control
* @section default
*
* @js

export default function CallControlDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div className='columns small-3'>
        <CallControl
          type='microphone-muted'
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}

**/

/**
* @name Call-Control with active
* @description Call control with active class.
*
* @category controls
* @component call-control
* @section active
*
* @js

export default function CallControlActive() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div className='columns small-3'>
        <CallControl
          type='microphone-muted'
          active
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}

**/

/**
* @name Call-Control with disable
* @description Call-Control with disabled class.
*
* @category controls
* @component call-control
* @section disable
*
* @js

export default function CallControlDisabled() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div className='columns small-3'>
        <CallControl
          type='microphone-muted'
          disabled
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}

**/

/**
* @name Call-Control cancel
* @description Call-Control with cancel class.
*
* @category controls
* @component call-control
* @section cancel
*
* @js

export default function CallControlCancel() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div className='columns small-3'>
        <CallControl
          type='cancel'
          onClick={() => {}}
          ariaLabel='For the Win'
        />
      </div>
    </div>
  );
}

**/
