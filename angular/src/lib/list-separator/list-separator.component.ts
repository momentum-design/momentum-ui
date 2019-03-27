/** @component list-separator */
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cui-list-separator',
  template: `
    <span class="cui-list-separator__container">
      <ng-content *ngIf="!text; else textTemplate"></ng-content>
    </span>

    <ng-template #textTemplate>
      <span
        class="cui-list-separator__text"
        [ngStyle]="{ color: textColor, padding: textPadding }"
        >{{ text }}</span
      >
    </ng-template>
  `,
  host: {
    class: 'cui-list-separator',
  },
})
export class ListSeparatorComponent {
  /** @option Background Color of the ListSeparator | null */
  @Input() backgroundColor: string;
  /** @option Color of the ListSeparator line | null */
  @Input() lineColor: string;
  /** @option Margin of the ListSeparator | null */
  @Input() margin: string;
  /** @option Text of the ListSeparator | null */
  @Input() text: string;
  /** @option TextColor of the ListSeparator | null */
  @Input() textColor: string;
  /** @option Padding around text of the ListSeparator | null */
  @Input() textPadding: string;

  @HostBinding('style.background-color') get _backgroundColor(): string {
    return this.backgroundColor;
  }
  @HostBinding('style.color') get _lineColor(): string {
    return this.lineColor;
  }
  @HostBinding('style.margin') get _margin(): string {
    return this.margin;
  }
}
