import { Component } from '@angular/core';

@Component({
  selector: 'example-page-header-static',
  template: `
    <md-page-header title='Momentum' [enableScrollFix]='false'  lead='Hello Description'></md-page-header>
    <div style='height:2000px; width:200px;'>long area</div>
  `
})
export class ExamplePageHeaderStaticComponent {

  constructor() {

  }

}
