import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalHeaderComponent } from './modal-header.component';

@NgModule({
  declarations: [ModalHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [ModalHeaderComponent]
})
export class ModalHeaderModule { }
