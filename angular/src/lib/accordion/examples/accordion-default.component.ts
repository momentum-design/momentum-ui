import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-accordion-default',
  template: `
    <md-accordion>
      <md-accordion-tab
        header="Test Header - height 56"
        [height]="56"
      >
        Content 1
      </md-accordion-tab>

      <md-accordion-tab
        header="Test Header 2"
        (contentClick) = "fireThis($event)"
      >
        Content 2
      </md-accordion-tab>

      <md-accordion-tab
        header="Test Header 3"
        [showSeparator]="true"
      >
        Content 3
      </md-accordion-tab>
    </md-accordion>
  `,
  styles: []
})
export class AccordionDefaultComponent {

  constructor() { }

  fireThis(event) {
    alert('content clicked');
  }

  fireKeyDown(event) {
    alert('keydown event');
  }
}
