import { Component } from '@angular/core';

@Component({
  selector: 'example-page-header-default',
  template: `
    <md-page-header title='Momentum' [enableScrollFix]='true'  lead='Hello Description'></md-page-header>
    <div style='height:2000px; width:200px;'>1</div>
  `
})
export class ExamplePageHeaderDefaultComponent {

  constructor() {

  }

}
