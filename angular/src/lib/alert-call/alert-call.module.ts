import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AvatarModule } from '../avatar';
import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { ListModule } from '../list';
import { ListItemModule } from '../list-item';
import { ListItemHeaderModule } from '../list-item-header';
import { ListItemSectionModule } from '../list-item-section';
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
export class AlertCallModule {}
