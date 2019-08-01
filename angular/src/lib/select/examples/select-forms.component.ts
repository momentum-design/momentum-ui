import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'example-select-reactive-form',
  template: `

  <div class="medium-8 columns">

    <form [formGroup]="inputForm">
      <md-select
        [options]="people"
        formControlName="selectControl"
        placeholder="Select Item Here"
        optionLabel="name"
        [containerStyle]="{width: '100%'}"
        (handleChange)="onChange($event)"
      >
      </md-select>
    </form>

  </div>

   form value: {{ inputForm.value.selectControl.name }}
  `,
  styles: []
})
export class SelectReactiveFormComponent {

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
