/** @component input */

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { of, Subject} from 'rxjs';
import { startWith, takeUntil} from 'rxjs/operators';
import { InputGroupService } from './input-group.service';
import { InputService } from '../input/input.service';
import { InputSectionComponent } from '../input-section';
import { InputMessageComponent } from '../input-message';

let nextUniqueId = 0;

@Component({
  selector: 'md-input-group',
  template: `
    <md-label
      *ngIf="label"
      [label]="label"
      class="md-input__label"
      [htmlFor]='_control.id'
    ></md-label>

    <div class="md-input__wrapper" [ngClass]="[inputSize && inputSize + ' columns' || '']">
      <ng-content></ng-content>
      <md-input-section *ngIf='this.showClear()' position='after'>
        <md-icon
          [ariaLabel]="clearAriaLabel"
          buttonClassName="md-input__icon-clear"
          name="clear-active_16"
          (click)="handleClear($event)"
        ></md-icon>
      </md-input-section>
    </div>

    <!-- Secondary Label -->
    <md-label
      *ngIf="secondaryLabel"
      [label]="secondaryLabel"
      class="md-input__secondary-label"
      [htmlFor]='_control.id'
    ></md-label>

    <!-- Helper Text -->
    <md-input-helper
      *ngIf="helpText"
      [id]='_helpTextId'
    >
      {{helpText}}
    </md-input-helper>

    <!-- Error Input -->
    <div class="md-input__messages" *ngIf="(messages && messages.length) || (_contentMessageChildren && _contentMessageChildren.length)">
      <md-input-message *ngFor="let message of messages">
        {{message}}
      </md-input-message>
      <ng-content select="md-input-message"></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InputService],
})

export class InputGroupComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  private _explicitFormFieldControl: InputGroupService<any>;
  private _destroyed = new Subject<void>();
  protected _clear: boolean = false;
  protected _status: string = '';
  protected _isError: boolean = false;
  public messages: Array<[]>;

   // Unique id for the hint label.
   _helpTextId: string = `md-input__help-text-${nextUniqueId++}`;

  /** @prop Optional css class string | ''  */
  @Input() public class: string = '';
  /** @prop Optional button to clear input text | false */
  @Input()
  get clear(): boolean { return this._clear; }
  set clear(value: boolean) {
    this._clear = value || false;
  }
  /** @prop Optional clear aria label string | 'clear'  */
  @Input() public clearAriaLabel: string = 'clear';
  /** @prop Overall input container size | '' */
  @Input() public containerSize: string = '';
  /** @prop Help Text to appear under the input | '' */
  @Input() public helpText: string = '';
  /** @prop Input wrapper size | '' */
  @Input() public inputSize: string = '';
  /** @prop Sets the filled class of the Input Container | false */
  @Input() public isFilled: boolean = false;
  /** @prop Input label text | '' */
  @Input() public label: string = '';
  /** @prop Array of objects with error type and error message */
  @Input() public messageArr: any[];
  /** @prop Set the level of nested Input components | 0 */
  @Input() public nestedLevel: number = 0;
  /** @prop Secondary Input label | ''  */
  @Input() public secondaryLabel: string = '';
  /** @prop Optional status to override error status | '' */
  @Input()
  get status(): string { return this._status; }
  set status(value: string) {
    this._status = value || '';
  }

  // Add static argument once Angular version is updated
  @ContentChild(InputGroupService) _controlNonStatic: InputGroupService<any>;
  @ContentChild(InputGroupService) _controlStatic: InputGroupService<any>;
  @ContentChildren(InputSectionComponent) _iconChildren: QueryList<InputSectionComponent>;
  @ContentChildren(InputMessageComponent) _contentMessageChildren: QueryList<InputMessageComponent>;
  @ViewChildren(InputMessageComponent) _viewMessageChildren: QueryList<InputMessageComponent>;

  get _control() {
    // TODO: we need this hacky workaround in order to support both Ivy
    // and ViewEngine. We should clean this up once Ivy is the default renderer.
    return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private inputService: InputService
    ) {}

  @HostBinding('class') get _class(): string {
    return (
      'md-input-container' +
      `${this.isFilled ? ' md-input--filled' : ''}` +
      `${this.containerSize ? ` ${this.containerSize} columns` : ''}` +
      `${this._control.readonly ? ' md-read-only' : ''}` +
      `${this._control.disabled ? ' md-disabled' : ''}` +
      `${this.nestedLevel ? ` md-input--nested-${this.nestedLevel}` : ''}` +
      `${(this._isError || this.status) ? ` md-${this._isError ? 'error' : this.status}` : ''}` +
      `${this.class ? ` ${this.class}` : ''}`
    );
  }

  ngAfterContentInit() {
    const control = this._control;
    // Initial sync of input padding styles
    this._syncInputPadding();

    // Subscribe to changes in the child control state in order to update the form field UI.
    control.stateChanges.pipe(startWith(of({}))).subscribe(() => {
      this._syncErrorState();
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });

    // Run change detection if the value changes.
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges
        .pipe(takeUntil(this._destroyed))
        .subscribe(() => this._changeDetectorRef.markForCheck());
    }

    // Update the aria-described by when the number of errors changes.
    this._contentMessageChildren.changes.pipe(startWith(<any>null)).subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });

    // Update the padding class when icon children change.
    this._iconChildren.changes.pipe(startWith(<any>null)).subscribe(() => {
      this._syncInputPadding();
      this._changeDetectorRef.markForCheck();
    });
  }

  ngAfterViewInit() {
    // Required for view children changes
    this._changeDetectorRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.messageArr) {
      const changedArr = changes.messageArr.currentValue;

      if (changedArr && changedArr.length > 0) {
        this._status = this._determineStatus(changedArr);
        this.messages = this._status && this._filterMessagesByType(changedArr, this._status) || [];
      }
    }
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  handleClear(event): void {
    if (this._control.ngControl) {
      this._control.ngControl.reset();
    } else if (this._control.value) {
      this._control.value = '';
    }
  }

  showClear() {
    return this.clear && !this._control.empty;
  }

  private _determineStatus = array => {
    return array.reduce((agg, e) => {
      return agg === 'error' ? agg : e.type || '';
    }, '');
  }

  private _filterMessagesByType = (array, value) => {
    return array.reduce(
      (agg, e) => (e.type === value ? agg.concat(e.message) : agg),
      []
    );
  }

  private _syncDescribedByIds() {
    if (this._control) {
      const ids: string[] = [];

        if (this.helpText) {
          ids.push(this._helpTextId);
        } else if (this._viewMessageChildren) {
          this._viewMessageChildren.map(ele =>
            ids.push(ele.id)
          );
        } else if (this._contentMessageChildren) {
          this._contentMessageChildren.map(ele =>
            ids.push(ele.id)
          );
        }

      this._control.setDescribedByIds(ids);
    }
  }

  private _syncErrorState() {
    if (this._control && this._control.errorState && !this._isError) {
      this._isError = true;
    } else if (this._isError && !this._control.errorState) {
      this._isError = false;
    }
  }

  private _syncInputPadding() {
    let before: boolean = false;
    let after: boolean = false;

    this._iconChildren.forEach(child => {
      if (child.position === 'before') {
        before = true;
      } else if (child.position === 'after') {
        after = true;
      }
    });

    this.inputService.onPaddingChange('Before', before);
    this.inputService.onPaddingChange('After', this.clear || after);
  }
}

