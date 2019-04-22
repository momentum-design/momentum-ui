import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'example-radio-nested',
  template: `
    <form [formGroup]="radioForm">
      <md-radio
        name="cisco"
        label="Parent Radio"
        value="Parent"
        formControlName="radioControl"
        (onClick)="fireThis()"
        htmlId="parent"
      >
      </md-radio>

      <md-radio
        name="cisco"
        label="Nested 1"
        value="Nested 1"
        formControlName="radioControl"
        htmlId="Nested1"
        nestedLevel="1"
      >
      </md-radio>

      <md-radio
        name="cisco"
        label="Nested 2"
        value="Nested 2"
        formControlName="radioControl"
        htmlId="Nested2"
        nestedLevel="2"
      >
      </md-radio>

      <md-radio
        name="cisco"
        label="Nested 3"
        value="Nested 3"
        formControlName="radioControl"
        htmlId="Nested3"
        nestedLevel="3"
      >
      </md-radio>
    </form>
  `,
})
export class ExampleRadioNestedComponent {
  radioForm;

  constructor(private fb: FormBuilder) {
    this.radioForm = this.fb.group({
      radioControl: ['Option 2', [Validators.required]],
    });
  }

  fireThis() {
    alert('onClick Hit');
  }
}
