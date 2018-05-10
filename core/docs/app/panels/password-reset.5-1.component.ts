import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Password reset 5.1-->
    <div class="cui-panel cui-panel--form cui-panel--full">
      <div class="cui-panel__main">
      <img class="cui-panel__image" [src]="panelImage" alt="" />
      <div class="cui-panel__title">Reset your password</div>
        <form class="cui-panel__form">
          <div class="cui-input__messages error" style="display: block;">
            <div class="message">These passwords do not match</div>
          </div>
          <div class="cui-input-group">
            <input class="cui-input" id="password" name="password" type="password" placeholder="New password" value="12345678">
          </div>
          <div class="cui-input-group">
            <input class="cui-input" id="confirm" name="confirm" type="password" placeholder="Confirm password" value="23456789">
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
export class PasswordReset51Component {
  public panelImage = require('../../assets/teams-icon.svg');
  public footerLogo = require('../../../images/cisco-webex/lockup/cisco-webex-lockup-blue.svg');
}
