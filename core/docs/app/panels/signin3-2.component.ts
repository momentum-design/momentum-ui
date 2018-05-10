import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign In 3.2-->
    <div class="cui-panel cui-panel--form cui-panel--full">
      <div class="cui-panel__main">
      <img class="cui-panel__image" [src]="panelImage" alt="" />
      <div class="cui-panel__title ellipsis"><span style="color:#666;">Hello</span> barbara@ikea.com</div>
        <form class="cui-panel__form">
          <div class="cui-input__messages error" style="display:block;">
            <div class="message">You’ve entered an incorrect email address or password</div>
          </div>

          <div class="cui-input-group">
            <input class="cui-input" id="password" name="password" type="password" placeholder="Password">
          </div>
          <div class="cui-panel__cta">
            <button class="cui-button cui-button--blue">Next</button>
          </div>
          <a class="cui-panel__password-link" href>Forgot password?</a>
        </form>
      </div>
      <div class="cui-panel__footer">
        <img class="footer__logo" [src]="footerLogo" />
      </div>
    </div>
  `,
})
export class SignIn32Component {
  public panelImage = require('../../assets/teams-icon.svg');
  public footerLogo = require('../../../images/cisco-webex/lockup/cisco-webex-lockup-blue.svg');
}
