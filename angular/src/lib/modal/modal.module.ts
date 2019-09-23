import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModalComponent } from './modal.component';
import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalContainerComponent } from './modal-container.component';
import { ModalService } from './modal.service';



@NgModule({
  declarations: [
    ModalComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalContainerComponent
  ],
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule
  ],
  exports: [
    ModalComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalContainerComponent
  ],
  entryComponents: [ModalContainerComponent],
  providers: [ModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModalModule,
      providers: [],
    };
  }
}
