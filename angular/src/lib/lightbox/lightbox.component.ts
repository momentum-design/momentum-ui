/** @component lightbox */

import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { LightboxConfig, LightboxInfo, LightboxPage, LightboxTooltips } from './lightbox-config';

@Component({
  selector: 'md-lightbox',
  template: `
    <div class="md-lightbox">
      <div #headerRef class="md-lightbox__header">
        <div class="md-lightbox__header-item--left">
          <div class="md-lightbox__header-meta">
            <div class="md-lightbox__header-sharer">{{ info.sharedBy }}</div>
            <div class="md-lightbox__header-timestamp">{{ info.sharedOn }}</div>
          </div>
        </div>
        <div class="md-lightbox__header-item--center">
          <div class="md-lightbox__header-name">{{ name }}</div>
        </div>
        <div class="md-lightbox__header-item--right">
          <div class="md-lightbox__control"
            [mdTooltip]="tooltips.exit"
            direction="left"
            delay="0"
            (click)="destroy()"
            (keypress)="handleKeypress($event, 'destroy')"
            role="button"
            tabindex="0">
              <md-icon name="cancel_16"></md-icon>
          </div>
        </div>
      </div>
      <div class="md-lightbox__body">
        <ng-container *ngTemplateOutlet="thumbnailsTemplate"></ng-container>
        <div
          class="md-lightbox__content"
          (click)="destroy()"
          (keypress)="handleKeypress($event, 'destroy')"
          role="button"
          tabindex="0"
        >
          <div
            #viewportRef
            class="md-lightbox__viewport"
            [ngClass]="{ 'md-lightbox__viewport--decrypting': !!currentPage.decrypting }"
          >
            <md-spinner *ngIf="pages[index].decrypting" class="md-lightbox__decrypting-spinner"></md-spinner>
            <ng-container *ngTemplateOutlet="viewportTemplate"></ng-container>
          </div>
          <ng-container *ngTemplateOutlet="leftArrowControlTemplate"></ng-container>
          <ng-container *ngTemplateOutlet="rightArrowControlTemplate"></ng-container>
          <ng-container *ngTemplateOutlet="viewportControlsTemplate"></ng-container>
        </div>
      </div>
    </div>

    <ng-template #thumbnailsTemplate>
      <div *ngIf="pages.length > 1" class="md-lightbox__list">
        <div *ngFor="let page of pages; index as idx"
          class="md-lightbox__thumbnail-wrapper"
          [ngClass]="{ 'md-lightbox__thumbnail-wrapper--selected': idx === index }"
          (click)="handleThumbnailClick(idx)"
          (keypress)="handleKeypress($event, 'thumbnail', idx)"
          role="button"
          tabindex="0"
        >
          <div *ngIf="page.decrypting"
            class="md-lightbox__thumbnail md-lightbox__thumbnail--decrypting"
            [attr.dataindex]="idx"
            [ngStyle]="thumbnailDecryptingStyle"
          >
            <md-icon class="md-lightbox__thumbnail--icon" name="secure_28"></md-icon>
          </div>
          <img *ngIf="!page.decrypting"
            alt=""
            class="md-lightbox__thumbnail"
            [attr.dataindex]="idx"
            [attr.draggable]="false"
            [attr.src]="page.thumb"
          />
          <div>
            {{ idx + 1 }}
          </div>
        </div>
      </div>
    </ng-template>

    <ng-template #viewportTemplate>
      <div
        class="md-lightbox__viewport-wrapper"
        [ngStyle]="viewportStyle"
      >
        <div *ngIf="currentPage.content">
          <div
            class="md-lightbox__viewport-content"
            [attr.draggable]="false"
            (click)="stopPropagation($event)"
            (keypress)="stopPropagation($event)"
            (doubleclick)="setZoom(0.25)"
            role="button"
            tabindex="0"
          >
            {{ currentPage.content }}
          </div>
        </div>
        <div *ngIf="currentPage.image">
          <div *ngIf="zoom <= 1">
            <img
              alt=""
              class="md-lightbox__viewport-image"
              [attr.draggable]="false"
              (click)="stopPropagation($event)"
              (keypress)="stopPropagation($event)"
              (doubleclick)="setZoom(0.25)"
              [attr.src]="currentPage.thumb"
            />
          </div>
          <div *ngIf="zoom > 1">
            <img
              alt=""
              class="md-lightbox__viewport-image"
              [attr.draggable]="false"
              (click)="stopPropagation($event)"
              (keypress)="stopPropagation($event)"
              (doubleclick)="setZoom(0.25)"
              [attr.src]="currentPage.thumb"
              [ngStyle]="{
                'object-fit': 'contain',
                'max-height': height * zoom + 'px',
                'max-width': width * zoom + 'px',
                'min-height': height * zoom + 'px',
                'min-width': width * zoom + 'px'
              }"
            />
          </div>
        </div>
      </div>
    </ng-template>

    <ng-template #leftArrowControlTemplate>
      <div *ngIf="pages.length > 1"
        [mdTooltip]="tooltips.previous"
        direction="right"
        delay="0"
        class="md-lightbox__page-control md-lightbox__page-control-icon md-lightbox__page-controls--left"
        role="button"
        tabindex="0"
        (click)="triggerPageChange(index - 1, $event)"
        (keypress)="handleKeypress($event, 'change', index - 1)"
        style="transform: rotate(-180deg)"
      >
        <md-icon name="icon-arrow-right_16"></md-icon>
      </div>
    </ng-template>

    <ng-template #rightArrowControlTemplate>
      <div *ngIf="pages.length > 1"
        [mdTooltip]="tooltips.next"
        direction="left"
        delay="0"
        class="md-lightbox__page-control md-lightbox__page-control-icon md-lightbox__page-controls--right"
        role="button"
        tabindex="0"
        (click)="triggerPageChange(index + 1, $event)"
        (keypress)="handleKeypress($event, 'change', index + 1)"
      >
        <md-icon name="icon-arrow-right_16"></md-icon>
      </div>
    </ng-template>

    <ng-template #viewportControlsTemplate>
      <div
        class="md-lightbox__viewer-controls"
        (click)="stopPropagation($event)"
        (keypress)="stopPropagation($event)"
        role="button"
        tabindex="0"
      >
        <div class="md-lightbox__controls" [ngStyle]="controlStyle">
          <div class="md-lightbox__control"
            [mdTooltip]="tooltips.zoomOut"
            delay="0"
            (click)="setZoom(-0.25)"
            (keypress)="handleKeypress($event, 'zoom', -0.25)"
            role="button"
            tabindex="0"
          >
              <md-icon name="zoom-out_16"></md-icon>
          </div>
          <span class="md-lightbox__control-value">{{ math.round(zoom * 100) }}%</span>
          <div class="md-lightbox__control"
            [mdTooltip]="tooltips.zoomIn"
            delay="0"
            (click)="setZoom(0.25)"
            (keypress)="handleKeypress($event, 'zoom', 0.25)"
            role="button"
            tabindex="0"
          >
            <md-icon name="zoom-in_16"></md-icon>
          </div>
        </div>
        <ng-container *ngTemplateOutlet="pageControlTemplate"></ng-container>
        <div class="md-lightbox__controls" [ngStyle]="controlStyle">
          <span class="md-lightbox__control-value">{{ info.size }}</span>
          <div *ngIf="downloading"
            [mdTooltip]="tooltips.downloading"
            delay="0"
            class="md-lightbox__control md-lightbox__control-spinner">
            <md-spinner size="28"></md-spinner>
          </div>
          <div *ngIf="!downloading"
            [mdTooltip]="tooltips.download"
            delay="0"
            class="md-lightbox__control md-lightbox__control-download"
            (click)="handleDownload()"
            (keypress)="handleKeypress($event, 'download')"
            role="button"
            tabindex="0"
          >
            <md-icon name="download_16"></md-icon>
          </div>
        </div>
      </div>
    </ng-template>

    <ng-template #pageControlTemplate>
      <div *ngIf="pages.length > 1" class="md-lightbox__controls md-lightbox__controls--center">
        <div class="md-lightbox__control"
          [mdTooltip]="tooltips.previous"
          delay="0"
          (click)="triggerPageChange(index - 1, $event)"
          (keypress)="handleKeypress($event, 'change', index - 1)"
          role="button"
          tabindex="0"
          style="transform: rotate(-180deg)"
        >
          <md-icon name="icon-arrow-right_16"></md-icon>
        </div>
        <span class="md-lightbox__control-value">{{ index + 1 }} / {{ pages.length }}</span>
        <div class="md-lightbox__control"
          [mdTooltip]="tooltips.next"
          delay="0"
          (click)="triggerPageChange(index + 1, $event)"
          (keypress)="handleKeypress($event, 'change', index + 1)"
          role="button"
          tabindex="0"
        >
          <md-icon name="icon-arrow-right_16"></md-icon>
        </div>
      </div>
      <div *ngIf="pages.length === 1" class="md-lightbox__controls">
        <span class="md-lightbox__control-value">{{ index + 1 }}</span>
      </div>
    </ng-template>
  `,
  host: {
    'class': 'md-lightbox__container'
  }
})
export class LightboxComponent implements OnInit, OnDestroy {
  decrypting: boolean;
  downloading: boolean;
  height: number;
  index: number;
  info: LightboxInfo;
  math = Math;
  name: string;
  pages: Array<LightboxPage>;
  tooltips: LightboxTooltips;
  viewportDimensions = {
    width: 600,
    height: 600
  };
  width: number;
  zoom: number = 1;

  readonly _onDestroy: Subject<any> = new Subject();
  private _document: Document;

  @ViewChild('headerRef') headerRef: ElementRef;
  @ViewChild('viewportRef') viewportRef: ElementRef;

  get currentPage(): LightboxPage {
    return this.pages[this.index];
  }

  get controlStyle() {
    return this.currentPage.content ? {
      visibility: 'hidden'
    } : {};
  }

  get thumbnailDecryptingStyle() {
    return { height: Math.round(this.height / (this.width / 150)) };
  }

  get viewportStyle() {
    const srcWidth: number = this.width * this.zoom;
    const srcHeight: number = this.height * this.zoom;
    const maxWidth: number = this.viewportDimensions.width;
    const maxHeight: number = this.viewportDimensions.height;
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight, 1);

    const width: number = Math.round(srcWidth * ratio);
    const height: number = Math.round(srcHeight * ratio);

    return this.zoom <= 1 ? {
      width: `${width}px`,
      height: `${height}px`
    } : {};
  }

  get config(): LightboxConfig {
    return this._config;
  }

  constructor(private _config: LightboxConfig, @Inject(DOCUMENT) _document: any) {
    this.decrypting = _config.decrypting;
    this.downloading = _config.downloading;
    this.height = _config.height;
    this.index = _config.index;
    this.info = _config.info;
    this.name = _config.name;
    this.pages = _config.pages;
    this.tooltips = _config.tooltips;
    this.width = _config.width;
    this._document = _document;
  }

  ngOnInit(): void {
    this._document.addEventListener('keydown', this.handleKeydown);
    this._document.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy(): void {
    this._document.removeEventListener('keydown', this.handleKeydown);
    this._document.removeEventListener('resize', this.handleResize);
    if (this._config.onClose) {
      this._config.onClose();
    }
  }

  handleResize = () => {
    this.viewportDimensions = {
      width: this.viewportRef.nativeElement.offsetWidth,
      height: this.viewportRef.nativeElement.offsetHeight
    };
  }

  handleKeydown = (e: KeyboardEvent) => {
    let newIndex: number;
    switch (e.code) {
      case 'Escape':
        this.destroy();
        return;
      case 'ArrowLeft':
      case 'ArrowUp':
        newIndex = Math.max(this.index - 1, 0);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = Math.min(this.index + 1, this.pages.length - 1);
        break;
      case 'PageUp':
      case 'Home':
        newIndex = 0;
        break;
      case 'PageDown':
      case 'End':
        newIndex = this.pages.length - 1;
        break;
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
      case 'Digit5':
      case 'Digit6':
      case 'Digit7':
      case 'Digit8':
      case 'Digit9':
        newIndex = Math.min(Number(e.code.substr(-1)) - 1, this.pages.length - 1);
        break;
      default:
        return;
    }
    this.triggerPageChange(newIndex, e);
  }

  handleThumbnailClick(index: number): void {
    this.index = index;
    if (this._config.onChange) {
      this._config.onChange(index);
    }
  }

  triggerPageChange(index: number, e: MouseEvent | KeyboardEvent): void {
    const target: HTMLElement = this.headerRef.nativeElement.querySelector(`[dataindex="${index}"]`);
    if (index >= 0 && index <= this.pages.length - 1) {
      this.index = index;
      if (this._config.onChange) {
        this._config.onChange(index);
      }
    }
    if (target) {
      target.scrollIntoView();
    }
    e.stopPropagation();
  }

  stopPropagation(e: MouseEvent | KeyboardEvent): void {
    e.stopPropagation();
  }

  setZoom(increment: number): void {
    const newZoom = this.zoom + increment;
    this.zoom = newZoom < 0.25 ? 0.25 : newZoom;
  }

  handleDownload(): void {
    if (this._config.onDownload) {
      this._config.onDownload(this.currentPage);
    }
  }

  handleKeypress(e: KeyboardEvent, type: string, param?: any): void {
    if (e.code === 'Enter' || e.code === 'Space') {
      switch (type) {
        case 'destroy':
          this.destroy();
          break;
        case 'thumbnail':
          this.handleThumbnailClick(param);
          break;
        case 'change':
          this.triggerPageChange(param, e);
          break;
        case 'download':
          this.handleDownload();
          break;
        case 'zoom':
          this.setZoom(param);
          break;
      }
    }
  }

  destroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
