import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'example-input-default',
  template: `
    <form [formGroup]="inputForm">
      <md-input
        formControlName="inputControl"
        inputSize="small-5"
        label="Default Input"
      >
      </md-input>
    </form>

    form value: {{ inputForm.value.inputControl }}
  `,
})
export class ExampleInputDefaultComponent {
  dataModel: string = 'Test';

  inputForm;

  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      inputControl: ['', [Validators.required]],
    });

    console.info(this.inputForm);
  }
}
