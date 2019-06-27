import { Component } from '@angular/core';

@Component({
  selector: 'example-card-clickable',
  template: `
    <md-card [ngStyle]="{'width': '300px'}" clickable="true" (cardClicked)="onClick();">
      <md-card-section class="header">
        <div class="avatar-title">
            <md-avatar
              title="Barbara"
              size="30"
              src="http://react.collab-ui.com/barbara.png"
            ></md-avatar>
            <div class="headline">
                <h4>Title</h4>
                <h6>Subtitle</h6>
            </div>
        </div>
        <div class="totheRight">
            <md-icon name="more-adr"></md-icon>
        </div>
      </md-card-section>
      <md-card-section [full]='true'>
        <img src="https://place-hold.it/400x400">
      </md-card-section>
      <md-card-section>
        Et netus et malesuada fames ac turpis egestas macecenas. Adipisccing at in tellus integer.
      </md-card-section>
    </md-card>
  `,
  styles: [
    `
    .header{
      display: flex;
      justify-content: space-between;
    }
    .avatar-title{
      display: flex;
    }
    .headline{
      padding-left: 16px;
    }
    .card-footer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: baseline;
    }
    .footer-link {
      margin-right: 16px;
    }
    `
  ]
})
export class CardClickableComponent {
  onClick() {
    alert('Card Clicked!');
  }

}
