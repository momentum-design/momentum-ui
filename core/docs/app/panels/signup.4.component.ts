import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign up 4.0-->
    <div class="cui-panel cui-panel--message cui-panel--full">
      <div class="cui-panel__main">
      <img class="cui-panel__image" [src]="panelImage" alt="" />
      <div class="cui-panel__title">Success</div>
        <div class="cui-panel__message">
          Your account is ready to use
        </div>
        <div class="cui-panel__cta">
          <button class="cui-button cui-button--blue">Start Webex Teams</button>
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
export class SignUp4Component {
  public panelImage = require('../../assets/teams-icon.svg');
  public footerLogo = require('../../../images/cisco-webex/lockup/cisco-webex-lockup-blue.svg');
}
