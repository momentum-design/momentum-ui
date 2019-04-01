import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SliderModule } from '@collab-ui/angular';
import { ExampleSliderDefaultComponent } from './default.component';
import { ExampleSliderCrossComponent } from './cross.component';
import { ExampleSliderStepComponent } from './step.component';
import { ExampleSliderTwoHandlesComponent } from './two-handles.component';

@NgModule({
  declarations: [
    ExampleSliderDefaultComponent,
    ExampleSliderCrossComponent,
    ExampleSliderStepComponent,
    ExampleSliderTwoHandlesComponent,
  ],
  imports: [CommonModule, FormsModule, SliderModule],
  exports: [
    ExampleSliderDefaultComponent,
    ExampleSliderCrossComponent,
    ExampleSliderStepComponent,
    ExampleSliderTwoHandlesComponent,
  ],
})
export class SliderExamplesModule {}
