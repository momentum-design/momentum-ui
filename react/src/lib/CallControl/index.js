import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@collab-ui/react';

/**
 * @category controls
 * @component call-control
 * @variations collab-ui-react
 */

class CallControl extends React.PureComponent {
  render() {
    const {
      active,
      ariaLabel,
      className,
      disabled,
      iconColor,
      iconSize,
      onClick,
      type,
      ...otherHTMLProps
    } = this.props;

    const activeRed = ['camera-muted', 'cancel', 'microphone-muted', 'speaker'];

    const activeBlue = ['camera', 'participant-list', 'share-screen'];

    const getActiveColor = () => {
      switch(true) {
        case(activeRed.includes(type)):
          return 'red';
        case(activeBlue.includes(type)):
          return 'blue';
        default: 
          return 'dark-gray';
      } 
    };

    const getColor = () => (
      active
        ? getActiveColor()
        : 'dark-gray'
    );

    return (
      <Button
        ariaLabel={ariaLabel || type}
        circle
        className={
          'cui-call-control' +
          `${(className && ` ${className}`) || ''}`
        }
        color={type === 'cancel' ? 'red' : getColor()}
        disabled={disabled}
        onClick={onClick}
        {...otherHTMLProps}
      >
        <Icon 
          name={`${type}_${iconSize}`} 
          {...iconColor && { color: iconColor }}
        />
      </Button>
    );
  }
}

CallControl.propTypes = {
  /** @prop Sets active css styling | false */
  active: PropTypes.bool,
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: PropTypes.string,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets the attribute disabled to the CallControl button | false */
  disabled: PropTypes.bool,
  /** @prop Optional icon color prop | $white */
  iconColor: PropTypes.string,
  /** @prop Optional numeric icon size prop | 24 */
  iconSize: PropTypes.number,
  /** @prop Handler to be called when the user taps the CallControl button | null */
  onClick: PropTypes.func,
  /** @prop Optional numeric size prop for CallControl button | 56 */
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** @prop Optional predefined CallControl prop type | '' */
  type: PropTypes.oneOf(['activities', 'camera', 'camera-muted', 'cancel', 'handset', 'microphone-muted', 'more', 'participant-list', 'share-screen', 'speaker', 'view-list']),
};

CallControl.defaultProps = {
  active: false,
  ariaLabel: '',
  className: '',
  disabled: false,
  iconColor: '$white',
  iconSize: 24,
  onClick: null,
  size: 56,
  type: '',
};

CallControl.displayName = 'CallControl';

export default CallControl;

/**
* @component call-control
* @section default
* @react
import { CallControl } from '@collab-ui/react';

export default function CallControlDefault() {
  return(
      <div className='row'>
        <div className="docs-example docs-example--spacing">
          <CallControl
            type='microphone-muted'
            ariaLabel='For the Win'
            size={20}
            iconSize={10}
          />
        </div>

        <div className="docs-example docs-example--spacing">
          <CallControl
            type='microphone-muted'
            ariaLabel='For the Win'
            size={40}
            iconSize={16}
          />
        </div>

        <div className="docs-example docs-example--spacing">
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
* @component call-control
* @section active
* @react
import { CallControl } from '@collab-ui/react';

export default function CallControlActive() {
  return(
    <CallControl
      type='microphone-muted'
      active
      onClick={() => { }}
      ariaLabel='For the Win'
    />
  );
}

**/

/**
* @component call-control
* @section disable
* @react
import { CallControl } from '@collab-ui/react';

export default function CallControlDisabled() {
  return(
    <CallControl
      type='microphone-muted'
      disabled
      onClick={() => { }}
      ariaLabel='For the Win'
    />
  );
}

**/

/**
* @component call-control
* @section cancel
* @react
import { CallControl } from '@collab-ui/react';

export default function CallControlCancel() {
  return(
    <CallControl
      type='cancel'
      active
      onClick={() => {}}
      ariaLabel='For the Win'
    />
  );
}

**/
