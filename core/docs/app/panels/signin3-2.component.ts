import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign In 3.2-->
    <div class="cui-panel cui-panel--form cui-panel--full">
      <div class="cui-panel__main">
        <div class="cui-panel__image">
          <img [src]="panelImage" alt="" />
        </div>
        <div class="cui-panel__title ellipsis">Hello vichai.iamsirithanakorn@somelargecompanyname.com</div>
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
        <div class="footer__logo">
          <i class="icon icon-cisco-logo"></i>
        </div>
        <div class="footer__copyright">By using Webex Teams you accept the
          <a href>Terms of Service, Privacy Statement, Notices & Disclaimers. Learn more about</a> Webex Teams.</div>
      </div>
    </div>
  `,
})
export class SignIn32Component {
  public panelImage = require('../../../images/teams-icon.svg');
}
