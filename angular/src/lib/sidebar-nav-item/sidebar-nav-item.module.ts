import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavItemComponent } from './sidebar-nav-item.component';
import { AvatarModule } from '../avatar/avatar.module';

@NgModule({
  imports: [
    CommonModule,
    AvatarModule,
  ],
  exports: [SidebarNavItemComponent],
  declarations: [SidebarNavItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarNavItemModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SidebarNavItemModule,
      providers: [],
    };
  }
}
