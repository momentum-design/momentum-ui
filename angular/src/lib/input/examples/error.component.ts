import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'example-input-error',
  template: `

  <form [formGroup]="inputForm">

    <md-input
      formControlName="inputControl"
      inputSize="small-5"
      label="error Label"
      email
      required
      minlength="4"
      maxlength="12"
      [errorObj]="errorObj"
      name="name"
    >
    </md-input>

  </form>

  input value: {{ inputForm.value.inputControl }}

    <div *ngIf="inputForm.controls['inputControl'].hasError('minlength')">
      Formbuilder Validator:  Need Min Length of 8
    </div>

    <div *ngIf="inputForm.controls['inputControl'].hasError('maxlength')">
      Formbuilder Validator: Max Length should be 14
    </div>

      <div *ngIf="inputForm.controls['inputControl'].hasError('customValid')">
      Custom Validator: Doesn't start with 'custom'
    </div>
  `,
})
export class ExampleInputErrorComponent {
  errorObj = {
    required: 'This field is required',
    minlength: 'This field should be more than 8 chars',
    maxlength: 'This field cant be more than 14 chars',
    email: 'Not a valid email',
    custom: 'Custom Validator Error Message' // create a custom validator to work
  };

  dataModel: string = 'Test';

  inputForm;

    constructor(private fb: FormBuilder) {

    // can pass just the errorObj for built in component validation styling OR pass Validators like below to make your own

    this.inputForm = this.fb.group({
      inputControl: ['', Validators.compose(
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          ValidateCustom
        ]),
      ]
    });

    console.info(this.inputForm);
  }
}

function ValidateCustom(control: AbstractControl) {
  if (!control.value.startsWith('custom')) {
    return { customValid: true };
  }
  return null;
}
