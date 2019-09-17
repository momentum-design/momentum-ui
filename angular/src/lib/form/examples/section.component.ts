import { Component } from '@angular/core';

@Component({
  selector: 'example-form-section',
  template: `
    <md-form-section
      title="Section Title"
      description="Section Description.
        Curabitur lobortis id lorem id bibendum.
        Ut id consectetur magna.
        Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at.
        Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus.
        Nam tempus vel odio vitae aliquam.
        In imperdiet eros id lacus vestibulum vestibulum.
        Suspendisse fermentum sem sagittis ante venenatis egestas quis vel justo.
        Maecenas semper suscipit nunc, sed aliquam sapien convallis eu.
        Nulla ut turpis in diam dapibus consequat."
      >
        <md-input-group>
          <input
            mdInput
            [(ngModel)]="dataModel"
            [disabled]="true"
            label="Disabled Input"
            placeholder="Disabled Input"
          />
        </md-input-group>
    </md-form-section>
  `,
})

export class ExampleFormSectionComponent {
  dataModel: string = '';
}
