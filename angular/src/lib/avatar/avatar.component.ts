/** @component avatar */

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

export type AvatarSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 18
  | 24
  | 28
  | 36
  | 40
  | 44
  | 52
  | 56
  | 72
  | 80
  | 84;
export type AvatarType =
  | ''
  | 'active'
  | 'bot'
  | 'call'
  | 'dnd'
  | 'group'
  | 'inactive'
  | 'meeting'
  | 'ooo'
  | 'presenting'
  | 'self'
  | 'typing';

@Component({
  selector: 'md-avatar',
  template: `
    <button
      md-button
      *ngIf="clickable; else avatarTpl"
      [attr.aria-label]="ariaLabel"
      [class]="buttonClassName"
      [circle]="true"
      [removeStyle]="true"
    >
      <ng-container *ngTemplateOutlet="avatarTpl"></ng-container>
    </button>

    <ng-template #avatarTpl>
      <div
        *ngIf="clickable; else overlayTpl"
        class="md-avatar"
        [ngClass]="[
          'md-avatar--clickable',
          (type && 'md-avatar--' + type) || '',
          (size && 'md-avatar--' + size) || '',
          (theme && 'md-avatar--' + theme) || '',
          (isDecrypting && 'md-decrypting') || '',
          className || ''
        ]"
        [title]="!hideDefaultTooltip ? title : ''"
      >
        <ng-container *ngTemplateOutlet="overlayTpl"></ng-container>
      </div>
    </ng-template>

    <ng-template #overlayTpl>
      <ng-container *ngTemplateOutlet="childrenTpl"></ng-container>
      <md-loading *ngIf="type === 'typing'"></md-loading>
      <span *ngIf="failureBadge" class="md-avatar__failure-badge"></span>
      <span
        *ngIf="hasNotification"
        class="md-avatar__notification-badge"
      ></span>
    </ng-template>

    <ng-template #childrenTpl>
      <span
        *ngIf="type === 'self'; else imageTpl"
        class="md-avatar__self"
        [ngStyle]="{
          'background-color': backgroundColor,
          color: color
        }"
      >
        <md-icon
          [name]="
            size === 40 || size === 'medium'
              ? 'chat-active_18'
              : 'chat-active_16'
          "
          color="blue-50"
        ></md-icon>
      </span>
    </ng-template>

    <ng-template #imageTpl>
      <ng-container *ngIf="src && !isImageErrored; else iconTpl">
        <ng-container *ngIf="title && !isImageLoaded">
          <ng-container *ngTemplateOutlet="letterTpl"></ng-container>
        </ng-container>
        <img
          #image
          [alt]="alt"
          class="md-avatar__img"
          [ngClass]="{ 'md-avatar__img--hidden': !isImageLoaded }"
          draggable="false"
          (error)="handleImgError()"
          (load)="handleImgLoaded()"
          [src]="src"
        />
      </ng-container>
    </ng-template>

    <ng-template #iconTpl>
      <span
        *ngIf="icon; else letterTpl"
        class="md-avatar__icon"
        [ngClass]="{ 'md-avatar__icon--overview': isOverview }"
        [ngStyle]="{
          'background-color': backgroundColor,
          color: color
        }"
      >
        <md-icon [name]="icon"></md-icon>
      </span>
    </ng-template>

    <ng-template #letterTpl>
      <span
        class="md-avatar__letter"
        [ngClass]="{
          'md-decrypting': isDecrypting,
          'md-avatar__img--hidden': isImageLoaded
        }"
        [ngStyle]="{
          'background-color': backgroundColor,
          color: color
        }"
        >{{ getInitials() }}</span
      >
    </ng-template>
  `,
  host: {
    '[attr.title]': '!hideDefaultTooltip ? title : ""',
    class: 'md-avatar md-avatar--medium',
    '[class.md-decrypting]': '!clickable && isDecrypting',
  },
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() public ariaLabel: string = '';
  /** @option Image alt tag | '' */
  @Input() public alt: string = '';
  /** @option Set Avatar background color | '' */
  @Input() public backgroundColor: string = '';
  /** @option Optional css class string for button | '' */
  @Input() public buttonClassName: string = '';
  /** @option Optional css class string for Avatar component | null */
  @Input() public className: string;
  /** @option Set Avatar text color | '' */
  @Input() public color: string = '';
  /** @option Set existance of a failureBadge on the Avatar | false */
  @Input() public failureBadge: boolean = false;
  /** @option Set existance of a notification on the Avatar | false */
  @Input() public hasNotification: boolean = false;
  /** @option Set the visibility of Avatar's default tooltip | false */
  @Input() public hideDefaultTooltip: boolean = false;
  /** @option Optional icon name for the Avatar | null */
  @Input() public icon: string;
  /** @option Set if Avatar's content is decrypting | false */
  @Input() public isDecrypting: boolean = false;
  /** @option Set existance of Avatar's Overview | false */
  @Input() public isOverview: boolean = false;
  /** @option Set the size of the Avatar from one of the preconfigured options | 'medium' */
  @Input()
  get size(): AvatarSize {
    return this._size;
  }
  set size(value: AvatarSize) {
    if (!this.clickable) {
      this.elementRef.nativeElement.classList.remove(
        `md-avatar--${this._size}`
      );
      this.elementRef.nativeElement.classList.add(`md-avatar--${value}`);
    }
    this._size = value;
  }
  /** @option Optional image source for the Avatar | null */
  @Input() public src: string;
  /** @option Optional Avatar color theme | null */
  @Input()
  get theme(): string {
    return this._theme;
  }
  set theme(value: string) {
    if (!this.clickable) {
      this.elementRef.nativeElement.classList.remove(
        `md-avatar--${this._theme}`
      );
      this.elementRef.nativeElement.classList.add(`md-avatar--${value}`);
    }
    this._theme = value;
  }
  /** @option set Avatar title / user's name | null */
  @Input() public title: string;
  /** @option optional Avatar type | '' */
  @Input()
  get type(): AvatarType {
    return this._type;
  }
  set type(value: AvatarType) {
    if (!this.clickable) {
      this.elementRef.nativeElement.classList.remove(
        `md-avatar--${this._type}`
      );
      this.elementRef.nativeElement.classList.add(`md-avatar--${value}`);
    }
    this._type = value;
  }

  @Output() click: EventEmitter<any> = new EventEmitter();

  @ViewChild('image') image: ElementRef;

  private _size: AvatarSize = 'medium';
  private _type: AvatarType = '';
  private _theme: string;
  public clickable: boolean = false;
  public isImageLoaded: boolean = false;
  public isImageErrored: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const img = this.image;
    if (img && img.nativeElement.complete) {
      this.handleImgLoaded();
    }
    this.clickable = this.click.observers.length > 0;
  }

  ngOnChanges(changes: any) {
    if (changes.src && changes.src.previousValue !== changes.src.currentValue) {
      this.handleImgChange();
    }
  }

  handleImgChange() {
    this.isImageLoaded = false;
    this.isImageErrored = false;
  }

  handleImgError() {
    this.isImageErrored = true;
  }

  handleImgLoaded() {
    this.isImageLoaded = true;
  }

  getInitials() {
    if (!this.title || !this.title.replace(/\s/g, '').length) {
      return '';
    }
    const letters = [];
    const words = this.title.trim().split(/ +/);
    const repeatTimes = Math.min(
      (this.type === 'group' && 1) || 2,
      words.length
    );
    for (let i = 0; i < repeatTimes; i++) {
      letters.push(String.fromCodePoint(words[i].codePointAt(0)));
    }
    return letters.join('');
  }
}
