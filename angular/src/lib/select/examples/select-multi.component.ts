import { Component } from '@angular/core';

@Component({
  selector: 'example-select-multi',
  template: `
    <div class="medium-8 columns">
      <md-select
        [options]="people"
        [isMulti]="true"
        [(selection)]="selectedPeople"
        dataKey="name"
        (handleChange)="onChange($event)"
        optionLabel="name"
        defaultValue="Select an option">
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


    // Will show selected checkboxes on page load
    this.selectedPeople = [
      {name: 'Kobe Bryant', initial: 'KB'},
      {name: 'Tim Duncan', initial: 'TD'},
      {name: 'Reggie Miller', initial: 'RM'},
    ];

  }

  onChange(e) {
    console.info(e.value);
  }
}
