import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'example-popover-default',
  template: `
  <md-badge mdPopover="Hello World!">Popover with text only</md-badge>
  <br>
  <md-badge color="blue" [mdPopover]="tootltipTemplate">Popover from template</md-badge>
      <ng-template #tootltipTemplate>
          <md-badge color="red">HOWDY</md-badge>
          <div class="box">THis is cool</div>
      </ng-template>
  `,
  styles: []
})
export class PopoverDefaultComponent {

  constructor() {
   }

   onClick() {
    alert('Button Clicked!');
  }

}
