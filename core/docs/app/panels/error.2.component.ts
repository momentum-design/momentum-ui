import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Error Notification 2.0-->
    <div class="cui-panel cui-panel--message cui-panel--full">
      <div class="cui-panel__main">
      <img class="cui-panel__image" [src]="panelImage" alt="" />
      <div class="cui-panel__title">Access denied</div>
        <div class="cui-panel__message">
            You must use your work email address to sign into Webex Teams.
        </div>
        <div class="cui-panel__cta">
          <button class="cui-button cui-button--blue">Try a different email address</button>
        </div>
        <div class="cui-panel__secondary-action">
          <a href>Contact Support</a>
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
export class Error2Component {
  public panelImage = require('../../../images/teams-icon.svg');
  public footerLogo = require('../../../images/ciscologo-webex-lockup-blue.svg');
}
