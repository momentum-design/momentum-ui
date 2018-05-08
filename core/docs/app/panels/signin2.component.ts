import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign In 2.0-->
    <div class="cui-panel cui-panel--form cui-panel--full">
      <div class="cui-panel__main">
        <div class="cui-panel__image">
          <img [src]="panelImage" alt="" />
        </div>
        <div class="cui-panel__title">Validating email address</div>
        <div class="cui-panel__spinner"></div>
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
export class SignIn2Component {
  public panelImage = require('../../../images/teams-icon.svg');
}
