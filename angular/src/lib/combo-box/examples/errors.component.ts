import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'example-combo-box-error',
  template: `

  <form [formGroup]="inputForm">
    <md-combo-box
      [errors]="findErrors()"
      formControlName="inputControl"
      [options]="options"
      (select)="onSelect($event)"
    >
    </md-combo-box>

    <md-input-message
      *ngIf="inputForm.controls['inputControl'].hasError('required') && inputForm.dirty"
      class="md-input__message md-input__message--error"
    >
      Formbuilder Validator: Required
    </md-input-message>

    <md-input-message
      *ngIf="inputForm.controls['inputControl'].hasError('minlength')"
      class="md-input__message md-input__message--error"
    >
      Formbuilder Validator: Need Min Length of 4
    </md-input-message>

    <md-input-message
      *ngIf="inputForm.controls['inputControl'].hasError('maxlength')"
      class="md-input__message md-input__message--error"
    >
      Formbuilder Validator: Need Max Length of 10
    </md-input-message>
  </form>


    input value: {{ inputForm.value.inputControl }}
    <br>
    Errors: {{ findErrors() ? 'Yes' : 'No'}}
  `,
})
export class ExampleComboBoxErrorsComponent {
  inputForm;
  errorsFound;
  options = ['a', 'ab', 'abc', 'abcd'];

  onSelect(option: Object | string) {
    console.info('selected option: ', option);
  }

  findErrors() {
    if (
      this.inputForm.controls['inputControl'].hasError('minlength') ||
      this.inputForm.controls['inputControl'].hasError('maxlength') ||
      this.inputForm.controls['inputControl'].hasError('required') && this.inputForm.dirty
    ) {
      return true;
    }
    return false;
  }

  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      inputControl: ['', Validators.compose(
        [ Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ]),
      ]
    });
    console.info(this.inputForm);
  }
}
