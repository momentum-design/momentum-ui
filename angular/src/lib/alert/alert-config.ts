export type AlertPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type AlertType = 'info' | 'success' | 'warning' | 'error';

/**
 * Configuration used when opening an alert.
 */
export class AlertConfig {
  key?: string;

  ariaLabel?: string = 'Close';

  /** To show/hide Close button of the Alert | true */
  closable?: boolean = true;

  /** Optional Alert message | '' */
  message?: string = '';

  /** Handler invoked when the user presses on the Alert's close button | null */
  onHide?: Function = null;

  /** Display newest alert messages first | true */
  orderNewest?: boolean = true;

  /** Define alert's position with css class name: 'bottom-right' */
  position?: AlertPosition = 'bottom-right';

  /** Optional Alert title | '' */
  title?: string = '';

  /** Sets the type of the Alert | 'info' */
  type?: AlertType = 'info';

}
