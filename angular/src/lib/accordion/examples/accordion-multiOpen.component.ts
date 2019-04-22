import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-accordion-multiOpen',
  template: `
    <md-accordion [multipleVisible]="true">
      <md-accordion-tab
        header="Test Header 1"
      >
        Content 1
      </md-accordion-tab>

      <md-accordion-tab
        header="Test Header 2"
        (onClick) = "fireThis($event)"
      >
        Content 2
      </md-accordion-tab>

      <md-accordion-tab
        header="Test Header 3"
      >
        Content 3
      </md-accordion-tab>
    </md-accordion>
  `,
  styles: []
})
export class AccordionMultiOpenComponent {

  constructor() { }

  fireThis(event) {
    alert('content clicked');
  }
}
