import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipContainerComponent } from './tooltip-container.component';


@NgModule({
  declarations: [TooltipComponent, TooltipDirective, TooltipContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [TooltipComponent, TooltipDirective, TooltipContainerComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ TooltipContainerComponent ]
})
export class TooltipModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TooltipModule,
      providers: [],
    };
  }
}
