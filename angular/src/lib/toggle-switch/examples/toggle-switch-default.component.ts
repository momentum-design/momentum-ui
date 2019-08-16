import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'example-toggle-switch-default',
  template: `
    <md-toggle-switch
      label="Test Label"
      [(ngModel)]="bool"
      (change)="onToggle($event)"
      [disabled]="false"
      htmlId="testToggleSwitch1"
    >
    </md-toggle-switch>

    ngModel: {{ bool }}
  `,
  styles: [],
})
export class ToggleSwitchDefaultComponent {
  bool = false;

  constructor() {}

  onToggle(event) {
    console.info('emitter: ', event.checked);
  }
}
