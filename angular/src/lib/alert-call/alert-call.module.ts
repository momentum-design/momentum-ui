import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { AvatarModule } from '../avatar/avatar.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { ListModule } from '../list/list.module';
import { ListItemModule } from '../list-item/list-item.module';
import { ListItemHeaderModule } from '../list-item-header/list-item-header.module';
import { ListItemSectionModule } from '../list-item-section/list-item-section.module';
import { AlertCallComponent } from './alert-call.component';
import { AlertCallContainerComponent } from './alert-call-container.component';
import { AlertCallService } from './alert-call.service';
import { DeviceListCallComponent } from './device-list-call.component';
import { RemoveHostDirective } from '../utils/directives/remove-host.directive';

@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    CommonModule,
    AvatarModule,
    ButtonModule,
    IconModule,
    ListModule,
    ListItemModule,
    ListItemHeaderModule,
    ListItemSectionModule,
  ],
  declarations: [
    AlertCallComponent,
    AlertCallContainerComponent,
    DeviceListCallComponent,
    RemoveHostDirective,
  ],
  exports: [AlertCallContainerComponent],
  entryComponents: [AlertCallContainerComponent],
  providers: [AlertCallService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertCallModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AlertCallModule,
      providers: [],
    };
  }
}
