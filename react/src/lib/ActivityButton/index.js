import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { Button, Icon } from '@collab-ui/react';

/**
 * @category controls
 * @component activity
 * @variations collab-ui-react
 */

const ActivityButton = props => {
  const {
    type,
    large,
    onClick,
    disabled,
    className,
    ariaLabel,
  } = props;

  return (
    <Button
      className={
        'cui-activity' +
        `${!type.icon && ` cui-activity__${type}` || ''}` +
        `${(large && ' cui-activity--large') || ''}` +
        `${(className && ` ${className}`) || ''}`
      }
      disabled={disabled}
      onClick={onClick}
      ariaLabel={ariaLabel || (!type.icon && type) || ''}
      color={_.get(type, 'color')}
    >
      {type.icon ? type.icon : <Icon name={`${type}${large ? '_36' : '_28'}`}/>}
    </Button>
  );
};

ActivityButton.displayName = 'ActivityButton';

ActivityButton.propTypes = {
  /**
   *  activity prop type
   */
  type: PropTypes.oneOfType([
    PropTypes.oneOf(['chat', 'camera', 'meetings', 'whiteboard', 'files', 'share-screen', 'tasks']),
    PropTypes.shape({
      color: PropTypes.string,
      icon: PropTypes.node.isRequired,
    })
  ]).isRequired,
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
   * Sets the large attribute to the button
   */
  large: PropTypes.bool,
  /**
   * Text to display for blindness accessibility features
   */
  ariaLabel: PropTypes.string,
};

ActivityButton.defaultProps = {
  type: '',
  large: false,
  onClick: null,
  className: '',
  disabled: false,
  ariaLabel: '',
};

export default ActivityButton;

/**
* @name Default ActivityButton
* @description Default ActivityButton.
*
* @category controls
* @component activityButton
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
          onClick={()=>{}}/>
        <ActivityButton
          type='camera'
          onClick={()=>{}}/>
        <ActivityButton
          type='meetings'
          onClick={()=>{}}/>
        <ActivityButton
          type='whiteboard'
          onClick={()=>{}}/>
        <ActivityButton
          type='files'
          onClick={()=>{}}/>
        <ActivityButton
          type='share-screen'
          onClick={()=>{}}/>
        <ActivityButton
          type='tasks'
          onClick={()=>{}}/>
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
* @component activityButton
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
          onClick={()=>{}}/>
        <ActivityButton
          type='camera'
          large
          onClick={()=>{}}/>
        <ActivityButton
          type='meetings'
          large
          onClick={()=>{}}/>
        <ActivityButton
          type='whiteboard'
          large
          onClick={()=>{}}/>
        <ActivityButton
          type='files'
          large
          onClick={()=>{}}/>
        <ActivityButton
          type='share-screen'
          large
          onClick={()=>{}}/>
        <ActivityButton
          type='tasks'
          large
          onClick={()=>{}}/>
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
          onClick={()=>{}}/>
        <ActivityButton
          type={{
            color: 'red',
            icon: <span className='icon icon-keyboard_16'/>
          }}
          onClick={()=>{}}/>
      </div>
    </div>
  );
}

**/
