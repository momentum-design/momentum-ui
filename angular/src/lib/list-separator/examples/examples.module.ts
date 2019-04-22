import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSeparatorModule } from '@momentum-ui/angular';
import { ExampleListSeparatorDefaultComponent } from './index';

@NgModule({
  imports: [CommonModule, ListSeparatorModule],
  declarations: [ExampleListSeparatorDefaultComponent],
  exports: [ExampleListSeparatorDefaultComponent],
})
export class ListSeparatorExamplesModule {}
