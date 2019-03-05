import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [ModalComponent],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
