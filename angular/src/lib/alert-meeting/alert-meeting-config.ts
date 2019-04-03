import { TemplateRef } from '@angular/core';

export interface AlertMeetingAttendee {
  title: string;
  alt?: string;
  src?: string;
}

// Configuration used when opening an alert.
export class AlertMeetingConfig {
  key?: string;

  /** Optional attendee array. If more than one attendee, a Composite Avatar with only the first 2 attendees is created. */
  attendees?: AlertMeetingAttendee[] = [];

  /** Optional avatar prop | null */
  avatar?: TemplateRef<any>;

  /** Optional aria label for the close button | 'close' */
  closeAriaLabel?: string = 'close';

  /** Optional AlertMeeting Message | '' */
  message: string = '';

  /** Optional aria label for snooze buton | 'snooze' */
  remindAriaLabel?: string = 'snooze';

  /** Optional AlertMeeting status | '' */
  status: string = '';

  /** Optional AlertMeeting title | '' */
  title: string = '';

  /** Optional callback function invoked on click of alert | null */
  onClick?: Function = null;

  /** Optional handler invoked when the user presses on the Alert's close button or hit's the esc key | null */
  onHide?: Function = null;

  /** Optional callback function invoked when the snooze button is clicked | null */
  onSnooze?: Function = null;
}
