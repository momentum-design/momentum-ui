import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'example-radio-default',
  template: `
    <form [formGroup]="radioForm">
      <md-radio
        name="cisco"
        label="Option 1"
        value="Option 1"
        formControlName="radioControl"
        (radioClick)="fireThis($event)"
        htmlId="option1"
      >
      </md-radio>

      <md-radio
        name="cisco"
        label="Option 2"
        value="Option 2"
        formControlName="radioControl"
        htmlId="option2"
      >
      </md-radio>

      <md-radio
        name="cisco"
        label="Option 3"
        value="Option 3"
        formControlName="radioControl"
        htmlId="option3"
      >
      </md-radio>
    </form>

    {{ radioForm.value.radioControl }}
  `,
})
export class ExampleRadioDefaultComponent {
  radioForm;

  constructor(private fb: FormBuilder) {
    this.radioForm = this.fb.group({
      radioControl: ['Option 2', [Validators.required]],
    });
  }

  fireThis(e) {
    console.info('click event');
  }
}
