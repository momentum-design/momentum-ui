import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign In 1.0-->
    <div class="cui-panel cui-panel--form cui-panel--full">
    <div class="cui-panel__main">
      <div class="cui-panel__image">
        <img [src]="panelImage" alt="" />
      </div>
      <div class="cui-panel__title">Enter your email address</div>
      <form class="cui-panel__form">
        <div class="cui-input__messages error">
          <div class="message">You’ve entered an invalid email address</div>
        </div>
        <div class="cui-input-group">
          <input class="cui-input" id="email" name="email" type="email" placeholder="Email Address">
          <i class="cui-input__icon--right icon icon-clear-active_18"></i>
        </div>
        <div class="cui-panel__cta">
          <button class="cui-button cui-button--blue" disabled>Next</button>
          <div class="cui-input-group cui-checkbox">
            <input type="checkbox" class="cui-input cui-checkbox__input">
            <label class="cui-checkbox__label">
              <span>Remember me</span>
            </label>
          </div>
        </div>
      </form>
      <div class="cui-panel__secondary-action">
        Need help signing in?
        <a href>Contact Support</a>
      </div>
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
export class SignIn1Component {
  public panelImage = require('../../../images/cisco-webex-wordmark-black.svg');
}
