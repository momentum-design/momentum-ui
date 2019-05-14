import { Component } from '@angular/core';

@Component({
  selector: 'example-card-default',
  template: `
    <md-card class="small-3 columns">
      <md-card-section>
         <div>
            <h4>Title</h4>
            <h6>Subtitle</h6>
        </div>
      </md-card-section>
      <md-card-section [full]='true'>
      <img src="https://place-hold.it/500x300">
      </md-card-section>
      <md-card-section>
        Content
      </md-card-section>
      <md-card-section>FOOTER</md-card-section>
    </md-card>
  `,
  styles: []
})
export class CardDefaultComponent  { }
