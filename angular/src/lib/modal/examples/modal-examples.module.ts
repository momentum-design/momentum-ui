import { NgModule } from '@angular/core';
import { ButtonModule } from '@momentum-ui/angular';
import { ModalModule } from '@momentum-ui/angular';
import {
  ExampleModalDefaultComponent,
  DefaultModal1Component,
  DefaultModal2Component
} from './modal-default.component';
import {
  ExampleModalSmallComponent,
  SmallModal1Component,
  SmallModal2Component
 } from './modal-small.component';
import {
  ExampleModalLargeComponent,
  LargeModal1Component,
  LargeModal2Component
  } from './modal-large.component';
import {
  ExampleModalFullComponent,
  FullModal1Component,
  FullModal2Component
} from './modal-full.component';

@NgModule({
  declarations: [
    ExampleModalDefaultComponent,
    ExampleModalSmallComponent,
    ExampleModalLargeComponent,
    ExampleModalFullComponent,
    DefaultModal1Component,
    DefaultModal2Component,
    FullModal1Component,
    FullModal2Component,
    LargeModal1Component,
    LargeModal2Component,
    SmallModal1Component,
    SmallModal2Component
  ],
  imports: [
    ModalModule,
    ButtonModule
  ],
  exports: [
    ExampleModalDefaultComponent,
    ExampleModalSmallComponent,
    ExampleModalLargeComponent,
    ExampleModalFullComponent,

  ],
  entryComponents: [
    DefaultModal1Component,
    DefaultModal2Component,
    FullModal1Component,
    FullModal2Component,
    LargeModal1Component,
    LargeModal2Component,
    SmallModal1Component,
    SmallModal2Component
  ]

})
export class ModalExamplesModule { }
