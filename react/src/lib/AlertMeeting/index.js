import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, AlertContainer, CompositeAvatar, Button, Icon } from '@collab-ui/react';

/**
 * @category communication
 * @component meeting-alert
 * @variations collab-ui-react
 */

const AlertMeeting = props => {
  const { avatar, attendees, show, onHide, onSnooze, title, message, status } = props;

  const renderAvatar = () => {
    if (avatar) {
      return avatar;
    } else {
      if (attendees.length >= 2) {
        return (
          <CompositeAvatar>
            <Avatar
              title={attendees[0].title}
              alt={attendees[0].alt}
              src={attendees[0].src}
            />
            <Avatar
              title={attendees[1].title}
              alt={attendees[1].alt}
              src={attendees[1].src}
            />
          </CompositeAvatar>
        );
      } else if (attendees.length === 1) {
        return (
          <Avatar
            title={attendees[0].title}
            alt={attendees[0].alt}
            src={attendees[0].src}
          />
        );
      } else {
        throw new Error('MeetingAlert needs at least one attendee to render an avatar.');
      }
    }
  };

  return (
    show && (
      <AlertContainer className='cui-alert--meeting'>
        {renderAvatar()}
        <div className={'cui-alert__content'}>
          <div
            className="cui-alert__title"
            title={title}
          >
            {title}
          </div>
          <div className="cui-alert__status">
            {status}
          </div>
          <div
            className="cui-alert__message"
            title={message}
          >
            {message}
          </div>
        </div>
        <div className='cui-alert__button'>
          <Button
            children={<Icon name='alarm_16' />}
            onClick={onSnooze}
            ariaLabel='snooze'
            circle
            large
          />
        </div>
        <div className='cui-alert__button'>
          <Button
            children={<Icon name='cancel_16' />}
            onClick={onHide}
            ariaLabel='close'
            circle
            large
          />
        </div>
      </AlertContainer>
    )
  );
};

AlertMeeting.defaultProps = {
  attendees: [],
  title: '',
  status: '',
  message: '',
  onHide: null,
  onSnooze: null,
  avatar: null
};

AlertMeeting.propTypes = {
  /**
   * optional attendee array.  If more than one attendee, a Composite Avatar will be composed.
   * Only use first two attendees in array will be used, the others will be ignored.
   */
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      alt: PropTypes.string,
      src: PropTypes.string,
    })
  ),
  /**
   * optional AlertMeeting Title
   */
  title: PropTypes.string,
  /**
   * optional AlertMeeting Status
   */
  status: PropTypes.string,
  /**
   * optional AlertMeeting Message
   */
  message: PropTypes.string,
  /**
   * show/hide AlertMeeting.
   */
  show: PropTypes.bool.isRequired,
  /**
   * callback function invoked on close of the Alert. Alert can be closed on click of cross button or esc key.
   * onHide is mandatory props, if not passed Alert can not be closed.
   */
  onHide: PropTypes.func,
  /**
   * callback function invoked when the snooze button is clicked.
   */
  onSnooze: PropTypes.func,
  /**
   * optional avatar prop
   */
  avatar: PropTypes.node
};

AlertMeeting.displayName = 'AlertMeeting';

export default AlertMeeting;

/**
* @name Meeting
* @description Control the avatar type by passing in an array of user data in the attendees prop.
*
* @category communication
* @component alert
* @section meeting
*
* @js

import {
  Button,
  AlertMeeting
} from '@collab-ui/react';

export default class Default extends React.PureComponent {
  state = {
    showAlert: false,
    attendees: []
  }

  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => this.setState({ showAlert: true, attendees: [{title: 'J $'}] })}
              children='Single Attendee'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => this.setState({ showAlert: true, attendees: [{title: 'J $'}, {title: 'J G'}] })}
              children='Multiple Attendees'
              color='primary'
              size='large'
            />
          </div>
          <br />
          <AlertMeeting
            attendees={this.state.attendees}
            show={this.state.showAlert}
            onHide={() => this.setState({ showAlert: false })}
            title='Super Important Meeting'
            status='In 5 minutes'
            message='This meeting will blow your mind!'
          />
        </div>
      </section>
    );
  }
}

**/
