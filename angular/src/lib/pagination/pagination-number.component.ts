import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'md-pagination-number',
  template: `
    <a [ngClass]='ngClassA' *ngIf="!isCurrent;else other_content"
    [href]='myHref'
    [attr.aria-label]="'Page '+index"
    (click)='handleClick($event)'
    >{{ index }}</a>
    <ng-template #other_content>{{ index }}</ng-template>
  `,
  styleUrls: ['pagination.scss'],
  host: {
    'class': 'pagination_li',
    '[class.pagination_current]': 'isCurrent',
    '[class.pagination_li_focus]': 'isCurrent && isFocus'
  }
})
export class PaginationNumberComponent implements OnInit {
  /** @option set index | '' */
  @Input() index: number;
  /** @option set ifPreventDefault | '' */
  @Input() ifPreventDefault: boolean = false;

  public myHref: any;
  public isCurrent = false;
  public isFocus = false;
  public ngClassA = {
    'pagination_li_a': true,
    'pagination_li_a_focus': false
  };

  constructor(
    private paginationService: PaginationService
  ) {
    this.paginationService.current$.subscribe(() => {
      this.build();
    });
    this.paginationService.focused$.subscribe((v) => {
      this.isFocus = v === this.index;
      this.ngClassA.pagination_li_a_focus = this.isFocus;
    });
  }

  ngOnInit() {
    this.build();
  }

  private build = () => {
    const s = this.paginationService;
    this.myHref = s.getHref(this.index);
    this.isCurrent = s.isCurrent(this.index);
  }

  public handleClick = (event) => {
    this.paginationService.focus(this.index);
    this.paginationService.select(this.index);
    event.stopPropagation();
    if (this.ifPreventDefault) {
      event.preventDefault();
    }
  }

}
