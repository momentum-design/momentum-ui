import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'example-popover-default',
  template: `

  <cui-badge cuiPopover="Hello World!">Popover with text only</cui-badge>
  <br>
  <cui-badge color="blue" [cuiPopover]="tootltipTemplate">Popover from template</cui-badge>
      <ng-template #tootltipTemplate>
          <cui-badge color="red">HOWDY</cui-badge>
          <div class="box">THis is cool</div>
      </ng-template>
  `,
  styles: []
})
export class PopoverDefaultComponent {
  @ViewChild('template') popoverTemplate: TemplateRef<any>;

  constructor() {
   }

   onClick() {
    alert('Button Clicked!');
  }

}
