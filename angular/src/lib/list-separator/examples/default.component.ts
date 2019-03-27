import { Component } from '@angular/core';

@Component({
  selector: 'example-list-separator-default',
  template: `
    <cui-list-separator></cui-list-separator>

    <cui-list-separator>Text</cui-list-separator>

    <cui-list-separator
      backgroundColor="transparent"
      lineColor="red"
      margin="40px"
      text="Text"
      textColor="orange"
      textPadding="20px"
    ></cui-list-separator>
  `,
})
export class ExampleListSeparatorDefaultComponent {}
