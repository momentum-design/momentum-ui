import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

import { AlertMeetingAttendee } from './alert-meeting-config';

// Used internally by the alert meeting service.
@Component({
  selector: 'md-alert-meeting',
  template: `
    <ng-container *ngIf="avatar; else avatarTemplate" [ngTemplateOutlet]="avatar"></ng-container>
    <div [ngClass]="contentClasses">
      <div class="md-alert__title" [attr.title]="title">{{ title }}</div>
      <div class="md-alert__status">{{ status }}</div>
      <div class="md-alert__message" [attr.title]="message">{{ message }}</div>
    </div>
    <div class="md-alert__button" *ngIf="snoozeButtonVisible">
      <button
        md-button
        [attr.aria-label]="remindAriaLabel"
        [circle]="true"
        size="44"
        tabindex="0"
        (click)="onSnooze()"
      >
        <md-icon name="alarm_16"></md-icon>
      </button>
    </div>
    <div class="md-alert__button">
      <button
        md-button
        [attr.aria-label]="closeAriaLabel"
        [circle]="true"
        size="44"
        tabindex="0"
        (click)="onHide()"
      >
        <md-icon name="cancel_16"></md-icon>
      </button>
    </div>

    <ng-template #avatarTemplate>
      <md-composite-avatar *ngIf="attendees.length >= 2">
        <md-avatar
          [title]="attendees[0].title"
          [alt]="attendees[0].alt"
          [src]="attendees[0].src"
        ></md-avatar>
        <md-avatar
          [title]="attendees[1].title"
          [alt]="attendees[1].alt"
          [src]="attendees[1].src"
        ></md-avatar>
      </md-composite-avatar>
      <md-avatar
        *ngIf="attendees.length === 1"
        [title]="attendees[0].title"
        [alt]="attendees[0].alt"
        [src]="attendees[0].src"
      ></md-avatar>
    </ng-template>
  `,
  host: {
    'class': 'md-alert md-alert--meeting',
    '[attr.role]': 'clickable ? "button" : null',
    '[attr.tabindex]': 'clickable ? "0" : null',
    '(click)': 'clickable ? onClick() : null',
    '(keydown)': 'clickable ? onKeydown($event) : null',
  }
})
export class AlertMeetingComponent implements OnInit {
  @Input() private key: string;
  @Input() attendees: AlertMeetingAttendee[] = [];
  @Input() avatar: TemplateRef<any>;
  @Input() clickable: boolean;
  @Input() closeAriaLabel: string = 'close';
  @Input() message: string = '';
  @Input() remindAriaLabel: string = 'snooze';
  @Input() snoozeButtonVisible: boolean;
  @Input() status: string = '';
  @Input() title: string = '';

  @Output() readonly mouseclick: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly hide: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly snooze: EventEmitter<string> = new EventEmitter<string>();

  get contentClasses(): string[] {
    return [
      'md-alert__content',
      this.snoozeButtonVisible ? '' : 'md-alert__content--wide'
    ];
  }

  ngOnInit() {
    if (!this.avatar && this.attendees.length === 0) {
      throw new Error('MeetingAlert needs at least one attendee to render an avatar.');
    }
  }

  onClick(): void {
    this.mouseclick.emit(this.key);
  }

  onSnooze(): void {
    this.snooze.emit(this.key);
  }

  onHide(): void {
    this.hide.emit(this.key);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.code === 'Enter') {
      this.onClick();
      event.preventDefault();
    }
  }
}
