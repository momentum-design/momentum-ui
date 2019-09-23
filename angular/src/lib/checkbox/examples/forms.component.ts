import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'example-checkbox-forms',
  template: `

  <form [formGroup]="checkboxForm">
    <md-checkbox-group>
      <md-checkbox
        name="TDG"
        value="val1"
        label="Value 1"
        [formControl]="checkboxForm.controls['checkboxControl']"
        htmlId="val1">
      </md-checkbox>

      <md-checkbox
        name="TDG"
        value="val2"
        label="Value 2"
        [formControl]="checkboxForm.controls['checkboxControl']"
        htmlId="val2">
      </md-checkbox>

      <md-checkbox
        name="TDG"
        value="val3"
        label="Value 3"
        [formControl]="checkboxForm.controls['checkboxControl']"
        htmlId="val3">
      </md-checkbox>
    </md-checkbox-group>
  </form>

   Form Value: {{checkboxForm.value.checkboxControl}}
  `,
})
export class ExampleCheckboxFormsComponent {
  checkboxForm;

  constructor(private fb: FormBuilder) {
    this.checkboxForm = this.fb.group({
      checkboxControl: ['', [Validators.required]],
    });
  }
}
