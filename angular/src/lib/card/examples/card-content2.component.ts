import { Component } from '@angular/core';

@Component({
  selector: 'example-card-content2',
  template: `
    <md-card [ngStyle]="{'width': '400px'}">
      <md-card-section [full]='true'>
      <img src="https://place-hold.it/400x400">
      </md-card-section>
      <md-card-section>
        <h5>PRODUCT ANNOUNCEMENT</h5>
      </md-card-section>
      <md-card-section>
          QWASI Makes Marketing Loyalty Programs Better with Collaboration
      </md-card-section>
      <md-card-section>
          <div class="card-footer">
            <h6>Kevin Smith</h6>
            <h6>June 4, 2018</h6>
          </div>
      </md-card-section>
    </md-card>
  `,
  styles: [
    `
    .card-footer {
      display: flex;
      width: 100%;
      justify-content: space-between;;
    }    `
  ]
})
export class CardContent2Component {}
