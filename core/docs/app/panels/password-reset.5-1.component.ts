import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Password reset 5.1-->
    <div class="cui-panel cui-panel--form cui-panel--full">
      <div class="cui-panel__main">
        <div class="cui-panel__image">
          <img [src]="panelImage" alt="" />
        </div>
        <div class="cui-panel__title">Reset your password</div>
        <form class="cui-panel__form">
          <div class="cui-input__messages error" style="display: block;">
            <div class="message">These passwords do not match</div>
          </div>
          <div class="cui-input-group">
            <input class="cui-input" id="password" name="password" type="password" placeholder="New password" value="12345678">
            <i class="cui-input__icon--right"></i>
          </div>
          <div class="cui-input-group">
            <input class="cui-input" id="confirm" name="confirm" type="password" placeholder="Confirm password" value="23456789">
            <i class="cui-input__icon--right"></i>
          </div>
          <div class="cui-panel__cta">
            <button class="cui-button cui-button--blue" disabled>Save and sign in</button>
          </div>
        </form>
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
export class PasswordReset51Component {
  public panelImage = require('../../../images/teams-icon.svg');
}
