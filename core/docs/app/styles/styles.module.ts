import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ColorsComponent } from './colors/colors.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [ColorsComponent]
})
export class StylesModule { }
