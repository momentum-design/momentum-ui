import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { CallControlComponent } from './call-control.component';

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule],
  declarations: [CallControlComponent],
  exports: [CallControlComponent],
})
export class CallControlModule {}
