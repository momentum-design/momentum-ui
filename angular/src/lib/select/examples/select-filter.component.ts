import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'example-select-filter',
  template: `

  <div class="medium-8 columns">
    <md-select
      [options]="people"
      [(ngModel)]="person"
      filter="true"
      filterMode="contains"
      filterPlaceholder='Search'
      noResultsMessage="0 Results Found"
      placeholder="Select Item Here"
      optionLabel="name"
      [containerStyle]="{width: '100%'}"
      (handleChange)="onChange($event)"
    >
    </md-select>
  </div>

  <p> ngModel: {{person ? person.name : 'none'}} <p>
  `,
  styles: []
})
export class SelectFilterComponent {
  person;
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
