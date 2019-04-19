import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupModule, ButtonModule, IconModule } from '@momentum-ui/angular';
import { ExampleButtonGroupDefaultComponent } from './default.component';
import { ExampleButtonGroupHighlightFalseComponent } from './highlight-false.component';
import { ExampleButtonGroupJustifiedFalseComponent } from './justified-false.component';
import { ExampleButtonGroupPillComponent } from './pill.component';

@NgModule({
  declarations: [
    ExampleButtonGroupDefaultComponent,
    ExampleButtonGroupHighlightFalseComponent,
    ExampleButtonGroupJustifiedFalseComponent,
    ExampleButtonGroupPillComponent,
  ],
  imports: [
    ButtonGroupModule,
    ButtonModule,
    CommonModule,
    IconModule,
  ],
  exports: [
    ExampleButtonGroupDefaultComponent,
    ExampleButtonGroupHighlightFalseComponent,
    ExampleButtonGroupJustifiedFalseComponent,
    ExampleButtonGroupPillComponent,
  ],
})
export class ButtonGroupExamplesModule {}
