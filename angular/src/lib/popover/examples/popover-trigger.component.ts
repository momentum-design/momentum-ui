import { Component } from '@angular/core';

@Component({
  selector: 'example-popover-trigger',
  template: `
    <div style="padding: 16px;">
        <button cui-button aria-label="myAriaLabel" cuiPopover="testing Click" popoverTrigger="Click">
        Click for popover
        </button>
    </div>
    <div style="padding: 16px;">
        <button cui-button aria-label="myAriaLabel" cuiPopover="testing MouseEnter" popoverTrigger="MouseEnter">
        Mouseover for popover
        </button>
    </div>
    <div style="padding: 16px;">
        <button cui-button aria-label="myAriaLabel"  cuiPopover="testing Focus" popoverTrigger="Focus">
        Focus for popover
        </button>
    </div>
  `,
  styles: []
})
export class PopoverTriggerComponent {

  constructor() {
   }

   onClick() {
    alert('Button Clicked!');
  }

}
