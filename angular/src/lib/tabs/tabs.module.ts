import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';

@NgModule({
  declarations: [TabsComponent],
  imports: [CommonModule],
  exports: [TabsComponent],
})
export class TabsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TabsModule,
      providers: [],
    };
  }
}
