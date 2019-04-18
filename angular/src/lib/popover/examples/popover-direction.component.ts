import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'example-popover-direction',
  template: `
  <br>
      <cui-badge cuiPopover="Left adjusted" direction="left">I have a popover on the left and adjust cause it's off the page</cui-badge>
      <cui-badge cuiPopover="on the left" direction="left">Hi there, I have a popover on the left</cui-badge>
      <br><br>
      <cui-badge cuiPopover="on the bottom" direction="bottom">Hi there, I have a popover on the bottom</cui-badge>
      <br><br>
      <cui-badge cuiPopover="on the top" direction="top">Hi there, I have a popover on top</cui-badge>
      <br><br>
      <cui-badge cuiPopover="To the right" direction="right" offset="20">popover on the right with offset</cui-badge>
      <br>
  `,
  styles: []
})
export class PopoverDirectionComponent {
  @ViewChild('template') popoverTemplate: TemplateRef<any>;

  constructor() {
   }

   onClick() {
    alert('Button Clicked!');
  }

}
