import {
  Component, Input, HostBinding, ViewChild, AfterContentChecked, ContentChildren,
  QueryList, ChangeDetectorRef, AfterContentInit, OnInit, NgZone, Output, EventEmitter
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { uniqueId } from 'lodash';
import { ButtonComponent } from '../button';
import { ListItemComponent, OptionSelectionChange } from '../list-item';

import { takeUntil, switchMap, take } from 'rxjs/operators';
import { Subject, defer, Observable, merge } from 'rxjs';

interface IState {
  isOpen: boolean;
  selected?: any;
  anchorWidth: null;
  id: string;
}

@Component({
  selector: 'cui-select',
  template: `
    <button cui-button
        cdkOverlayOrigin
        #trigger="cdkOverlayOrigin"

        [attr.name]='state.id'
        aria-label="select button"
        [id]='state.id'
        (click)='this.state.isOpen = !this.state.isOpen'
        [class]="buttonClasses"
        type="button"
        >
          <div class='cui-select__label' id="{{state.id}}__label">
              {{currentValue() || defaultValue}}
              <cui-icon name="arrow-down_16"></cui-icon>
          </div>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="this.state.isOpen"
      [cdkConnectedOverlayWidth]="this.state.anchorWidth"
      [cdkConnectedOverlayOffsetY]="6"
      [cdkConnectedOverlayPanelClass]="'cui-event-overlay__children'"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
      (backdropClick)="this.state.isOpen = false">
      <cui-list>
        <ng-content></ng-content>
      </cui-list>
    </ng-template>
  `,
  styles: [],
  host: {
    class: 'cui-input-group cui-select'
  }
})
export class SelectComponent implements OnInit, AfterContentChecked, AfterContentInit {

  _selectionModel: SelectionModel<ListItemComponent>;
  private readonly _destroy = new Subject<void>();

  /** @prop Optional CSS button class name | '' */
  @Input() public buttonClass = '';
  /** @prop Set the default selected option | '' */
  @Input() public defaultValue: string = null;
  /** @prop Set ID for Select Component | null */
  @Input() public id = null;
  /** @prop Optional prop to know if user is able to select multiple options | false */
  @Input() public isMulti = false;
  /** @option Callback function invoked by user selecting an interactive option within list | null */
  @Output() select = new EventEmitter();

  @ViewChild(ButtonComponent) originButton;
  @ContentChildren(ListItemComponent) selectOptions: QueryList<ListItemComponent>;

  public state: IState;

  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<OptionSelectionChange> = defer(() => {
    if (this.selectOptions) {
      return merge(...this.selectOptions.map(option => option.selectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  }) as Observable<OptionSelectionChange>;


  constructor(private cd: ChangeDetectorRef, private _ngZone: NgZone) {
    this.optionSelectionChanges.subscribe(event => {
      this._onSelect(event.source);
    });

    this.state = {
      isOpen: false,
      selected: [],
      anchorWidth: null,
      id: uniqueId('cui-select-')
    };
  }

  ngOnInit() {
    this._selectionModel = new SelectionModel<ListItemComponent>(this.isMulti);
  }

  ngAfterContentInit() {
    this._selectionModel.changed.pipe(takeUntil(this._destroy)).subscribe(event => {
      event.added.forEach(option => option.select());
      event.removed.forEach(option => option.deselect());
    });

    // set up children with props
    this.selectOptions.forEach((option) => {
      option.isMulti = this.isMulti;
    });

    this.cd.detectChanges();
  }

  ngAfterContentChecked() {
    this._setAnchorWidth(this.originButton.el.nativeElement);
  }

  public get buttonClasses(): string {
    return 'cui-button--input' +
      `${(this.buttonClass && ` ${this.buttonClass}`) || ''}`;
  }

  currentValue = () => {
    const { selected } = this.state;
    if (!this.isMulti && selected.length) {
      return selected[0].label;
    }
    if (selected.length === 1) {
      return `${selected.length} Item Selected`;
    } else if (selected.length) {
      return `${selected.length} Items Selected`;
    }
  }

  /** Invoked when an option is clicked. */
  private _onSelect(option: ListItemComponent): void {
    if (!this.isMulti) { this.state.isOpen = false; }
    option.active ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
    this.state.selected = this._selectionModel.selected;
    if (this.select) {
      return this.select.emit(this.state.selected);
    }
  }

  private _setAnchorWidth = elementAnchor => {
    const anchor = elementAnchor && elementAnchor.getBoundingClientRect();
    this.state.anchorWidth = anchor.width;
  }
}
