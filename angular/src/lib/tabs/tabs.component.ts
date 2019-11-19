/** @component tabs */

import {
  Component,
  OnInit,
  Input,
  Output,
  HostBinding,
  EventEmitter,
} from '@angular/core';
import { TabsService } from './tabs.service';

@Component({
  selector: 'md-tabs',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
  providers: [TabsService],
})
export class TabsComponent implements OnInit {
  /** @prop Optional CSS class name | '' */
  @Input() className: string = '';
  /** @prop Set the index of the focused Tab | 0 */
  @Input() focus: number = 0;
  /** @prop Determines if the Tabs are in a justified layout | false */
  @Input() justified: boolean = false;
  /** @prop Type of Tabs | 'tabs' */
  @Input() tabType: string = 'tabs';
  /** @prop Callback function invoked when user selects a tab | null */
  @Output() whenSelect = new EventEmitter();

  @HostBinding('class') get classes(): string {
    return (
      'md-tab' +
      `${(this.tabType && ` md-tab--${this.tabType}`) || ''}` +
      `${(this.justified && ' md-tab--justified') || ''}` +
      `${(this.className && ` ${this.className}`) || ''}` +
      ``
    );
  }

  constructor(private tabsService: TabsService) {
    this.tabsService.current$.subscribe(currentIndex => {
      this.whenSelect.emit(currentIndex);
    });
  }

  ngOnInit() {
    this.tabsService.select(this.focus, true);
  }
}
