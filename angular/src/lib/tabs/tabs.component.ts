import { Component, OnInit, Input, Output, HostBinding, EventEmitter } from '@angular/core';
import { TabsService } from './tabs.service';

export type TabType = 'pills';

@Component({
  selector: 'cui-tabs',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
  providers: [ TabsService ]
})
export class TabsComponent implements OnInit {

  /** @prop Optional CSS class name | '' */
  @Input() className: string = '';
  /** @prop Set the index of the focused Tab | 0 */
  @Input() focus: number = 0;
  /** @prop Determines if the Tabs are in a justified layout | false */
  @Input() justified: boolean = false;
  /** @prop Type of Tabs | 'pills' */
  @Input() tabType: TabType = 'pills';
  /** @prop Callback function invoked when user selects a tab | null */
  @Output() whenSelect = new EventEmitter();

  @HostBinding('class') get classes(): string {
    return 'cui-tab' +
    `${(this.tabType && ` cui-tab--${this.tabType}`) || ''}` +
    `${(this.justified && ' cui-tab--justified') || ''}` +
    `${(this.className && ` ${this.className}`) || ''}` +
    ``;
  }

  constructor(
    private tabsService: TabsService
  ) {
    this.tabsService.current$.subscribe( currentIndex => {
      this.whenSelect.emit(currentIndex);
    });
    this.tabsService.select(this.focus);
  }

  ngOnInit() {

  }

}

/**
 * @component tabs
 * @section whenSelect
 * @angular
 *
<cui-tabs [focus]='1' className='MyClass' (whenSelect)='onClick($event)'>
    <cui-tab-header heading='test'></cui-tab-header>
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

 /**
 * @component tabs
 * @section className
 * @angular
 *
<cui-tabs className='MyClass'>
    <cui-tab-header heading='test'></cui-tab-header>
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

 /**
 * @component tabs
 * @section focus
 * @angular
 *
<cui-tabs [focus]='1'>
    <cui-tab-header heading='test'></cui-tab-header>
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
