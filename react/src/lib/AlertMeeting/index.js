import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  CompositeAvatar,
  Button,
  Icon
} from '@collab-ui/react';

/**
 * @category communication
 * @component meeting-alert
 * @variations collab-ui-react
 */

const AlertMeeting = props => {
  const { avatar, attendees, show, onHide, onSnooze, onClick, title, message, status } = props;

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
      <div
        className='cui-alert cui-alert--meeting'
        onClick={onClick}
      >
        {renderAvatar()}
        <div
          className={
            'cui-alert__content' +
            `${(onSnooze) ? '' : ' cui-alert__content--wide'}`
          }
        >
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
        {onSnooze &&
          <div className='cui-alert__button'>
            <Button
              children={<Icon name='alarm_16' />}
              onClick={onSnooze}
              ariaLabel='snooze'
              circle
              large
            />
          </div>
        }
        <div className='cui-alert__button'>
          <Button
            children={<Icon name='cancel_16' />}
            onClick={onHide}
            ariaLabel='close'
            circle
            large
          />
        </div>
      </div>
    )
  );
};

AlertMeeting.defaultProps = {
  avatar: null,
  attendees: [],
  title: '',
  status: '',
  message: '',
  onHide: null,
  onSnooze: null,
  onClick: null
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
   * optional callback function invoked when the snooze button is clicked.
   */
  onSnooze: PropTypes.func,
  /**
   * optional avatar prop
   */
  avatar: PropTypes.node,
  /**
   * optional callback function invoked on click of alert
   */
  onClick: PropTypes.func
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
  AlertMeeting,
  AlertMeetingContainer
} from '@collab-ui/react';
import {
  uniqueId,
  reject
} from 'lodash';

export default class Default extends React.PureComponent {
  state = {
    alertList: []
  }

  handleOnHide = key => {
    console.log(`onHide ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  handleOnSnooze = key => {
    console.log(`onSnooze ${key}`);
    this.setState(state => {
      return { alertList: reject(state.alertList, {key}) };
    });
  }

  renderSingleAttendeeMeeting = () => {
    const key = uniqueId('meeting_alert_');
    return (
      <AlertMeeting
        key={key}
        title='Important Meeting'
        status='In 5 mins.'
        message='This is important'
        onHide={() => this.handleOnHide(key)}
        onSnooze={() => this.handleOnSnooze(key)}
        attendees={[{title: 'J $'}]}
        show
      />
    );
  }

  renderMultipleAttendeeMeeting = () => {
    const key = uniqueId('meeting_alert_');
    return (
      <AlertMeeting
        key={key}
        title='Important Meeting'
        status='In 5 mins.'
        message='This is important'
        onHide={() => this.handleOnHide(key)}
        onSnooze={() => this.handleOnSnooze(key)}
        attendees={[{title: 'J $'}, {title: 'Jefe Guadelupe'}]}
        show
      />
    );
  }

  render() {
    return (
      <section>
        <div>
          <div className='row'>
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderSingleAttendeeMeeting()]
                }));
              }}
              children='Single Attendee'
              color='primary'
              size='large'
            />
          </div>
          <div className='row'>
            <br />
            <Button
              ariaLabel='Click to Open'
              onClick={() => {
                this.setState(state => ({
                  alertList: [...state.alertList, this.renderMultipleAttendeeMeeting()]
                }));
              }}
              children='Multiple Attendees'
              color='primary'
              size='large'
            />
          </div>
          <br />
          <AlertMeetingContainer
            alertList={this.state.alertList}
          />
        </div>
      </section>
    );
  }
}

**/
