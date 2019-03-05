import { Component, OnInit, Input, Output, ViewContainerRef, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import {
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ModalService } from './modal.service';

export type SizeType = 'large' | 'medium' | 'default' | 'small' | 'full' | 'dialog';

@Component({
  selector: 'cui-modal',
  template: `
    <ng-template #overlayGlobalTemplate>
      <div [ngClass]='classes'>
        <div class="cui-modal__content">
          <div class="cui-modal__flex-container">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: ['.overlayerFix{ top:0; }'],
  providers: [ ModalService ]
})
export class ModalComponent implements OnInit {

  /** @prop Determines the visibility and ability to edit the backdrop of the Modal | true */
  @Input() public backdrop: boolean = true;
  /** @prop To enable/disable clicking on underlay to exit modal | false */
  @Input() public backdropClickExit: boolean = false;
  /** @prop Optional css class names | '' */
  @Input() public class: string;
  /** @prop Show/hide modal */
  @Input() public show: boolean = false; //
  /** @prop Size of the modal | 'default' */
  @Input() public sizeType: SizeType = 'default';
  /** @prop Callback function invoked when user clicks on cross button or esc key */
  @Output() whenHide = new EventEmitter();

  @ViewChild('overlayGlobalTemplate') modalContentTemplate: TemplateRef<any>;

  private overlayRef: OverlayRef;
  private tp: TemplatePortal;

  constructor(
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private modalService: ModalService
  ) {}

  get classes() {
    return {
      'cui-modal': true,
      ['cui-modal--' + this.sizeType ]: true,
      'overlayerFix': this.sizeType === 'full',
      [this.class]: this.class
    };
  }

  ngOnInit() {
    const strategy = this.overlay
    .position()
    .global()
    .centerHorizontally()
    .centerVertically();
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: this.backdrop ? 'cui-modal__backdrop' : '',
      positionStrategy: strategy
    });
    this.overlayRef = this.overlay.create(config);
    this.tp = new TemplatePortal(this.modalContentTemplate, this.viewContainerRef);

    if (this.backdropClickExit) {
      this.overlayRef.backdropClick().subscribe(() => {
        this.dismissContent();
      });
    }

    this.modalService.isModalOpened$.subscribe(isOpen => {
      if (isOpen) {
        this.showContent();
      } else {
        this.dismissContent();
      }
    });
    this.modalService.setModalStatus(this.show);
  }

  public showModal = () => {
    this.modalService.setModalStatus(true);
  }

  public closeModal = () => {
    this.modalService.setModalStatus(false);
  }

  private showContent = () => {
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.tp);
    }
  }

  private dismissContent = () => {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayRef.backdropElement.remove();
      this.whenHide.emit();
    }
  }

}

/**
 * @component modal
 * @section class
 * @angular
 *
<cui-modal class='myClass'>
  <cui-modal-header></cui-modal-header>
  <cui-modal-body></cui-modal-body>
  <cui-modal-footer></cui-modal-footer>
</cui-modal>
 */

/**
 * @component modal
 * @section ng-content
 * @angular
 *
<cui-modal>
  <cui-modal-header></cui-modal-header>
  <cui-modal-body></cui-modal-body>
  <cui-modal-footer></cui-modal-footer>
</cui-modal>
 */

 /**
 * @component modal
 * @section backdrop
 * @angular
 *
<cui-modal [backdrop]='false'>
  <cui-modal-header></cui-modal-header>
  <cui-modal-body></cui-modal-body>
  <cui-modal-footer></cui-modal-footer>
</cui-modal>
 */

 /**
 * @component modal
 * @section backdropClickExit
 * @angular
 *
<cui-modal [backdropClickExit]='true'>
  <cui-modal-header></cui-modal-header>
  <cui-modal-body></cui-modal-body>
  <cui-modal-footer></cui-modal-footer>
</cui-modal>
 */

/**
 * @component modal
 * @section show
 * @angular
 *
<cui-modal [show]='true'>
  <cui-modal-header></cui-modal-header>
  <cui-modal-body></cui-modal-body>
  <cui-modal-footer></cui-modal-footer>
</cui-modal>
 */

/**
 * @component modal
 * @section sizeType
 * @angular
 *
<cui-modal sizeType='small'>
  <cui-modal-header></cui-modal-header>
  <cui-modal-body></cui-modal-body>
  <cui-modal-footer></cui-modal-footer>
</cui-modal>
 */

/**
 * @component modal
 * @section whenHide
 * @angular
 *
<cui-modal [whenHide]='onHide()'>
  <cui-modal-header></cui-modal-header>
  <cui-modal-body></cui-modal-body>
  <cui-modal-footer></cui-modal-footer>
</cui-modal>
 */

/**
 * @component modal
 * @section closeModal
 * @angular
 *
<cui-modal>
  <cui-modal-header></cui-modal-header>
  <cui-modal-body></cui-modal-body>
  <cui-modal-footer>
    <a [click]='closeModal()'>close</a>
  </cui-modal-footer>
</cui-modal>
 */

 /**
 * @component modal
 * @section showModal
 * @angular
 *
<cui-modal>
  <cui-modal-header></cui-modal-header>
  <cui-modal-body></cui-modal-body>
  <cui-modal-footer>
    <a [click]='showModal()'>close</a>
  </cui-modal-footer>
</cui-modal>
 */
