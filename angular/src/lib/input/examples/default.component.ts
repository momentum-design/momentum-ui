import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'example-input-default',
  template: `
    <form [formGroup]="inputForm">
      <md-input-container
        inputSize="small-5"
        label="Default Input"
      >
        <input
          mdInput
          formControlName="inputControl"
          id="example-default-input"
        />
      </md-input-container>
    </form>

    form value: {{ inputForm.value.inputControl }}

    <div *ngIf="inputForm.controls['inputControl'].hasError('minlength')">
      Need Min Length of 10
    </div>

    <div *ngIf="inputForm.controls['inputControl'].hasError('maxlength')">
      Max Length should be 14
    </div>

    <div *ngIf="inputForm.controls['inputControl'].hasError('customValid')">
      Custom Validator: Doesn't start with 'custom'
    </div>

  `,
})

export class ExampleInputDefaultComponent {
  inputForm;

  constructor(private fb: FormBuilder) {

    this.inputForm = this.fb.group({
      inputControl: ['', Validators.compose(
        [ Validators.required,
          Validators.minLength(10),
          Validators.maxLength(14),
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
