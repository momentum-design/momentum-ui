import { Component, Input, OnInit, HostBinding, HostListener } from '@angular/core';
import { TabsService } from './tabs.service';

@Component({
  selector: 'cui-tab-list',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class TabListComponent implements OnInit {

  /** @prop Tab's anchor role type | 'tablist' */
  @Input() public role: string = 'tablist';

  private regIsCharacter: RegExp = /\S/;

  @HostBinding('class') get className(): string {
    return 'cui-tab__list';
  }
  @HostBinding('attr.role') get roleName(): string {
    return this.role;
  }

  @HostListener('keyup', ['$event']) select($event) {
    this.onPress($event);
  }

  constructor(
    private tabsService: TabsService
  ) {}

  ngOnInit() {
  }

  isPrintableCharacter = str => {
    return str.length === 1 && str.match(this.regIsCharacter);
  }

  onPress = (e) => {
    const key = e.keyCode;
    const tgt = e.target;
    let flag = false,
      clickEvent;

    switch (key) {
      case '32':
      case '13':
        try {
          clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
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
      case 38:
      case 37:
        this.tabsService.selectPre();
        flag = true;
        break;
      case 39:
      case 40:
        this.tabsService.selectNext();
        flag = true;
        break;
      case 33:
      case 36:
        this.tabsService.select(0);
        flag = true;
        break;
      case 34:
      case 35:
        this.tabsService.selectLast();
        flag = true;
        break;
      default:
        if ( this.isPrintableCharacter(e.key) ) {
          flag = this.tabsService.selectByFirstCharacter(e.key);
        }
        break;
    }

    if ( flag ) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

}

/**
 * @component tab-list
 * @section ng-content
 * @angular
 *
<cui-tab-list>
    <cui-tab>A</cui-tab>
    <cui-tab>B</cui-tab>
</cui-tab-list>
 */


/**
 * @component tab-list
 * @section role
 * @angular
 *
  <cui-tab-list role='tablist'>
      <cui-tab>A</cui-tab>
      <cui-tab>B</cui-tab>
  </cui-tab-list>
 */

