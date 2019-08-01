/** @component modal */

import {
  Component,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ModalContent, ModalRef } from './modal-ref';

export type SizeType =
  | 'large'
  | 'medium'
  | 'default'
  | 'small'
  | 'full'
  | 'dialog';

@Component({
  selector: 'md-modal',
  template: `
    <div
      role="dialog"
      id="{{htmlId}}"
      class="md-modal md-modal--{{sizeType}} in {{class}}"
      attr.aria-labelledby="{{ariaLabel}}"
      aria-modal="true"
    >
      <div class="md-modal__content" cdkTrapFocus >
        <div class="md-modal__flex-container">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .md-modal.md-modal--full {
      position: static;
    }
  `]
})
export class ModalComponent implements OnInit, AfterViewInit {
  /** @prop Determines the visibility and ability to edit the backdrop of the Modal | true */
  @Input() public backdrop: Boolean = true;

  private _classList: '';
  /** @propptional css class names | '' */
  @Input()
  set class(value) {
    this._classList = value;
  }
  get class() {
    return this._classList;
  }

  /** @prop size of the modal | 'default' */
  @Input() public sizeType: SizeType = 'default';

  /** @prop htmlId for modal | 'md-modal' */
  @Input() public htmlId: String = 'md-modal';

   /** @prop ariaLabel for modal | '' */
   @Input() public ariaLabel: String = '';

   /** @option data array of data for modal | [] */
   @Input() public data: [];


   public content: ModalContent;
   public context;

   constructor(
      private modalRef: ModalRef,
      private _elRef: ElementRef,
      private _focusTrapFactory: FocusTrapFactory
    ) {}

    ngAfterViewInit() {
      this._trapFocus();
    }

    ngOnInit() {
      this.content = this.modalRef.content;
      this.context = {
        close: this.modalRef.close.bind(this.modalRef)
      };

    }

    private _trapFocus() {
      // creates a focus trap region
      const focusTrap = this._focusTrapFactory.create(this._elRef.nativeElement);
      // Moves the focus in the form (by default the first field)
      focusTrap.focusInitialElement();
    }

}
