import { Component } from '@angular/core';

@Component({
  selector: 'example-popover-direction',
  template: `
  <br>
      <md-badge mdPopover="Left adjusted" direction="left">I have a popover on the left and adjust cause it's off the page</md-badge>
      <md-badge mdPopover="on the left" direction="left">Hi there, I have a popover on the left</md-badge>
      <br><br>
      <md-badge mdPopover="on the bottom" direction="bottom">Hi there, I have a popover on the bottom</md-badge>
      <br><br>
      <md-badge mdPopover="on the top" direction="top">Hi there, I have a popover on top</md-badge>
      <br><br>
      <md-badge mdPopover="To the right" direction="right" offset="20">popover on the right with offset</md-badge>
      <br>
  `,
  styles: []
})
export class PopoverDirectionComponent {

  constructor() {
   }


}
