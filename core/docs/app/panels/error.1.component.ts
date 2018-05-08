import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Error Notification 1.0-->
    <div class="cui-panel cui-panel--message cui-panel--full">
      <div class="cui-panel__main">
        <div class="cui-panel__image">
          <img [src]="panelImage" alt="" />
        </div>
        <div class="cui-panel__title">Can’t sign in right now</div>
        <div class="cui-panel__message">
          Our server is having temporary issues.
          <br>Please try again later.
        </div>
        <div class="cui-panel__secondary-action">
          <a href>Contact Support</a>
        </div>
      </div>
      <div class="cui-panel__footer">
        <div class="footer__logo">
          <i class="icon icon-cisco-logo"></i>
        </div>
        <div class="footer__copyright">By using Webex Teams you accept the
          <a href>Terms of Service, Privacy Statement, Notices & Disclaimers. Learn more about</a> Webex Teams.</div>
      </div>
    </div>
  `,
})
export class Error1Component {
  public panelImage = require('../../../images/teams-icon.svg');
}
