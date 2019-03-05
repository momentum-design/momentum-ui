import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'example-input-error',
  template: `
    <cui-input
      [(ngModel)]="dataModel"
      inputSize="small-5"
      label="error Label"
      email
      required
      minlength="4"
      maxlength="12"
      [errorObj]="errorObj"
      name="name"
    >
    </cui-input>

    value: {{dataModel}}
  `,
})
export class ExampleInputErrorComponent {

  errorObj = {
    'required': 'This field is required',
    'minlength': 'This field should be more than 8 chars',
    'maxlength': 'This field cant be more than 10 chars',
    'email': "Not a valid email"
  }

  dataModel: string = 'Test';
}
