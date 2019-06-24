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
    className,
    closeAriaLabel,
    closeBtnProps,
    message,
    onClick,
    onKeyDown,
    onHide,
    onSnooze,
    remindAriaLabel,
    show,
    snoozeBtnProps,
    status,
    title,
    ...otherProps
  } = props;

  const renderAvatar = () => {
    if (avatar) {
      return avatar;
    } else {
      if (attendees.length >= 2) {
        return (
          <CompositeAvatar>
            <Avatar
              alt={attendees[0].alt}
              src={attendees[0].src}
              title={attendees[0].title}
              {...attendees[0].props}
            />
            <Avatar
              alt={attendees[1].alt}
              src={attendees[1].src}
              title={attendees[1].title}
              {...attendees[1].props}
            />
          </CompositeAvatar>
        );
      } else if (attendees.length === 1) {
        return (
          <Avatar
            alt={attendees[0].alt}
            src={attendees[0].src}
            title={attendees[0].title}
          {...attendees[0].props}
          />
        );
      } else {
        throw new Error('AlertMeeting needs at least one attendee to render an avatar.');
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

    onKeyDown && onKeyDown(e);
  };

  return (
    show && (
      <div
        className={
          'md-alert md-alert--meeting' +
          `${(className && ` ${className}`) || ''}`
        }
        {
          ...onClick && { onClick }
        }
        {
          ...(onClick || onKeyDown) && {
            onKeyDown: e => handleKeyDown(e),
            role: 'button'
          }
        }
        {...otherProps}
      >
        {renderAvatar()}
        <div
          className={
            'md-alert__content' +
            `${(onSnooze) ? '' : ' md-alert__content--wide'}`
          }
        >
          <div
            className='md-alert__title'
            title={title}
          >
            {title}
          </div>
          <div className='md-alert__status'>
            {status}
          </div>
          <div
            className='md-alert__message'
            title={message}
          >
            {message}
          </div>
        </div>
        {onSnooze &&
          <div className='md-alert__button'>
            <Button
              ariaLabel={remindAriaLabel}
              circle
              onClick={onSnooze}
              size={44}
              {...snoozeBtnProps}
            >
              <Icon name='alarm_16' />
            </Button>
          </div>
        }
        <div className='md-alert__button'>
          <Button
            ariaLabel={closeAriaLabel}
            circle
            onClick={onHide}
            size={44}
            {...closeBtnProps}
          >
            <Icon name='cancel_16' />
          </Button>
        </div>
      </div>
    )
  );
};

AlertMeeting.defaultProps = {
  attendees: [],
  avatar: null,
  className: '',
  closeAriaLabel: 'close',
  closeBtnProps: null,
  message: '',
  onClick: null,
  onKeyDown: null,
  onHide: null,
  onSnooze: null,
  remindAriaLabel: 'snooze',
  snoozeBtnProps: null,
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
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Optional aria label for the close button | 'close' */
  closeAriaLabel: PropTypes.string,
  /** @prop Props to be passed to close button | null */
  closeBtnProps: PropTypes.object,
  /** @prop Optional callback function invoked on click of alert | null */
  onClick: PropTypes.func,
  /** @prop Optional callback function invoked on keydown on alert | null */
  onKeyDown: PropTypes.func,
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
  /** @prop Props to be passed to snooze button | null */
  snoozeBtnProps: PropTypes.object,
  /** @prop Optional AlertMeeting status | '' */
  status: PropTypes.string,
  /** @prop Optional AlertMeeting title | '' */
  title: PropTypes.string,
};

AlertMeeting.displayName = 'AlertMeeting';

export default AlertMeeting;
