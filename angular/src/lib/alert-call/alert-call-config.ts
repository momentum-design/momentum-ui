import { TemplateRef } from '@angular/core';
import { AlertCallDevice } from './device-list-call.component';

export type AlertCallerType = '' | 'number' | 'device';

export interface AlertCaller {
  title: string;
  alt?: string;
  src?: string;
  type?: AlertCallerType;
}

// Configuration used when opening an alert.
export class AlertCallConfig {
  key?: string;

  /** Optional avatar prop | null */
  avatar?: TemplateRef<any>;

  /** Required caller object */
  caller: AlertCaller;

  /** Optional default selected device by index or value | 0 */
  defaultSelectedDevice?: string | number | object | any[] = 0;

  /** Optional header string for device selection list | "Device selection" */
  deviceListHeader?: string = 'Device selection';

  /** Optional list of devices to answer call with | [] */
  devices?: AlertCallDevice[] = [];

  /** Callback function invoked when the share button is clicked | null */
  onAnswerShare?: Function;

  /** Callback function invoked when the video button is clicked | null */
  onAnswerVideo?: Function;

  /** Callback function invoked when the handset button is clicked | null */
  onAnswerVoice?: Function;

  /** Optional callback function when device is selected | null */
  onDeviceSelect?: Function;

  /** Callback function invoked when the reject button is clicked | null */
  onReject?: Function;

  /** Optional aria-label reject message | 'reject call' */
  rejectAriaLabel?: string = 'reject call';

  /** Optional aria-label share | 'answer call with share' */
  shareAriaLabel?: string = 'answer call with share';

  /** Optional title of AlertCall | '' */
  title?: string = '';

  /** Optional aria-label video | 'answer call with voice and video' */
  videoAriaLabel?: string = 'answer call with voice and video';

  /** Optional aria-label voice | 'answer call with voice only' */
  voiceAriaLabel?: string = 'answer call with voice only';
}
