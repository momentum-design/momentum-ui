import { Component, ElementRef, Input } from '@angular/core';

export type ListItemHeaderType = '' | 'space';

@Component({
  selector: 'cui-list-item-header',
  template: `
    <div
      cui-list-item
      class="cui-list-item-header"
      [isReadOnly]="isReadOnly"
      [title]="getTitle()"
    >
      <cui-list-item-section position="center">
        <div class="cui-list-item__header">
          {{ header }}
        </div>
      </cui-list-item-section>
      <cui-list-item-section position="right">
        <ng-content></ng-content>
      </cui-list-item-section>
    </div>
  `,
})

export class ListItemHeaderComponent {
  /** ListItem header text */
  @Input() header: string;
  /** HTML ID for associated input | '' */
  @Input() id: string = '';
  /** Determines if ListItemHeader is Clickable | true */
  @Input() isReadOnly: boolean = true;
  /** ListItem title | '' */
  @Input() title: string = '';
  /** ListItemHeader type variation | '' */
  @Input()
  get type(): ListItemHeaderType {
    return this._type;
  }
  set type(value: ListItemHeaderType) {
    this.elementRef.nativeElement.classList.remove(`cui-list-item-header--${this._type}`);
    this.elementRef.nativeElement.classList.add(`cui-list-item-header--${value}`);
    this._type = value;
  }

  private _type: ListItemHeaderType = '';

  constructor(private elementRef: ElementRef) {}

  getTitle(): string {
    return !this.title ? this.header : this.title;
  }
}
