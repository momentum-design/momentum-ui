import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationService } from './pagination.service';
import { ENTER, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

@Component({
  selector: 'md-pagination',
  template: `
    <md-pagination-arrow
      [isPrevious]='true'
      [ifPreventDefault]='ifPreventDefault'
    ></md-pagination-arrow>
    <md-pagination-number *ngFor='let item of renderGroupFirst'
      [index]='item'
      [ifPreventDefault]='ifPreventDefault'
    ></md-pagination-number>
    <li class='pagination_li ellipsis' *ngIf='firstGrounpEnd!==-1' aria-hidden="true">...</li>
    <md-pagination-number *ngFor='let item of renderGroupMid'
      [index]='item'
      [ifPreventDefault]='ifPreventDefault'
    ></md-pagination-number>
    <li class='pagination_li ellipsis' *ngIf='lastGroupStart<this.total' aria-hidden="true">...</li>
    <md-pagination-number *ngFor='let item of renderGroupLast'
      [index]='item'
      [ifPreventDefault]='ifPreventDefault'
    ></md-pagination-number>
    <md-pagination-arrow
      [isPrevious]='false'
      [ifPreventDefault]='ifPreventDefault'
    ></md-pagination-arrow>
  `,
  styleUrls: ['pagination.scss'],
  host: {
    class: 'pagination',
    'style': `
      display: block;
      min-height: 1.5rem;
      list-style-position: outside;
      clear:both;
    `,
    'attr.role': 'navigation',
    'attr.aria-label': 'Pagination',
    'tabindex': '0',
    '(keydown)': 'handleKeydown($event)'
  },
  providers: [PaginationService]
})
export class PaginationComponent implements OnInit {

  /** @option set the href format | '' */
  @Input() href: string = '';
  /** @option set the replace placeholder of href */
  @Input() hrefReplaceReg: string | RegExp = '$page$';
  /** @props set total | '' */
  @Input() total: number = 10;
  /** @props set current | '' */
  @Input() current: number = 1;
  /** @props set the first button group | '' */
  @Input() firstGroupNum: number = 2;
  /** @props set the mid button group | '' */
  @Input() midGroupNum: number = 3;
  /** @props set the last button group | '' */
  @Input() lastGroupNum: number = 2;
  /** @option Callback function invoked when user clicks buttons */
  @Output() whenClick = new EventEmitter();

  public renderGroupFirst = [];
  public renderGroupMid = [];
  public renderGroupLast = [];
  public renderGroup = [];

  public firstGrounpEnd: number = -1;
  public midGroupStart: number = 1;
  public midGroupEnd: number = 1;
  public lastGroupStart: number = Infinity;

  public ifPreventDefault = false;

  private minCurrentForFirstGroup = 0;
  private maxCurrentForLastGroup = 0;

  constructor(
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    const s = this.paginationService;
    s.initConfig(this.href, this.hrefReplaceReg, this.total);
    s.current$.subscribe((v) => {
      this.build();
      this.whenClick.emit(v);
    });
    this.paginationService.select(this.current);
  }

  public handleKeydown = (event) => {
    const s = this.paginationService;
    let ifStop = false;

    switch (event.keyCode) {
      case LEFT_ARROW: // <-
        s.focusInList(this.renderGroup, -1);
        ifStop = true;
        break;
      case RIGHT_ARROW: // ->
        s.focusInList(this.renderGroup, 1);
        ifStop = true;
        break;
      case ENTER: // Enter
        s.selectfocus();
        ifStop = true;
        break;
      default:
        break;
    }
    if (ifStop) {
      event.stopPropagation();
    }
  }

  public build = () => {
    const s = this.paginationService,
      current = s.currentPage,
      total = s.totalPage,
      preMidLen = Math.floor((this.midGroupNum - 1) / 2),
      nextMidLen = this.midGroupNum - preMidLen - 1;
    this.minCurrentForFirstGroup = this.firstGroupNum + 1 + preMidLen; // > this
    this.maxCurrentForLastGroup = total - this.lastGroupNum - 1 - nextMidLen + 1; // > this

    if (current > this.minCurrentForFirstGroup) {
      this.firstGrounpEnd = this.firstGroupNum;
      this.midGroupStart = current - preMidLen;
      this.midGroupEnd = Math.min(total, this.midGroupStart + this.midGroupNum - 1);
    } else { // merge start and middle
      this.firstGrounpEnd = -1;
      this.midGroupStart = 1;
      this.midGroupEnd = Math.min(total, Math.max(current + nextMidLen, this.minCurrentForFirstGroup));
    }

    if (current < this.maxCurrentForLastGroup) {
      this.lastGroupStart = total - this.lastGroupNum + 1;
    } else { // merge end and middle
      this.lastGroupStart = Infinity;
      this.midGroupStart = Math.max(1, Math.min(current - preMidLen, this.maxCurrentForLastGroup));
      this.midGroupEnd = total;
    }

    // get template
    this.renderGroupFirst = [];
    this.renderGroupMid = [];
    this.renderGroupLast = [];
    this.renderGroup = [];
    let i = 1;

    if (current > 1) {
      this.renderGroup.push('previous');
    }

    for (; i <= this.firstGrounpEnd; i++) {
      this.renderGroupFirst.push(i);
      this.renderGroup.push(i);
    }

    for (i = this.midGroupStart; i <= this.midGroupEnd; i++) {
      this.renderGroupMid.push(i);
      this.renderGroup.push(i);
    }

    for (i = this.lastGroupStart; i <= total; i++) {
      this.renderGroupLast.push(i);
      this.renderGroup.push(i);
    }

    if (s.currentPage < total) {
      this.renderGroup.push('next');
    }
  }

}
