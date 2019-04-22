import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CheckboxComponent } from '../../checkbox';

@Component({
  selector: 'example-radio-disabled',
  template: `
    <form [formGroup]="radioForm">
      <md-radio
        name="cisco"
        label="value 1"
        value="value 1"
        formControlName="radioControl"
        htmlId="value1"
      >
      </md-radio>

      <md-radio
        name="cisco"
        label="Disabled Radio"
        value="value 2"
        formControlName="radioControl"
        [disabled]="true"
        htmlId="value2"
      >
      </md-radio>
    </form>
  `,
})
export class ExampleRadioDisabledComponent {
  radioForm;

  constructor(private fb: FormBuilder) {
    this.radioForm = this.fb.group({
      radioControl: ['value 1', [Validators.required]],
    });
  }
}
