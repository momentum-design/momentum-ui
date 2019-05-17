import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavComponent } from './sidebar-nav.component';

@NgModule({
  declarations: [SidebarNavComponent],
  imports: [
    CommonModule,
  ],
  exports: [SidebarNavComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SidebarNavModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SidebarNavModule,
      providers: [],
    };
  }
}
