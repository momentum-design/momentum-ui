import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign In 2.0-->
    <div class="cui-panel cui-panel--form cui-panel--full">
      <div class="cui-panel__main">
      <img class="cui-panel__image" [src]="panelImage" alt="" />
      <div class="cui-panel__title">Validating email address</div>
        <div class="cui-panel__spinner"></div>
      </div>
      <div class="cui-panel__footer">
        <img class="footer__logo" [src]="footerLogo" />
      </div>
    </div>
  `,
})
export class SignIn2Component {
  public panelImage = require('../../assets/teams-icon.svg');
  public footerLogo = require('../../../images/cisco-webex/lockup/cisco-webex-lockup-blue.svg');
}
