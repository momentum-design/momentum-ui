import { Component } from '@angular/core';

@Component({
  selector: 'example-select-multi-filter',
  template: `
  <div class="medium-8 columns">
    <md-select
      [options]="data"
      isMulti="true"
      filter="true"
      filterBy='name,delete'
      [(selection)]="selectedPeople"
      dataKey="name"
      (handleChange)="onChange($event)"
      [buttonStyle]="{width: '80%'}"
      optionLabel="name"
      placeholder="Select an option"
      filterPlaceholder='Search'>
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
export class SelectMultiFilterComponent {

  selectedPeople;
  data;

  constructor() {
    this.data = [
      { id: 'id1', name: 'John Jones', number: 125648465, delete: true },
      { id: 'id2', name: 'Lebron James', number: 125648465, delete: true },
      { id: 'id3', name: 'Dwayne Wade', number: 125648465, delete: false },
      { id: 'id4', name: 'John Paul Jones', number: 125648465, delete: true },
      { id: 'id5', name: 'Hannah Brown', number: 125648465, delete: true },
      { id: 'id6', name: 'Kobe Bryant', number: 125648465, delete: true },
      { id: 'id7', name: 'Tim Duncan', number: 125648465, delete: true },
      { id: 'id8', name: 'Reggie Miller', number: 125648465, delete: true },
      { id: 'id9', name: 'Steph Curry', number: 125648465, delete: true },
      { id: 'id10', name: 'Steve Nash', number: 125648465, delete: true },
      { id: 'id11', name: 'James Harden', number: 125648465, delete: true }
    ];
  }

  onChange(e) {
    console.info(e.value);
  }
}
