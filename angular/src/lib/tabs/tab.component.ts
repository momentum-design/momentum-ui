import {
  Component,
  OnInit,
  HostBinding,
  HostListener,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { TabsService } from './tabs.service';

@Component({
  selector: 'md-tab',
  template: `
  <li
    role="presentation"
    class="md-tab__item"
    [ngClass]="[
      ifCurrent ? 'active' : '',
      disabled ? 'disabled' : '',
      className
    ]"
    tabindex="0"
    (keydown)="onKeyDown($event)"
  >
    <a
      href="javascript:void(0)"
      (click)="whenPress.emit()"
      (keydown)="whenKeyDown.emit()"
      [attr.role]="role"
      [attr.tabindex]="ifFocus ? 0 : -1"
      [attr.aria-posinset]="tabIndex"
      [attr.aria-setsize]="tabSize"
      [attr.aria-selected]="ifCurrent"
      [attr.aria-disabled]="disabled"
    >
      <ng-content></ng-content>
    </a>
  </li>
  `,
})

export class TabComponent implements OnInit {

  /** @prop Optional CSS class name */
  @Input() public className: string = '';
  /** @prop Sets the attribute disabled to the Tab | false */
  @Input() public disabled: boolean = false;
  /** @prop Tab's anchor role type | 'tab' */
  @Input() public role: string = 'tab';
  /** @prop Callback function invoked when user click a tab | null */
  @Output() whenPress = new EventEmitter();
  /** @prop Callback function invoked when user press a key | null */
  @Output() whenKeyDown = new EventEmitter();

  public tabIndex: number;
  public ifCurrent: boolean;
  public ifFocus: boolean;
  public tabSize: number;

  @HostBinding('attr.role') attrRole = 'presentation';
  /*
  @HostBinding('attr.tabIndex') get attrTabIndex():number {
    return this.tabIndex;
  };
  @HostBinding('attr.aria-posinset') ariaPosinset = this.tabIndex;
  @HostBinding('attr.aria-setsize') ariaSetsize = this.tabSize;
  @HostBinding('attr.aria-selected') ariaSelected = this.ifCurrent;
  @HostBinding('attr.aria-disabled') ariaDisabled = this.disabled;
  */

  private regIsCharacter: RegExp = /\S/;

  @HostListener('click') select() {
    this.tabsService.select(this.tabIndex);
  }

  constructor(
    private tabsService: TabsService,
    private el: ElementRef
  ) {
    this.tabIndex = tabsService.registerTab();
    this.tabSize = this.tabIndex;

    this.tabsService.current$.subscribe(index => {
      this.ifCurrent = this.tabIndex === index;
    });

    this.tabsService.focusIndex$.subscribe(index => {
      this.ifFocus = this.tabIndex === index;
      if (this.ifFocus) {
        this.el.nativeElement.getElementsByTagName('A')[0].focus();
      }
    });

    this.tabsService.tabSize$.subscribe(n => {
      this.tabSize = n;
    });
  }

  ngOnInit() {
    this.tabsService.registerDisable(this.tabIndex, this.disabled);

    const innerText = this.el.nativeElement.innerText;
    if (innerText) {
      this.tabsService.registerKey(innerText[0], this.tabIndex);
    }
  }

  isPrintableCharacter = str => {
    return str.length === 1 && str.match(this.regIsCharacter);
  }

  onKeyDown = e => {

    const key = e.keyCode;
    const tgt = e.target;
    let flag = false,
      clickEvent;

    switch (key) {
      case 32: // Space
      case 13: // Page up
        try {
          clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
          });
        } catch (err) {
          if (document.createEvent) {
            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('click', true, true);
          }
        }
        tgt.dispatchEvent(clickEvent);
        flag = true;
        break;
      case 38: // Up Arrow
      case 37: // Left Arrow
        this.tabsService.setFocusPre();
        flag = true;
        break;
      case 39: // Right Arrow
      case 40: // Down Arrow
        this.tabsService.setFocusNext();
        flag = true;
        break;
      case 33: // Page Up
      case 36: // Home
        this.tabsService.setFocus(0);
        flag = true;
        break;
      case 34: // Page Down
      case 35: // End
        this.tabsService.setFocusLast();
        flag = true;
        break;
      default:
        if (this.isPrintableCharacter(e.key)) {
          flag = this.tabsService.setFocusByFirstCharacter(e.key);
        }
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
}
