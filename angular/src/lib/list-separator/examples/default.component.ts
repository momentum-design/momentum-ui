import { Component } from '@angular/core';

@Component({
  selector: 'example-list-separator-default',
  template: `
    <md-list-separator></md-list-separator>

    <md-list-separator>Text</md-list-separator>

    <md-list-separator
      backgroundColor="transparent"
      lineColor="red"
      margin="40px"
      text="Text"
      textColor="orange"
      textPadding="20px"
    ></md-list-separator>
  `,
})
export class ExampleListSeparatorDefaultComponent {}
