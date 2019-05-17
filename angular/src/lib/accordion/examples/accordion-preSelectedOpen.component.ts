import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-accordion-preselected-open',
  template: `
    <md-accordion>
      <md-accordion-tab
        [multipleVisible]="true"
        header="Test Header 1"
      >
        Content 1
      </md-accordion-tab>

      <md-accordion-tab
        header="Test Header 2"
        [isExpanded]="true"
        (onClick) = "fireThis($event)"
      >
        Content 2
      </md-accordion-tab>

      <md-accordion-tab
        header="Test Header 3"
        [isExpanded]="true"
      >
        Content 3
      </md-accordion-tab>

    </md-accordion>
  `,
  styles: []
})
export class AccordionPreSelectedOpenComponent {

  constructor() { }

  fireThis(event) {
    alert('content clicked');
  }
}
