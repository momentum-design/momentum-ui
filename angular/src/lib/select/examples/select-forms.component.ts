import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'example-select-form',
  template: `
    <div class="medium-8 columns">
      <form [formGroup]="inputForm">
        <md-select
          [options]="people"
          formControlName="selectControl"
          (handleChange)="onChange($event)"
          optionLabel="name"
          placeholder="Select an option"
          buttonClass="custom-button-class"
          [buttonStyle]="{width: '80%'}"
          overlayClass="testOverlayClass" >
        </md-select>
      </form>
    </div>

    form value: {{ inputForm.value.selectControl.name }}
  `,
  styles: []
})
export class SelectFormComponent {

  people;
  inputForm;

  constructor(private fb: FormBuilder) {

    this.people = [
      {name: 'John Jones', initial: 'JJ'},
      {name: 'Lebron James', initial: 'LJ'},
      {name: 'Dwayne Wade', initial: 'DW'},
      {name: 'John Paul Jones', initial: 'JPJ'},
      {name: 'Hannah Brown', initial: 'HB'},
      {name: 'Kobe Bryant', initial: 'KB'},
      {name: 'Tim Duncan', initial: 'TD'},
      {name: 'Reggie Miller', initial: 'RM'},
      {name: 'Steph Curry', initial: 'SC'},
      {name: 'Steve Nash', initial: 'SN'},
      {name: 'James Harden', initial: 'JH'}
    ];

    this.inputForm = this.fb.group({
      selectControl: ['', [Validators.required]],
    });

    console.info(this.inputForm);
  }

  onChange(e) {
    console.info(e.value);
  }
}
