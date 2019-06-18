import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export type ActivityButtonSize = 56 | 68 | 84;
export type ActivityButtonType = 'chat' | 'camera' | 'contact-card' | 'meetings' | 'whiteboard' | 'files' | 'share-screen' | 'tasks' | '';

@Component({
  selector: 'md-activity-button',
  template: `
  <button
    [ngClass]='buttonNgClass'
    [attr.aria-label] = 'labelName'
    [attr.alt]="labelName"
    [disabled] = 'disabled'
    type="button"
    tabindex="0"
    (click)="handleClick($event)"
  >
    <span class="md-button__children" *ngIf='type!==""'>
      <i [class]="iconClassName"></i>
    </span>
    <ng-content></ng-content>
  </button>
  <div class="md-button__label">{{ labelName }}</div>
  `,
  styles: [],
  host: {
    '[class]': 'containerClassName',
  }
})
export class ActivityButtonComponent implements OnInit {
  /** @prop Text to display for blindness accessibility features | '' */
  @Input() ariaLabel: string = '';
  /** @prop Sets the attribute disabled to the button | false */
  @Input() disabled: boolean = false;
  /** @prop Sets the button's size | 68 */
  @Input() size: ActivityButtonSize = 68;
  /** @prop Sets the button's activity type */
  @Input() type: ActivityButtonType = '';
  /** @prop Sets the button's class */
  @Input() className: string = '';

  @Output() whenClick = new EventEmitter();

  public regIntial = /\b\w+\b/g;
  public containerClassName = 'md-button__container--small';
  public iconClassName = 'icon icon-chat_36';
  public labelName = '';

  public buttonNgClass = {
    'md-button': true,
    'md-button--circle': true,
    'md-activity': true
  };

  public buttonToIconSizeMapping = {
    56: '24',
    68: '28',
    84: '36'
  };

  constructor() { }

  ngOnInit() {
    if (this.size === 84) {
      this.containerClassName = 'md-button__container';
    }
    if (this.className) {
      this.buttonNgClass[this.className] = true;
    }
    this.labelName = this.getLabel();
    this.buttonNgClass['md-button--' + this.size] = true;
    this.buttonNgClass['md-activity__' + this.type] = true;
    this.iconClassName = 'icon icon-' + this.type + '_' + this.buttonToIconSizeMapping[this.size];
  }

  public getLabel = () => {
    return this.ariaLabel || this.type.replace('-', ' ').replace(this.regIntial, function (word) {
      return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
  }

  public handleClick = (event) => {
    this.whenClick.emit(event);
  }

}
