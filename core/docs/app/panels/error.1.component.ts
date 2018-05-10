import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Error Notification 1.0-->
    <div class="cui-panel cui-panel--message cui-panel--full">
      <div class="cui-panel__main">
        <img class="cui-panel__image" [src]="panelImage" alt="" />
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
        <div class="cui-panel__footer">
          <img class="footer__logo" [src]="footerLogo" />
        </div>
      </div>
    </div>
  `,
})
export class Error1Component {
  public panelImage = require('../../../images/teams-icon.svg');
  public footerLogo = require('../../../images/ciscologo-webex-lockup-blue.svg');
}
