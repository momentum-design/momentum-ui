import { Component } from '@angular/core';

@Component({
  selector: 'example-popover-showarrow',
  template: `
    <div style="padding: 16px;">
        <button md-button aria-label="myAriaLabel" mdPopover="I have an arrow" >
         Arrow Shows
        </button>
    </div>
    <div style="padding: 16px;">
        <button md-button aria-label="myAriaLabel" mdPopover="testing MouseEnter" [showArrow]="false">
        Arrow doesn't show
        </button>
    </div>
  `,
  styles: []
})
export class PopoverShowarrowComponent {

  constructor() {
   }


}
