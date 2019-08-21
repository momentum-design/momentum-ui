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
      minlength="8"
      maxlength="25"
      [errorObj]="errorObj"
      name="name"
    >
    </md-input>
  </form>

  Form value: {{ inputForm.value.inputControl }}

  <div>
    <div *ngIf="inputForm.controls['inputControl'].hasError('minlength')">
      Form Validator: Need Min Length of 8
    </div>

    <div *ngIf="inputForm.controls['inputControl'].hasError('maxlength')">
      Form Validator: Max Length should be 16
    </div>

    <div *ngIf="inputForm.controls['inputControl'].hasError('customValid')">
      Form Custom Validator: Doesn't start with 'custom'
    </div>
  </div>
`,
})
export class ExampleInputErrorComponent {
  errorObj = {
    required: 'This field is required',
    minlength: 'This field should be more than 8 chars',
    maxlength: 'This field cant be more than 25 chars',
    email: 'Not a valid email',
    custom: 'Custom Validator Error - input does not start with "custom"', // create custom validator like below
    warning: 'Warning Validator - input does not contain a number' // create warning validator like below
  };

  inputForm;

  constructor(private fb: FormBuilder) {
    // pass the errorObj for built in angular validator styling
    this.inputForm = this.fb.group({
      inputControl: ['', Validators.compose(
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
          ValidateCustom,
          ValidateWarning
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

function ValidateWarning(control: AbstractControl) {
  if (!control.value.match(/\d+/g)) {
    return { warningValid: true };
  }
  return null;
}
