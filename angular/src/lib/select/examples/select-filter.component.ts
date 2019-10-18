import { Component } from '@angular/core';

@Component({
  selector: 'example-select-filter',
  template: `
    <div class="medium-8 columns">
      <md-select
        [options]="people"
        [(ngModel)]="person"
        (handleChange)="onChange($event)"
        optionLabel="name"
        placeholder="Select an option"
        filter="true"
        filterMode="contains"
        filterPlaceholder='Search'
        [buttonStyle]="{width: '80%'}"
        overlayClass="testOverlayClass">
      </md-select>
    </div>

    <p> ngModel: {{person ? person.name : 'none'}} <p>
  `,
  styles: []
})
export class SelectFilterComponent {

  person;
  people;

  constructor() {
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
  }

  onChange(e) {
    console.info(e.value);
  }
}
