import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'example-input-kitchen-sink',
  template: `
    <ng-template #inputTemplate>
      <md-input-container
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
      </md-input-container>
      <md-input-container
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
      </md-input-container>
      <md-input-container
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
      </md-input-container>
      <md-input-container
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
      </md-input-container>
      <md-input-container
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
      </md-input-container>
      <form [formGroup]="inputForm">
        <md-input-container
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
        </md-input-container>
        <md-input-container
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
        </md-input-container>
        <md-input-container
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
        </md-input-container>
      </form>
      <form>
        <md-input-container
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
        </md-input-container>
        <md-input-container
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
        </md-input-container>
      </form>
      <md-input-container
        label='Default'
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Input Size'
        containerSize="small-12"
        inputSize="small-6"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Pill'
        containerSize="small-12"
      >
        <input
          mdInput
          shape='pill'
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Multiline'
        containerSize="small-12"
      >
        <textarea
          mdInput
          placeholder='Placeholder Text'
        ></textarea>
      </md-input-container>
      <md-input-container
        label='Nested 1'
        nestedLevel="1"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Nested 2'
        nestedLevel="2"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Nested 3'
        nestedLevel="3"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Read Only'
        containerSize="small-12"
      >
        <input
          mdInput
          readonly
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Disabled'
        containerSize="small-12"
      >
        <input
          mdInput
          disabled
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Disabled Value'
        containerSize="small-12"
      >
        <input
          mdInput
          disabled
          value='With Value'
        />
      </md-input-container>
      <md-input-container
        label='Disabled Read Only'
        containerSize="small-12"
      >
        <input
          mdInput
          disabled
          readonly
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Placeholder'
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        [clear]='true'
        clearAriaLabel='Clear Input Field'
        containerSize="small-12"
        label='Clear'
      >
        <input
          mdInput
          placeholder='Clear'
        />
      </md-input-container>
      <md-input-container
        label='Input After'
        containerSize="small-12"
      >
        <md-input-section position='after'>
          <md-icon
            name="clear-active_16"
          ></md-icon>
        </md-input-section>
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Input Before'
        containerSize="small-12"
      >
        <md-input-section position='before'>
          <md-icon
            name="clear-active_16"
          ></md-icon>
        </md-input-section>
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Input Before Disabled'
        containerSize="small-12"
      >
        <md-input-section position='before'>
          <md-icon
            name="clear-active_16"
          ></md-icon>
        </md-input-section>
        <input
          mdInput
          disabled
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Input Before & Clear'
        containerSize="small-12"
        [clear]='true'
      >
        <md-input-section position='before'>
          <md-icon
            name="clear-active_16"
          ></md-icon>
        </md-input-section>
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Help Text'
        helpText="Help label"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Secondary Label'
        secondaryLabel="Secondary Label"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Disabled Secondary Label'
        secondaryLabel="Secondary Label"
        containerSize="small-12"
      >
        <input
          disabled
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Secondary/Help Label'
        helpText="Help label"
        secondaryLabel="Secondary Label"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Disabled Secondary/Help Label'
        helpText="Help label"
        secondaryLabel="Secondary Label"
        containerSize="small-12"
      >
        <input
          disabled
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>

      <!-- Filled Inputs -->

      <md-input-container
        label='Filled Default'
        [isFilled]="true"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Pill'
        [isFilled]="true"
        containerSize="small-12"
      >
        <input
          mdInput
          shape='Filledpill'
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Multiline'
        [isFilled]="true"
        containerSize="small-12"
      >
        <textarea
          mdInput
          placeholder='Placeholder Text'
        ></textarea>
      </md-input-container>
      <md-input-container
        label='Filled Read Only'
        [isFilled]="true"
        containerSize="small-12"
      >
        <input
          mdInput
          readonly
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Disabled'
        [isFilled]="true"
        containerSize="small-12"
      >
        <input
          mdInput
          disabled
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Disabled Read Only'
        [isFilled]="true"
        containerSize="small-12"
      >
        <input
          mdInput
          disabled
          readonly
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Input Before'
        [isFilled]="true"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Input After'
        [isFilled]="true"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Clear'
        [clear]='true'
        [isFilled]="true"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Hint'
        helpText="Filled Hint label"
        [isFilled]="true"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Input Before & Clear'
        [isFilled]="true"
        containerSize="small-12" [clear]='true'
      >
        <md-input-section position='before'>
          <md-icon
            name="clear-active_16"
          ></md-icon>
        </md-input-section>
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Help Text'
        [isFilled]="true"
        helpText="Help label"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Secondary Label'
        [isFilled]="true"
        secondaryLabel="Secondary Label"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Disabled Secondary Label'
        [isFilled]="true"
        secondaryLabel="Secondary Label"
        containerSize="small-12"
      >
        <input
          disabled
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Secondary/Help Label'
        [isFilled]="true"
        helpText="Help label"
        secondaryLabel="Secondary Label"
        containerSize="small-12"
      >
        <input
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
      <md-input-container
        label='Filled Disabled Secondary/Help Label'
        [isFilled]="true"
        helpText="Help label"
        secondaryLabel="Secondary Label"
        containerSize="small-12"
      >
        <input
          disabled
          mdInput
          placeholder='Placeholder Text'
        />
      </md-input-container>
    </ng-template>

    <div class="row" style="padding: 1rem;">
      <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
    </div>
    <div class="md--dark row" style="background-color: black; padding: 1rem;">
      <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
    </div>
    <div class="md--contrast">
      <div class="row" style="padding: 1rem;">
        <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
      </div>
      <div class="md--dark row" style="background-color: black; padding: 1rem;">
        <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
      </div>
    </div>
  `,
})

export class ExampleInputKitchenSinkComponent implements OnInit {
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


