import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Error Notification 2.0-->
    <div class="cui-panel cui-panel--message cui-panel--full">
      <div class="cui-panel__main">
      <i class="cui-panel__image icon icon-warning_100"></i>
      <div class="cui-panel__title">Not Found</div>
        <div class="cui-panel__message">
          The page you requested cannot be found.
        </div>
        <div class="cui-panel__cta">
          <button class="cui-button cui-button--blue">Go Back to the previous page</button>
        </div>
        <div class="cui-panel__secondary-action">
          <a href>Contact Support</a>
        </div>
      </div>
      <div class="cui-panel__footer">
        <div class="footer__logo">
          <i class="icon icon-cisco-logo"></i>
        </div>
        <div class="footer__copyright">&copy; 2018 Cisco and/or affiliates. All rights reserved.</div>
      </div>
    </div>
  `,
})
export class Error3Component {
  public panelImage = require('../../../images/cisco-webex/wordmark/cisco-webex-wordmark-black.svg');
}
