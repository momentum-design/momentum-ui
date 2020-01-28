import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-select-custom',
  template: `
    <div class="medium-8 columns">
      <md-select
        [options]="people"
        [(ngModel)]="person"
        placeholder="Select an option"
        (onSelect)="onChange($event)"
        optionLabel="name"
        buttonClass="custom-button-class"
        [buttonStyle]="{width: '100%'}"
        overlayClass="testOverlayClass"
        optionClass="testOptionClass"
      >

        <ng-template mdTemplateName="option" let-option>
          <!-- optionClass prop can be used to provide css to existent div wrapper in component -->
          <div style="width: 100%; display:flex; justify-content:space-between;">
            <span> {{option.value.name}} </span>
            <span> Custom Content </span>
          </div>
        </ng-template>

        <!-- If you want to provide a custom selected option label -->
        <ng-template mdTemplateName="selectedOption" let-finalOption>
          <span>Custom Selected {{finalOption ? finalOption.value.name : 'Placeholder'}}</span>
        </ng-template>

      </md-select>
    </div>

  <p> ngModel: {{person ? person.name : 'none'}} <p>
  `,
  styles: []
})
export class SelectCustomComponent {

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
