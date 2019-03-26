import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-accordion-preselected',
  template: `
    <cui-accordion>
      <cui-accordion-tab
        [multipleVisible]="true"
        header="Test Header 1"
      >
        Content 1
      </cui-accordion-tab>

      <cui-accordion-tab
        header="Test Header 2"
        [isExpanded]="true"
        (onClick) = "fireThis($event)"
      >
        Content 2
      </cui-accordion-tab>

      <cui-accordion-tab
        header="Test Header 3"
        [isExpanded]="true"
      >
        Content 3
      </cui-accordion-tab>

    </cui-accordion>
  `,
  styles: []
})
export class AccordionPreSelectedComponent {

  constructor() { }

  fireThis(event) {
    alert('content clicked');
  }
}
