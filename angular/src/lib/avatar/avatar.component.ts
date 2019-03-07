import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' |
18 | 24 | 28 | 36 | 40 | 44 | 52 | 56 | 72 | 80 | 84;
export type AvatarType = '' | 'active' | 'bot' | 'call' | 'dnd' | 'group' |
'inactive' | 'meeting' | 'ooo' | 'presenting' | 'self' | 'typing';

@Component({
  selector: 'cui-avatar',
  template: `
    <button
      cui-button
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
        class="cui-avatar"
        [ngClass]="[
          clickable && 'cui-avatar--clickable' || '',
          type && 'cui-avatar--' + type || '',
          size && 'cui-avatar--' + size || '',
          theme && 'cui-avatar--' + theme || '',
          isDecrypting && 'cui-decrypting' || '',
          className || ''
        ]"
        [title]="!hideDefaultTooltip ? title : ''"
      >
        <ng-container *ngTemplateOutlet="overlayTpl"></ng-container>
      </div>
    </ng-template>

    <ng-template #overlayTpl>
      <ng-container *ngTemplateOutlet="childrenTpl"></ng-container>
      <cui-loading *ngIf="type === 'typing'"></cui-loading>
      <span *ngIf="failureBadge" class='cui-avatar__failure-badge'></span>
      <span *ngIf="hasNotification" class='cui-avatar__notification-badge'></span>
    </ng-template>

    <ng-template #childrenTpl>
      <span
        *ngIf="type === 'self'; else imageTpl"
        class="cui-avatar__self"
        [ngStyle]="{
          'background-color': backgroundColor,
          'color': color
        }"
      >
        <cui-icon [name]="size === 40 || size === 'medium' ? 'chat-active_18' : 'chat-active_16'" color="blue"></cui-icon>
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
          class="cui-avatar__img"
          [ngClass]="{'cui-avatar__img--hidden': !isImageLoaded}"
          draggable="false"
          (error)="handleImgError()"
          (load)="handleImgLoaded()"
          [src]="src"
        />
      </ng-container>
    </ng-template>

    <ng-template #iconTpl>
      <span *ngIf="icon; else letterTpl"
        class="cui-avatar__icon"
        [ngClass]="{'cui-avatar__icon--overview': isOverview}"
        [ngStyle]="{
          'background-color': backgroundColor,
          'color': color
        }"
      >
        <cui-icon [name]="icon"></cui-icon>
      </span>
    </ng-template>

    <ng-template #letterTpl>
      <span
        class="cui-avatar__letter"
        [ngClass]="{
          'cui-decrypting': isDecrypting,
          'cui-avatar__img--hidden': isImageLoaded
        }"
        [ngStyle]="{
          'background-color': backgroundColor,
          'color': color
        }"
      >{{ getInitials() }}</span>
    </ng-template>
  `,
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input() public ariaLabel: string = '';
  /** @prop Image alt tag | '' */
  @Input() public alt: string = '';
  /** @prop Set Avatar background color | '' */
  @Input() public backgroundColor: string = '';
  /** @prop Optional css class string for button | '' */
  @Input() public buttonClassName: string = '';
  /** @prop Optional css class string for Avatar component | null */
  @Input() public className: string;
  /** @prop Set Avatar text color | '' */
  @Input() public color: string = '';
  /** @prop Set existance of a failureBadge on the Avatar | false */
  @Input() public failureBadge: boolean = false;
  /** @prop Set existance of a notification on the Avatar | false */
  @Input() public hasNotification: boolean = false;
  /** @prop Set the visibility of Avatar's default tooltip | false */
  @Input() public hideDefaultTooltip: boolean = false;
  /** @prop Optional icon name for the Avatar | null */
  @Input() public icon: string;
  /** @prop Set if Avatar's content is decrypting | false */
  @Input() public isDecrypting: boolean = false;
  /** @prop Set existance of Avatar's Overview | false */
  @Input() public isOverview: boolean = false;
  /** @prop Set the size of the Avatar from one of the preconfigured options | 'medium' */
  @Input() public size: AvatarSize = 'medium';
  /** @prop Optional image source for the Avatar | null */
  @Input() public src: string;
  /** @prop Optional Avatar color theme | null */
  @Input() public theme: string;
  /** @prop set Avatar title / user's name | null */
  @Input() public title: string;
  /** @prop optional Avatar type | '' */
  @Input() public type: AvatarType = '';

  @Output() click: EventEmitter<any> = new EventEmitter();

  @HostBinding('class') get _class(): string {
    return 'cui-avatar' +
      `${(this.size && ` cui-avatar--${this.size}`) || ''}` +
      `${(!this.clickable && this.type && ` cui-avatar--${this.type}`) || ''}` +
      `${(!this.clickable && this.theme && ` cui-avatar--${this.theme}`) || ''}` +
      `${(!this.clickable && this.isDecrypting && ` cui-decrypting`) || ''}` +
      `${(!this.clickable && this.className && ` ${this.className}`) || ''}`;
  }
  @HostBinding('attr.title') get _title(): string {
    return !this.hideDefaultTooltip ? this.title : '';
  }

  @ViewChild('image') image: ElementRef;

  clickable: boolean = false;
  isImageLoaded: boolean = false;
  isImageErrored: boolean = false;

  constructor() { }

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
    const repeatTimes = Math.min(this.type === 'group' && 1 || 2, words.length);
    for (let i = 0; i < repeatTimes; i++) {
      letters.push(String.fromCodePoint(words[i].codePointAt(0)));
    }
    return letters.join('');
  }
}
