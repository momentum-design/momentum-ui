import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'example-select-form',
  template: `
    <div class="medium-8 columns">
      <form [formGroup]="inputForm">
        <md-select
          [options]="people"
          formControlName="selectControl"
          (handleChange)="onChange($event)"
          optionLabel="name"
          placeholder="Select an option"
          [buttonStyle]="{width: '80%'}"
          overlayClass="testOverlayClass" >
        </md-select>
      </form>
    </div>

    <div class="medium-12 columns">
      <div>
        <button (click)="onPatchValue({ name: 'Hannah Brown', initial: 'HB' })">Patch Value w/item</button>&nbsp;
        <button (click)="onPatchValue('')">Patch Null</button>
      </div>
      <div>
        <input [(ngModel)]="inputText"/>&nbsp;
        <button (click)="onPatchValue(inputText)">Patch Value with string '{{inputText}}'</button>
      </div>
      <br>
      form value: {{ inputForm.value.selectControl | json }}
    </div>

  `,
  styles: []
})
export class SelectFormComponent {

  inputText = 'Dwayne Wade';
  people;
  inputForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.people = [
      {name: 'John Jones', initial: 'JJ'},
      {name: 'Lebron James', initial: 'LJ'},
      {name: 'Dwayne Wade', initial: 'DW'},
      {name: 'John Paul Jones', initial: 'JPJ'},
      {name: 'Hannah Brown', initial: 'HB'},
      {name: 'Kobe Bryant', initial: 'KB'},
      {name: 'Tim Duncan', initial: 'TD'},
      {name: 'Reggie Miller', initial: 'RM'},
      {name: 'Steph Curry', initial: 'SC'},
      {name: 'Steve Nash', initial: 'SN'},
      {name: 'James Harden', initial: 'JH'}
    ];

    this.inputForm = this.fb.group({
      selectControl: [null, [Validators.required]],
    });

    console.info(this.inputForm);
  }

  onPatchValue(val) {
    this.inputForm.patchValue({
      selectControl: val
    });
  }

  onChange(e) {
    console.info(e.value);
  }
}
