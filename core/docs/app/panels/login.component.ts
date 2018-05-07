import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'docs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public panelImage = require('../../../images/teams-icon.svg');

}
