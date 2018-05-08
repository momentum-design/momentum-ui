import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign up 1.0-->
    <div class="cui-panel cui-panel--message cui-panel--full">
      <div class="cui-panel__main">
        <div class="cui-panel__image">
          <img [src]="panelImage" alt="" />
        </div>
        <div class="cui-panel__title">Check your email</div>
        <div class="cui-panel__message">
          Click the link we’ve sent to catherine@gmail.com
          <br>to activate your account issues.
        </div>
        <div class="cui-panel__secondary-action">Already activated your account
          <a href>Click here</a>
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
export class SignUp1Component {
  public panelImage = require('../../../images/teams-icon.svg');
}
