import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { LoadingModule } from '../loading/loading.module';
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
