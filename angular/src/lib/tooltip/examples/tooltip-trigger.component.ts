import { Component } from '@angular/core';

@Component({
  selector: 'example-tooltip-trigger',
  template: `
    <div style="padding: 16px;">
        <button md-button aria-label="myAriaLabel" mdTooltip="testing Click" tooltipTrigger="Click">
        Click for tooltip
        </button>
    </div>
    <div style="padding: 16px;">
        <button md-button aria-label="myAriaLabel" mdTooltip="testing MouseEnter" tooltipTrigger="MouseEnter">
        Mouseover for tooltip
        </button>
    </div>
    <div style="padding: 16px;">
        <button md-button aria-label="myAriaLabel"  mdTooltip="testing Focus" tooltipTrigger="Focus">
        Focus for tooltip
        </button>
    </div>
  `,
  styles: []
})
export class TooltipTriggerComponent {

  constructor() {
   }

}
