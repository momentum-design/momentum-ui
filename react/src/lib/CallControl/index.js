import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@collab-ui/react';

/**
 * @category controls
 * @component callControl
 * @variations collab-ui-react
 */

class CallControl extends React.PureComponent {
  static displayName = 'CallControl';

  render() {
    const {
      active,
      type,
      onClick,
      disabled,
      className,
      ariaLabel,
    } = this.props;

    return (
      <Button
        className={
          'cui-call-control' +
          `${(type === 'cancel' && ` cui-call-control--cancel`) || ''}`+
          `${(active && ` cui-call-control--active`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        disabled={disabled}
        onClick={onClick}
        ariaLabel={ariaLabel || type}
      >
        <span className={`icon icon-${type}_24`}/>
      </Button>
    );
  }
}

CallControl.propTypes = {
  /**
   * optional call control prop type
   */
  type: PropTypes.oneOf(['microphone-muted', 'cancel', 'camera-muted', 'share-screen', 'speaker']),
  /**
   * Handler to be called when the user taps the button
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   * optional css class string
   */
  className: PropTypes.string,
  /**
   * Sets the attribute disabled to the button
   */
  disabled: PropTypes.bool,
  /**
   * Sets the active state for the button
   */
  active: PropTypes.bool,
  /**
   * Text to display for blindness accessibility features
   */
  ariaLabel: PropTypes.string,
};

CallControl.defaultProps = {
  type: '',
  onClick: null,
  className: '',
  disabled: false,
  active: false,
  ariaLabel: '',
};

export default CallControl;

/**
* @name Default Call-Control
* @description Default Call-Control.
*
* @category controls
* @component callControl
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
          onClick={() => {}}
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
* @component callControl
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
* @component callControl
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
* @component callControl
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
