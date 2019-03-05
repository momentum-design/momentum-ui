import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TabsService } from '../tabs/tabs.service';

@Component({
  selector: 'cui-tab-pane',
  template: `
    <div class='cui-tab__content'>
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class TabPaneComponent implements OnInit {

  @HostBinding('class') get className(): string {
    return 'cui-tab__pane' +
    `${(this.ifCurrent && ' active') || ''}` +
    ``;
  }

  private tabIndex: number;
  private ifCurrent: boolean;

  constructor(
    private tabsService: TabsService
  ) {
    this.tabIndex = tabsService.registerPane();
    this.tabsService.current$.subscribe(currentIndex => {
      this.ifCurrent = this.tabIndex === currentIndex;
    });
  }

  ngOnInit() {

  }

}

/**
 * @component tab-pane
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
