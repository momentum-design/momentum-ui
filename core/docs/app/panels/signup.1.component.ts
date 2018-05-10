import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign up 1.0-->
    <div class="cui-panel cui-panel--message cui-panel--full">
      <div class="cui-panel__main">
      <img class="cui-panel__image" [src]="panelImage" alt="" />
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
        <div class="cui-panel__footer">
          <img class="footer__logo" [src]="footerLogo" />
        </div>
      </div>
    </div>
  `,
})
export class SignUp1Component {
  public panelImage = require('../../assets/teams-icon.svg');
  public footerLogo = require('../../../images/cisco-webex/lockup/cisco-webex-lockup-blue.svg');
}
