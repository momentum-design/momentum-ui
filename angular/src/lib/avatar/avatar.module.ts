import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { LoadingModule } from '../loading';
import { AvatarComponent } from './avatar.component';

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule, LoadingModule],
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
})
export class AvatarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AvatarModule,
      providers: [],
    };
  }
}
