import { Component, OnInit, HostBinding, HostListener, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import { TabsService } from './tabs.service';

@Component({
  selector: 'cui-tab',
  template: `
    <a href='javascript:void(0)' [attr.role]="role" (click)='whenPress.emit()' (keydown)='whenKeyDown.emit()' >
      <ng-content></ng-content>
    </a>
  `,
  styles: []
})
export class TabComponent implements OnInit {

  /** @prop Optional CSS class name */
  @Input() public className: string = '';
  /** @prop Sets the attribute disabled to the Tab | false */
  @Input() public disabled: boolean = false;
  /** @prop Tab's anchor role type | 'tab' */
  @Input() public role: string = 'Tab';
  /** @prop Callback function invoked when user click a tab | null */
  @Output() whenPress = new EventEmitter();
  /** @prop Callback function invoked when user press a key | null */
  @Output() whenKeyDown = new EventEmitter();

  private tabIndex: number;
  private ifCurrent: boolean;
  private regIsEmpty: RegExp = /\r\n\t\s/g;

  @HostBinding('class') get classes(): string {
    return 'cui-tab__item' +
    `${(this.className && ` ${this.className}`) || ''}` +
    `${(this.ifCurrent && ' active') || ''}` +
    `${(this.disabled && ' disabled') || ''}` +
    ``;
  }

  @HostListener('click') select() {
    this.tabsService.select(this.tabIndex);
  }

  constructor(
    private tabsService: TabsService,
    private el: ElementRef
  ) {
    this.tabIndex = tabsService.registerTab();
    this.tabsService.current$.subscribe(currentIndex => {
      this.ifCurrent = this.tabIndex === currentIndex;
    });
  }

  ngOnInit() {
    const innerText = this.el.nativeElement.innerText;
    if (innerText && !this.disabled) {
      this.tabsService.registerKey(innerText[0], this.tabIndex);
    }
  }
}

/**
 * @component tab
 * @section ng-content
 * @angular
 *
<cui-tabs>
    <cui-tab-list>
        <cui-tab className='helloClass'>A</cui-tab>
        <cui-tab>B</cui-tab>
    </cui-tab-list>
</cui-tabs>
 */

/**
 * @component tab
 * @section class
 * @angular
 *
<cui-tabs>
    <cui-tab-list>
        <cui-tab className='helloClass'>A</cui-tab>
        <cui-tab>B</cui-tab>
    </cui-tab-list>
</cui-tabs>
 */


 /**
 * @component tab
 * @section role
 * @angular
 *
<cui-tabs>
    <cui-tab-list>
        <cui-tab role='tab'>A</cui-tab>
        <cui-tab>B</cui-tab>
    </cui-tab-list>
</cui-tabs>
 */

/**
 * @component tab
 * @section disabled
 * @angular
 *
<cui-tabs>
    <cui-tab-list>
        <cui-tab [disabled]='true'>A</cui-tab>
        <cui-tab>B</cui-tab>
    </cui-tab-list>
</cui-tabs>
 */
