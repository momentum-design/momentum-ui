import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'example-input-clear',
  template: `
    <cui-input
      [(ngModel)]="value"
      inputSize="small-5"
      label="Input with clear"
      [clear]="true"
    >
    </cui-input>
  `,
})
export class ExampleInputClearComponent {
  value: string = 'Text';
}
