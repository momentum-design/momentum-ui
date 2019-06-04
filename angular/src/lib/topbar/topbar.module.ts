import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { ListModule } from '../list/list.module';
import { ListItemModule } from '../list-item/list-item.module';
import { ListSeparatorModule } from '../list-separator/list-separator.module';
import { TopbarComponent } from './topbar.component';
import { TopbarBrandComponent } from './topbar-brand.component';
import { TopbarMobileComponent } from './topbar-mobile.component';
import { TopbarNavComponent } from './topbar-nav.component';
import { TopbarRightComponent } from './topbar-right.component';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    ListModule,
    ListItemModule,
    ListSeparatorModule,
  ],
  declarations: [
    TopbarComponent,
    TopbarBrandComponent,
    TopbarMobileComponent,
    TopbarNavComponent,
    TopbarRightComponent,
  ],
  exports: [
    TopbarComponent,
    TopbarBrandComponent,
    TopbarMobileComponent,
    TopbarNavComponent,
    TopbarRightComponent,
  ],
})
export class TopbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TopbarModule,
      providers: [],
    };
  }
}
