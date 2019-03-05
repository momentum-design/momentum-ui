import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { InputComponent } from './input.component';
import { LabelModule } from '../label';
import { InputErrorModule } from '../input-error'
import { InputHelperModule } from '../input-helper'
import { IconModule } from '../icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    InputErrorModule,
    InputHelperModule,
    IconModule
  ],
  exports: [InputComponent]
})
export class InputModule { }
