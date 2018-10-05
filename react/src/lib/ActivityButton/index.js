import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Button, Icon } from '@collab-ui/react';

/**
 * @category controls
 * @component activity-button
 * @variations collab-ui-react
 */

const ActivityButton = props => {
  const {
    ariaLabel,
    className,
    disabled,
    large,
    onClick,
    type,
    ...otherHTMLProps
  } = props;

  return (
    <Button
      ariaLabel={ariaLabel || (!type.icon && type) || ''}
      circle
      className={
        'cui-activity' +
        `${!type.icon && ` cui-activity__${type}` || ''}` +
        `${(className && ` ${className}`) || ''}`
      }
      color={get(type, 'color')}
      disabled={disabled}
      onClick={onClick}
      {...large
        ? { size: 84, containerLarge: true }
        : { size: 68 }
      }
      {...otherHTMLProps}
    >
      {type.icon ? type.icon : <Icon name={`${type}${large ? '_36' : '_28'}`} />}
    </Button>
  );
};

ActivityButton.displayName = 'ActivityButton';

ActivityButton.propTypes = {
  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: PropTypes.string,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets the attribute disabled to the button | false */
  disabled: PropTypes.bool,
  /** @prop Sets the large attribute to the button | false */
  large: PropTypes.bool,
  /** @prop Handler to be called when the user taps the button | null */
  onClick: PropTypes.func,
  /** @prop Sets the button's activity type */
  type: PropTypes.oneOfType([
    PropTypes.oneOf(['chat', 'camera', 'meetings', 'whiteboard', 'files', 'share-screen', 'tasks']),
    PropTypes.shape({
      color: PropTypes.string,
      icon: PropTypes.element.isRequired,
    })
  ]).isRequired,
};

ActivityButton.defaultProps = {
  ariaLabel: '',
  className: '',
  disabled: false,
  large: false,
  onClick: null,
  type: '',
};

export default ActivityButton;

/**
* @name Default Activity Button
* @description Default Activity Button.
*
* @category controls
* @component activity-button
* @section default
*
* @js

export default function ActivityButtonDefault() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div style={{margin: `16px`}}>
        <ActivityButton
          type='chat'
          ariaLabel='jlshjksfghjl'
          onClick={()=>{}}
          label='Chat'
        />
        <ActivityButton
          type='camera'
          onClick={()=>{}}
          label='Camera'
        />
        <ActivityButton
          type='meetings'
          onClick={()=>{}}
          label='Meetings'
        />
        <ActivityButton
          type='whiteboard'
          onClick={()=>{}}
          label='Whiteboard'
        />
        <ActivityButton
          type='files'
          onClick={()=>{}}
          label='Files'
        />
        <ActivityButton
          type='share-screen'
          onClick={()=>{}}
          label='Share'
        />
        <ActivityButton
          type='tasks'
          onClick={()=>{}}
          label='Tasks'
        />
      </div>
    </div>
  );
}

**/

/**
* @name ActivityButton with large
* @description ActivityButton with large class.
*
* @category controls
* @component activity-button
* @section large
*
* @js

export default function ActivityButtonLarge() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div style={{margin: `16px`}}>
        <ActivityButton
          type='chat'
          large
          onClick={()=>{}}
          label='Chat'
          ariaLabel='Chat'
        />
        <ActivityButton
          type='camera'
          large
          onClick={()=>{}}
          label='Camera'
          ariaLabel='Camera'
        />
        <ActivityButton
          type='meetings'
          large
          onClick={()=>{}}
          label='Meetings'
          ariaLabel='Meetings'
        />
        <ActivityButton
          type='whiteboard'
          large
          onClick={()=>{}}
          label='Whiteboard'
          ariaLabel='Whiteboard'
        />
        <ActivityButton
          type='files'
          large
          onClick={()=>{}}
          label='Files'
          ariaLabel='Files'
        />
        <ActivityButton
          type='share-screen'
          large
          onClick={()=>{}}
          label='Share'
          ariaLabel='Share'
        />
        <ActivityButton
          type='tasks'
          large
          onClick={()=>{}}
          label='Tasks'
          ariaLabel='Tasks'
          title='tasks'
        />
      </div>
    </div>
  );
}

**/

/**
* @name ActivityButton with custom
* @description ActivityButton with custom prop.
*
* @category controls
* @component activityButton
* @section custom
*
* @js

export default function ActivityButtonCustom() {
  return(
    <div className='row' style={{marginBottom: '1rem'}}>
      <div>Default</div>
      <div style={{margin: `16px`}}>
        <ActivityButton
          type={{
            color: 'mint',
            icon: <span className='icon icon-arrow-left_32'/>
          }}
          large
          onClick={()=>{}}
          ariaLabel='Left Arrow'
        />
        <ActivityButton
          type={{
            color: 'red',
            icon: <span className='icon icon-keyboard_16'/>
          }}
          onClick={()=>{}}
          ariaLabel='Keyboard'
        />
      </div>
    </div>
  );
}

**/
