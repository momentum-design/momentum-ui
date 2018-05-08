import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Password Reset 1.0-->
    <div class="cui-panel cui-panel--message cui-panel--full">
      <div class="cui-panel__main">
        <div class="cui-panel__image">
          <img [src]="panelImage" alt="" />
        </div>
        <div class="cui-panel__title">Reset your password</div>
        <div class="cui-panel__message">
          Send a reset password link to barbara@ikea.com
        </div>
        <div class="cui-panel__cta">
          <button class="cui-button cui-button--blue">Send</button>
        </div>
        <div class="cui-panel__secondary-action">
          <a href>
            <i class="icon icon-back_12"></i> Back to Sign In</a>
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
export class PasswordReset1Component {
  public panelImage = require('../../../images/teams-icon.svg');
}
