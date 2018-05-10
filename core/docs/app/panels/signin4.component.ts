import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <!-- Sign In 4.0-->
    <div class="cui-panel cui-panel--form cui-panel--full">
      <div class="cui-panel__main">
      <img class="cui-panel__image" [src]="panelImage" alt="" />
      <div class="cui-panel__title">Enter your name</div>
        <div class="cui-panel__message">People you message or call will see this name</div>
        <form class="cui-panel__form">
          <div class="cui-input-group">
            <input class="cui-input" id="name" name="name" type="text" placeholder="First and last name">
          </div>
          <div class="cui-panel__cta">
            <button class="cui-button cui-button--blue">Next</button>
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
export class SignIn4Component {
  public panelImage = require('../../assets/teams-icon.svg');
  public footerLogo = require('../../../images/cisco-webex/lockup/cisco-webex-lockup-blue.svg');
}
