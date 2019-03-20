import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-editable-textfield-default',
  template: `
    <cui-editable-textfield
      (handleDoneEditing) = "finishEdit($event)"
      [(ngModel)]="editValue">
    </cui-editable-textfield>
  `,
  styles: []
})
export class EditableTextfieldDefaultComponent {

  editValue = "Hello World"

  finishEdit(e) {
    console.log('Finish Editing: ', e);
  }
  constructor() { }

}
