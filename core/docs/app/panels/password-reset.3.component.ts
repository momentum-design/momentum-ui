import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Password reset 3.0-->
    <div class="cui-panel cui-panel--form cui-panel--full">
      <div class="cui-panel__main">
      <img class="cui-panel__image" [src]="panelImage" alt="" />
      <div class="cui-panel__title">Reset your password</div>
        <form class="cui-panel__form">
          <div class="cui-input-group">
            <input class="cui-input" id="password" name="password" type="password" placeholder="New password">
          </div>
          <div class="cui-input-group">
            <input class="cui-input" id="confirm" name="confirm" type="password" placeholder="Confirm password" disabled>
          </div>
          <div class="cui-panel__cta">
            <button class="cui-button cui-button--blue" disabled>Save and sign in</button>
          </div>
        </form>
      </div>
      <div class="cui-panel__footer">
        <div class="cui-panel__footer">
          <img class="footer__logo" [src]="footerLogo" />
        </div>
      </div>
    </div>
  `,
})
export class PasswordReset3Component {
  public panelImage = require('../../../images/teams-icon.svg');
  public footerLogo = require('../../../images/ciscologo-webex-lockup-blue.svg');
}
