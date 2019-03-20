import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchDefaultComponent } from './toggle-switch-default.component';

import { ToggleSwitchModule } from '@collab-ui/angular';

@NgModule({
  declarations: [ToggleSwitchDefaultComponent],
  imports: [
    CommonModule,
    ToggleSwitchModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ToggleSwitchDefaultComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ToggleSwitchExamplesModule { }
