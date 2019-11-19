import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { TabHeaderComponent } from './tab-header.component';
import { TabListComponent } from './tab-list.component';
import { TabComponent } from './tab.component';
import { TabContentComponent } from './tab-content.component';
import { TabPaneComponent } from './tab-pane.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TabsComponent,
    TabHeaderComponent,
    TabListComponent,
    TabComponent,
    TabContentComponent,
    TabPaneComponent
  ],
  exports: [
    TabsComponent,
    TabHeaderComponent,
    TabListComponent,
    TabComponent,
    TabContentComponent,
    TabPaneComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TabsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TabsModule,
      providers: [],
    };
  }
}
