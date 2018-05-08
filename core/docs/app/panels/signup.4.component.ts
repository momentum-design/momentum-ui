import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign up 4.0-->
    <div class="cui-panel cui-panel--message cui-panel--full">
      <div class="cui-panel__main">
        <div class="cui-panel__image">
          <img [src]="panelImage" alt="" />
        </div>
        <div class="cui-panel__title">Success</div>
        <div class="cui-panel__message">
          Your account is ready to use
        </div>
        <div class="cui-panel__cta">
          <button class="cui-button cui-button--blue">Start Webex Teams</button>
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
export class SignUp4Component {
  public panelImage = require('../../../images/teams-icon.svg');
}
