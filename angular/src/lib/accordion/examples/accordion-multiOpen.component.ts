import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-accordion-multiOpen',
  template: `
    <cui-accordion [multipleVisible]="true">
      <cui-accordion-tab
        header="Test Header 1"
      >
        Content 1
      </cui-accordion-tab>

      <cui-accordion-tab
        header="Test Header 2"
        (onClick) = "fireThis($event)"
      >
        Content 2
      </cui-accordion-tab>

      <cui-accordion-tab
        header="Test Header 3"
      >
        Content 3
      </cui-accordion-tab>
    </cui-accordion>
  `,
  styles: []
})
export class AccordionMultiOpenComponent {

  constructor() { }

  fireThis(event) {
    alert('content clicked');
  }
}
