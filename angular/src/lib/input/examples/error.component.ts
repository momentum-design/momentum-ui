import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'example-input-error',
  template: `
    <form [formGroup]="inputForm">
      <md-input-container
        inputSize="small-5"
        label="Error Label"
      >
        <input
          mdInput
          formControlName="inputControl"
          email
          required
          minlength="4"
          maxlength="12"
        />
        <md-input-message *ngIf="inputForm.controls['inputControl'].hasError('minlength')">
          Formbuilder Validator:  Need Min Length of 8
        </md-input-message>

        <md-input-message *ngIf="inputForm.controls['inputControl'].hasError('maxlength')">
          Formbuilder Validator: Max Length should be 14
        </md-input-message>

        <md-input-message *ngIf="inputForm.controls['inputControl'].hasError('customValid')">
          Custom Validator: Doesn't start with 'custom'
        </md-input-message>
      </md-input-container>

    </form>

    input value: {{ inputForm.value.inputControl }}
  `,
})

export class ExampleInputErrorComponent {
  dataModel: string = 'Test';

  inputForm;

    constructor(private fb: FormBuilder) {

    // can pass just the messageArr for built in component validation styling OR pass Validators like below to make your own

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
