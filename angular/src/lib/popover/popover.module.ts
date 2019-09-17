import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopoverDirective } from './popover.directive';


@NgModule({
  declarations: [ PopoverDirective ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [ PopoverDirective ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class PopoverModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PopoverModule,
      providers: [],
    };
  }
 }
