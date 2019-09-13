import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, NgModel } from '@angular/forms';
import { Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'example-input-default',
  template: `
    <md-input-group
      label='Success not Reactive'
      containerSize='small-12'
      [messageArr]="[{
        message: 'This is where the success message would be.
          This is where the success message would be.
          This is where the success message would be.
          This is where the success message would be.
          This is where the success message would be.
          This is where the success message would be.',
        type: 'success'
      }]"
    >
      <input
        mdInput
        name='success-default'
        value='Success Default'
      />
    </md-input-group>
    <md-input-group
      label='Warning not Reactive'
      containerSize='small-12'
      [messageArr]="[{
        message: 'This is where the warning message would be.',
        type: 'warning'
      }]"
    >
      <input
        mdInput
        name='warning-default'
        value='Warning Default'
      />
    </md-input-group>
    <md-input-group
      label='Error not Reactive'
      containerSize='small-12'
      [messageArr]="[{
        message: 'This is where the error message would be.',
        type: 'error'
      }]"
    >
      <input
        mdInput
        name='error-default'
        value='Error Default'
      />
    </md-input-group>
    <md-input-group
      label='Dual Warnings'
      containerSize='small-12'
      [messageArr]="[
        {
          message: 'This is where the warning message would be.',
          type: 'warning'
        },
        {
          message: 'This is where the warning message would be.',
          type: 'warning'
        }
      ]"
    >
      <input
        mdInput
        name='dual-warning'
        value='Dual Warning Default'
      />
    </md-input-group>
    <md-input-group
      label='Error and Warning'
      containerSize='small-12'
      [messageArr]="[
        {
          message: 'This is where the error message would be.',
          type: 'error'
        },
        {
          message: 'This is where the warning message would be.',
          type: 'warning'
        }
      ]"
    >
      <input
        mdInput
        name='error-warning'
        value='Error & Warning Default'
      />
    </md-input-group>
    <form [formGroup]='inputForm'>
      <md-input-group 
        containerSize='small-12'  
        label='Success' 
        [status]="inputForm.controls.success.valid ? 'success' : ''"
      >
        <input
          mdInput
          formControlName="success"
          name='success'
        />
        <md-input-message *ngIf="inputForm.controls.success.valid">success</md-input-message>
      </md-input-group>
      <md-input-group 
        containerSize='small-12'  
        label='Warning ReactiveForm' 
        [status]="warningReactive ? 'warning' : ''"
      >
        <input
          mdInput
          formControlName="warning"
          name='warning'
        />
        <md-input-message *ngIf="warningReactive">Reactive should lowercase</md-input-message>
      </md-input-group>
      <md-input-group 
        containerSize='small-12'  
        label='Error ReactiveForm' 
        [status]="warningReactive && 'warning'"
      >
        <input
          mdInput
          formControlName='error'
        />
        <md-input-message *ngIf="error.hasError('minlength')">Should be 40 characters long</md-input-message>
        <md-input-message *ngIf="warningReactive && !error.invalid">Reactive should lowercase</md-input-message>
      </md-input-group>
    </form>
    <form>
      <md-input-group 
        containerSize='small-12' 
        label='Success with NgForm' 
        [status]="st.valid ? 'success' : ''"
      >
        <input
          mdInput
          name="success-template"
          [(ngModel)]="templateValue"
          #st="ngModel"
          minlength="3"
        />
        <md-input-message *ngIf="st.valid">success</md-input-message>
      </md-input-group>
      <md-input-group 
        containerSize='small-12' 
        label='Success with NgForm' 
        [status]="warningTemplate ? 'warning' : ''"
      >
        <input
          mdInput
          name="warning-template"
          [(ngModel)]="templateValue"
          #st="ngModel"
        />
        <md-input-message *ngIf="warningTemplate">Template should be lowercase</md-input-message>
      </md-input-group>
    </form>
    <md-input-group label='Input Size' containerSize="small-12" inputSize="small-6">
      <input
        mdInput
        [(ngModel)]="inputSize"
        placeholder='InputSize'
      />
    </md-input-group>
    <md-input-group label='Default' containerSize="small-12">
      <input
        mdInput
        [(ngModel)]="default"
        placeholder='Default'
      />
    </md-input-group>
    <md-input-group label='Pill' containerSize="small-12">
      <input
        mdInput
        [(ngModel)]="pill"
        shape='pill'
        placeholder='pill'
      />
    </md-input-group>
    <md-input-group label='Multiline' containerSize="small-12">
      <textarea
        mdInput
        [(ngModel)]="multiline"
        placeholder='Multiline'
      ></textarea>
    </md-input-group>
    <md-input-group label='Read Only' containerSize="small-12">
      <input
        mdInput
        readonly
        [(ngModel)]="readonly"
        placeholder='Read Only'
      />
    </md-input-group>
    <md-input-group label='Disabled' containerSize="small-12">
      <input
        mdInput
        disabled
        [(ngModel)]="disabled"
        placeholder='Disabled'
      />
    </md-input-group>
    <md-input-group label='Input Before' containerSize="small-12">
      <md-input-section position='before'>
        <md-icon
          name="clear-active_16"
        ></md-icon>
      </md-input-section>
      <input
        mdInput
        [(ngModel)]="inputBefore"
        placeholder='Input Before'
      />
    </md-input-group>
    <md-input-group label='Input After' containerSize="small-12">
      <md-input-section position='after'>
        <md-icon
          name="clear-active_16"
        ></md-icon>
      </md-input-section>
      <input
        mdInput
        [(ngModel)]="inputAfter"
        placeholder='Input After'
      />
    </md-input-group>
    <md-input-group 
      [clear]='true' 
      clearAriaLabel='Clear Input Field' 
      containerSize="small-12"
      label='Clear'
    > 
      <input
        mdInput
        [(ngModel)]="clear"
        placeholder='Clear'
      />
    </md-input-group>
    <md-input-group label='Hint' inputHelpText="Hint label" containerSize="small-12">
      <input
        mdInput
        [(ngModel)]="hint"
        placeholder='Hint'
      />
    </md-input-group>

    <md-input-group label='FilledDefault' [isFilled]="true" containerSize="small-12">
      <input
        mdInput
        [(ngModel)]="Filleddefault"
        placeholder='FilledDefault'
      />
    </md-input-group>
    <md-input-group label='FilledPill' [isFilled]="true" containerSize="small-12">
      <input
        mdInput
        [(ngModel)]="Filledpill"
        shape='Filledpill'
        placeholder='Filledpill'
      />
    </md-input-group>
    <md-input-group label='FilledMultiline' [isFilled]="true" containerSize="small-12">
      <textarea
        mdInput
        [(ngModel)]="Filledmultiline"
        placeholder='FilledMultiline'
      ></textarea>
    </md-input-group>
    <md-input-group label='Filled Read Only' [isFilled]="true" containerSize="small-12">
      <input
        mdInput
        readonly
        [(ngModel)]="Filledreadonly"
        placeholder='Filled Read Only'
      />
    </md-input-group>
    <md-input-group label='FilledDisabled' [isFilled]="true" containerSize="small-12">
      <input
        mdInput
        disabled
        [(ngModel)]="Filleddisabled"
        placeholder='FilledDisabled'
      />
    </md-input-group>
    <md-input-group label='Filled Input Before' [isFilled]="true" containerSize="small-12">
      <input
        mdInput
        [(ngModel)]="FilledinputBefore"
        placeholder='Filled Input Before'
      />
    </md-input-group>
    <md-input-group label='Filled Input After' [isFilled]="true" containerSize="small-12">
      <input
        mdInput
        [(ngModel)]="filledinputAfter"
        placeholder='Filled Input After'
      />
    </md-input-group>
    <md-input-group label='Filled Clear' [clear]='true' [isFilled]="true" containerSize="small-12">
      <input
        mdInput
        [(ngModel)]="filledclear"
        placeholder='Filled Clear'
      />
    </md-input-group>
    <md-input-group label='Hint' inputHelpText="Filled Hint label" [isFilled]="true" containerSize="small-12">
      <input
        mdInput
        [(ngModel)]="filledhint"
        placeholder='Filled Hint'
      />
    </md-input-group>
  `,
})

export class ExampleInputDefaultComponent implements OnInit {
  warningReactive: boolean;
  warningTemplate: boolean;
  templateValue: string = 'Template Version';
  inputForm: any;

  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      success: ['ReactiveForm Version', Validators.minLength(4)],
      warning: ['ReactiveForm Version', this.ValidateCustom],
      error: ['ReactiveForm Version', Validators.compose([
        Validators.minLength(40),
        this.ValidateCustom
      ])]
    });
  }

  ngOnInit() {
    this.warningTemplate = !this.templateValue.startsWith('warning');
    this.error.markAsDirty();
  }

  get error() { return this.inputForm.get('error'); }

  private ValidateCustom = (control: AbstractControl) => {
    this.warningReactive = !control.value.startsWith('reactive');

    return null;
  }
}


