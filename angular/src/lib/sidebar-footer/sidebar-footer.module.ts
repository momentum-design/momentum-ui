import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarFooterComponent } from './sidebar-footer.component';

@NgModule({
  declarations: [SidebarFooterComponent],
  imports: [
    CommonModule
  ],
  exports: [SidebarFooterComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SidebarFooterModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SidebarFooterModule,
      providers: [],
    };
  }
}
