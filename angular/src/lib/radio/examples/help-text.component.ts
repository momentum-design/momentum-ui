import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'example-radio-helptext',
  template: `
    <form [formGroup]="radioForm">
      <md-radio
        name="cisco"
        label="Value 1"
        value="value 1"
        formControlName="radioControl"
        helpText="Help Text"
        htmlId="value1"
      >
      </md-radio>

      <md-radio
        name="cisco"
        label="Value 2"
        value="value 2"
        formControlName="radioControl"
        helpText="Help Text"
        htmlId="value2"
      >
      </md-radio>
    </form>
  `,
})
export class ExampleRadioHelpTextComponent {
  radioForm;

  constructor(private fb: FormBuilder) {
    this.radioForm = this.fb.group({
      radioControl: ['value 1', [Validators.required]],
    });
  }
}
