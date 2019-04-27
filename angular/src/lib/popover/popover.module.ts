import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';
import { PopoverContainerComponent } from './popover-container.component';


@NgModule({
  declarations: [PopoverComponent, PopoverDirective, PopoverContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [PopoverComponent, PopoverDirective, PopoverContainerComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ PopoverContainerComponent ]
})
export class PopoverModule { }
