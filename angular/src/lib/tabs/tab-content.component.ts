import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'cui-tab-content',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class TabContentComponent implements OnInit {

  @HostBinding('class') get className(): string {
    return 'cui-tab__content';
  }

  constructor() { }

  ngOnInit() {
  }

}

/**
 * @component tab-content
 * @section ng-content
 * @angular
 *
<cui-tabs>
    <cui-tab-list>
        <cui-tab>A</cui-tab>
        <cui-tab>B</cui-tab>
    </cui-tab-list>
    <cui-tab-content>
        <cui-tab-pane>Pane A</cui-tab-pane>
        <cui-tab-pane>Pane B</cui-tab-pane>
    </cui-tab-content>
</cui-tabs>
 */
