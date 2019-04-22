import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-editable-textfield-default',
  template: `
    <md-editable-textfield
      (handleDoneEditing)="finishEdit($event)"
      [(ngModel)]="editValue"
    >
    </md-editable-textfield>
  `,
  styles: [],
})
export class EditableTextfieldDefaultComponent {
  editValue = 'Hello World';

  finishEdit(e) {
    console.info('Finish Editing: ', e);
  }
  constructor() {}
}
