import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { DatePickerService } from './date-picker.service';

@Component({
  selector: 'md-date-picker-day',
  template: `
    <ng-template [ngIf]="isNormalView" [ngIfElse]="selectedRangeEdge">
      {{ displayDay }}
    </ng-template>
    <ng-template #selectedRangeEdge>
      <span [class]='specialRangeClass'>{{ displayDay }}</span>
    </ng-template>
  `,
  host: {
    class: 'md-button md-button--circle md-button--28 md-datepicker__day',
    '[class.md-button--disabled]': 'isDisable',
    '[class.md-datepicker__day--selected]': 'isSelected',
    '[class.md-datepicker__day--focus]': 'isFocus',
    '[class.md-datepicker__day--today]': 'isToday',
    '[class.md-datepicker__day--outside-month]': 'isOutsideMonth',
    '[class.md-datepicker__day--inrange]': 'isInRange',
    '[class.md-datepicker__day--start]': 'isStartDay',
    '[class.md-datepicker__day--end]': 'isEndDay',
    '[class.md-datepicker__day--hovered]': 'isHovered',
    '[class.md-datepicker__day--unselectable]': 'isUnselectable',
    '[class.md-datepicker__day--inrange-selected]': 'isInRangeSelected',
    '[attr.ariaLabel]': '',
    '[attr.aria-selected]': 'false',
    '[attr.tabIndex]': '-1',
    '(click)': 'onClick()'
  }
})
export class DatePickerDayComponent implements OnInit {

  /** @prop Required day that the DatePickerDay displays */
  @Input() day: any;
  /** @prop Required month that the DatePickerDay displays */
  @Input() month: any;

  public isDisable = false;
  public isSelected = false;
  public isFocus = false;
  public isToday = false;
  public isOutsideMonth = false;
  public isInRange = false;
  public isUnselectable = false;
  public isStartDay = false;
  public isEndDay = false;
  public isHovered = false;
  public isInRangeSelected = false;
  public isNormalView = true;
  public specialRangeClass = '';

  public displayDay;

  constructor(
    private datePickerService: DatePickerService,
    private viewContainerRef: ViewContainerRef
  ) {
    const s = this.datePickerService;
    s.focused$.subscribe(date => {
      this.checkState();
    });
    s.selected$.subscribe(date => {
      this.checkState();
    });
    s.startDate$.subscribe(date => {
      this.checkState();
    });
    s.endDate$.subscribe(date => {
      this.checkState();
    });
    s.viewed$.subscribe(date => {
      this.checkState();
    });
    s.hovered$.subscribe(date => {
      this.checkState();
    });
  }

  ngOnInit() {
    this.displayDay = this.datePickerService.getDate(this.day);
    if (this.datePickerService.isRange) {
      const root = this.viewContainerRef.element.nativeElement;
      root.addEventListener('mouseenter', () => {
        this.onHover();
      });
    }
    this.checkState();
  }

  public onClick = () => {
    const s = this.datePickerService;
    if (!s.isRange) {
      s.select(this.day);
      s.setOpenStatus(false);
    } else if (!s.hasFinishRange() && !s.isDayDisabled(this.day)) {
      s.select(this.day);
    }
  }

  public onHover = () => {
    const s = this.datePickerService;
    if (!s.hoverDate || !s.isSameDay(s.hoverDate, this.day)) {
      if (!s.isDayDisabled(this.day)) {
        s.hover(this.day);
      } else {
        s.hover(undefined);
      }
    }
  }

  private checkState = () => {
    const s = this.datePickerService,
      d = this.day;
    this.isDisable = s.isDayDisabled(d);
    this.isSelected = s.isSelected(d);
    this.isFocus = s.isFocus(d);
    this.isToday = s.isToday(d);
    this.isOutsideMonth = s.isOutsideMonth(d, this.month);
    if (s.isRange) {
      this.specialRangeClass = '';
      if (s.hasEitherRange()) {
        this.isInRange = s.isDayInRange(d);
        if (s.hasFinishRange()) {
          this.isStartDay = s.isStartDay(d);
          this.isEndDay = s.isEndDay(d);
          this.isHovered = false;
          this.isSelected = this.isInRange;
          this.isUnselectable = false;
          this.isInRangeSelected = this.isSelected && !this.isUnselectable;
          this.isNormalView = true;
        } else {
          this.isDisable = false;
          if (s.start) {
            this.isStartDay = s.isStartDay(d);
            this.isEndDay = s.isSameDay(s.hoverDate, d);
          } else {
            this.isStartDay = s.isSameDay(s.hoverDate, d);
            this.isEndDay = s.isEndDay(d);
          }
          if (this.isStartDay) {
            this.specialRangeClass = 'selected-edge-day';
          }
          if (this.isEndDay) {
            this.specialRangeClass = 'selected-edge-day';
          }
          this.isUnselectable = !this.isInRange;
          this.isHovered = s.hoverDate && this.isInRange;
          this.isSelected = false;
          this.isHovered = this.isHovered;
          this.isInRangeSelected = false;
          this.isNormalView = !(this.isStartDay || this.isEndDay);
        }
        if (this.isStartDay && this.isEndDay) {
          this.isStartDay = false;
          this.isEndDay = false;
          this.isInRange = false;
        }
      } else {
        this.isNormalView = true;
        this.isInRange = false;
        this.isUnselectable = false;
        this.isStartDay = false;
        this.isEndDay = false;
        this.isHovered = false;
        this.isInRangeSelected = false;
      }
    }
  }

}
