import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonModule,
  EditableTextfieldModule,
  IconModule,
  ListItemSectionModule,
  MenuModule,
} from '@momentum-ui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExampleMenuDefaultComponent, ExampleMenuCustomMenuItemComponent, ExampleMenuSubmenuComponent } from './index';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    EditableTextfieldModule,
    IconModule,
    ListItemSectionModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ExampleMenuDefaultComponent, ExampleMenuCustomMenuItemComponent, ExampleMenuSubmenuComponent],
  exports: [ExampleMenuDefaultComponent, ExampleMenuCustomMenuItemComponent, ExampleMenuSubmenuComponent],
})
export class MenuExamplesModule {}
