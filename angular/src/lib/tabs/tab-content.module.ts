import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContentComponent } from './tab-content.component';

@NgModule({
  declarations: [TabContentComponent],
  imports: [CommonModule],
  exports: [TabContentComponent],
})
export class TabContentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TabContentModule,
      providers: [],
    };
  }
}
