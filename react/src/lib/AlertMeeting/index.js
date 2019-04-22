/** @component meeting-alert */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  CompositeAvatar,
  Button,
  Icon
} from '@momentum-ui/react';

const AlertMeeting = props => {
  const {
    attendees,
    avatar,
    closeAriaLabel,
    message,
    onClick,
    onHide,
    onSnooze,
    remindAriaLabel,
    show,
    status,
    title,
  } = props;

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

  const handleKeyDown = e => {
    if (
      e.which === 32
      || e.which === 13
      || e.charCode === 32
      || e.charCode === 13
    ) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return (
    show && (
      <div
        className='md-alert md-alert--meeting'
        {
          ...onClick && {
            onClick: onClick,
            onKeyDown: e => handleKeyDown(e),
            role: 'button'
          }
        }
      >
        {renderAvatar()}
        <div
          className={
            'md-alert__content' +
            `${(onSnooze) ? '' : ' md-alert__content--wide'}`
          }
        >
          <div
            className="md-alert__title"
            title={title}
          >
            {title}
          </div>
          <div className="md-alert__status">
            {status}
          </div>
          <div
            className="md-alert__message"
            title={message}
          >
            {message}
          </div>
        </div>
        {onSnooze &&
          <div className='md-alert__button'>
            <Button
              children={<Icon name='alarm_16' />}
              onClick={onSnooze}
              ariaLabel={remindAriaLabel}
              circle
              size={44}
            />
          </div>
        }
        <div className='md-alert__button'>
          <Button
            children={<Icon name='cancel_16' />}
            onClick={onHide}
            ariaLabel={closeAriaLabel}
            circle
            size={44}
          />
        </div>
      </div>
    )
  );
};

AlertMeeting.defaultProps = {
  attendees: [],
  avatar: null,
  closeAriaLabel: 'close',
  message: '',
  onClick: null,
  onHide: null,
  onSnooze: null,
  remindAriaLabel: 'snooze',
  status: '',
  title: '',
};

AlertMeeting.propTypes = {
  /** @prop Optional avatar prop | null */
  avatar: PropTypes.node,
  /** @prop Optional attendee array. If more than one attendee, a Composite Avatar with only the first 2 attendees is created. | null */
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      alt: PropTypes.string,
      src: PropTypes.string,
    })
  ),
    /** @prop Optional aria label for the close button | 'close' */
  closeAriaLabel: PropTypes.string,
  /** @prop Optional callback function invoked on click of alert | null */
  onClick: PropTypes.func,
  /** @prop Mandatory handler invoked when the user presses on the Alert's close button or hit's the esc key | null */
  onHide: PropTypes.func,
  /** @prop Optional callback function invoked when the snooze button is clicked | null */
  onSnooze: PropTypes.func,
  /** @prop Optional AlertMeeting Message | '' */
  message: PropTypes.string,
  /** @prop Optional aria label for snooze buton | 'snooze' */
  remindAriaLabel: PropTypes.string,
  /** @prop Set AlertMeeting visibility */
  show: PropTypes.bool.isRequired,
  /** @prop Optional AlertMeeting status | '' */
  status: PropTypes.string,
  /** @prop Optional AlertMeeting title | '' */
  title: PropTypes.string,
};

AlertMeeting.displayName = 'AlertMeeting';

export default AlertMeeting;
