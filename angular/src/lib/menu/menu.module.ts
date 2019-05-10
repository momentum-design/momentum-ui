import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IconModule } from '../icon';
import { ListItemModule } from '../list-item';
import { MenuComponent } from './menu.component';
import { MenuContentComponent } from './menu-content.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';


@NgModule({
  imports: [
    CommonModule,
    IconModule,
    ListItemModule,
    OverlayModule,
  ],
  declarations: [
    MenuComponent,
    MenuContentComponent,
    MenuItemComponent,
    MenuTriggerDirective,
  ],
  exports: [
    MenuComponent,
    MenuContentComponent,
    MenuItemComponent,
    MenuTriggerDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuModule {}
