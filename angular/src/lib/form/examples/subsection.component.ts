import { Component } from '@angular/core';

@Component({
  selector: 'example-form-sub-section',
  template: `
    <md-form-sub-section
      label="Subsection Label"
      description="Subsection Description lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse sit amet hendrerit turpis, in accumsan quam.">
      <md-input
        [(ngModel)]="dataModel"
        [disabled]="true"
        label="Disabled Input"
        placeholder="Disabled Input"
      >
      </md-input>
    </md-form-sub-section>
  `,
})
export class ExampleFormSubSectionComponent {
  dataModel: string = '';
}
