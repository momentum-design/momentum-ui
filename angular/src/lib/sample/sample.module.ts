import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleComponent } from './sample.component';

@NgModule({
  declarations: [SampleComponent],
  imports: [CommonModule],
  exports: [SampleComponent],
})
export class SampleModule {}
