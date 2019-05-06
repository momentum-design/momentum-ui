import { Component } from '@angular/core';

@Component({
  selector: 'example-tooltip-direction',
  template: `
  <br>
      <md-badge mdTooltip="Left adjusted" direction="left">I have a tooltip on the left and adjust cause it's off the page</md-badge>
      <md-badge mdTooltip="on the left" direction="left">Hi there, I have a tooltip on the left</md-badge>
      <br><br>
      <md-badge mdTooltip="on the bottom" direction="bottom">Hi there, I have a tooltip on the bottom</md-badge>
      <br><br>
      <md-badge mdTooltip="on the top" direction="top">Hi there, I have a tooltip on top</md-badge>
      <br><br>
      <md-badge mdTooltip="To the right" direction="right" offset="20">tooltip on the right with offset</md-badge>
      <br>
  `,
  styles: []
})
export class TooltipDirectionComponent {

  constructor() {
   }

}
