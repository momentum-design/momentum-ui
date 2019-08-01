import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'example-select-multi',
  template: `

  <div class="medium-8 columns">
    <md-select
      [options]="people"
      [isMulti]="true"
      dataKey="name"
      [(selection)]="selectedPeople"
      placeholder="Select Item Here"
      optionLabel="name"
      [containerStyle]="{width: '100%'}"
      (handleChange)="onChange($event)"
    >
    </md-select>

  </div>

  <div class="medium-4 columns">
    <ul>
      <li *ngFor="let person of selectedPeople" style="text-align: left">
        {{person ? person.name : ''}}
      </li>
    </ul>
  </div>

  `,
  styles: []
})
export class SelectMultiComponent {

  people;
  selectedPeople;
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

    this.selectedPeople = [
      {name: 'Kobe Bryant', initial: 'KB'},
      {name: 'Tim Duncan', initial: 'TD'},
      {name: 'Reggie Miller', initial: 'RM'},
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
