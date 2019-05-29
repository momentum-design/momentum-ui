import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'md-pagination-arrow',
  template: `
    <a #btn *ngIf="isEnable;else disableTemplate"
      [ngClass]='ngClassA'
      [href]='myHref'
      [attr.aria-label]='name'
      (click)='handleClick($event)'
    ><span class="show-for-sr">page</span></a>
    <ng-template #disableTemplate>
      <span class="show-for-sr">page</span>
    </ng-template>
  `,
  styleUrls: ['pagination.scss'],
  host: {
    'class': 'pagination-previous pagination_li md-icon icon',
    '[class.pagination_li_last]': '!isPrevious',
    '[class.pagination_disable]': '!isEnable',
    '[class.icon-arrow-left-optical_20]': 'isPrevious && !isEnable',
    '[class.icon-arrow-right-optical_20]': '!isPrevious && !isEnable'
  }
})
export class PaginationArrowComponent implements OnInit {
  /** @option set isPrevious | '' */
  @Input() isPrevious: boolean = true;
  /** @option set ifPreventDefault | '' */
  @Input() ifPreventDefault: boolean = false;

  public isEnable = false;
  public name = 'Previous page';
  public myHref: any = '';
  public ngClassA = {
    'pagination_li_a': true,
    'icon--b1': true,
    'md-icon': true,
    'icon': true,
    'pagination_li_a_focus': false,
    'icon-arrow-left_20': true,
    'icon-arrow-right_20': false
  };

  constructor(private paginationService: PaginationService) {
    this.paginationService.current$.subscribe(() => {
      this.build();
    });
    this.paginationService.focused$.subscribe((v) => {
      if (this.isPrevious) {
        this.ngClassA.pagination_li_a_focus = v === 'previous';
      } else {
        this.ngClassA.pagination_li_a_focus = v === 'next';
      }
    });
  }

  ngOnInit() {
    this.build();
  }

  public handleClick = (event) => {
    if (this.isPrevious) {
      this.paginationService.focus('previous');
      this.paginationService.selectPrevious();
    } else {
      this.paginationService.focus('next');
      this.paginationService.selectNext();
    }
    event.stopPropagation();
    if (this.ifPreventDefault) {
      event.preventDefault();
    }
  }

  public build = () => {
    const s = this.paginationService;
    if (this.isPrevious) {
      this.isEnable = !s.isCurrentFirst();
      this.name = 'Previous page';
      this.ngClassA['icon-arrow-left_20'] = true;
      this.ngClassA['icon-arrow-right_20'] = false;
      this.myHref = s.getHref(s.currentPage - 1);
    } else {
      this.isEnable = !s.isCurrentLast();
      this.name = 'Next page';
      this.ngClassA['icon-arrow-left_20'] = false;
      this.ngClassA['icon-arrow-right_20'] = true;
      this.myHref = s.getHref(s.currentPage + 1);
    }
  }

}
