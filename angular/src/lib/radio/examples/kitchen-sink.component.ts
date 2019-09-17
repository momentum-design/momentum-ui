import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'example-radio-kitchen-sink',
  template: `
    <ng-template #radios let-groupNumber>
      <form #radioForm1="ngForm">
        <md-radio-group>
          <md-radio
            value="radio"
            name="radio{{ groupNumber }}"
            label="Radio Example"
            htmlId="radio{{ groupNumber }}"
            [(ngModel)]="radioGroup1"
          ></md-radio>
          <md-radio
            value="radioChecked"
            name="radio{{ groupNumber }}"
            label="Radio Checked Example"
            htmlId="radioChecked{{ groupNumber }}"
            [(ngModel)]="radioGroup1"
            [checked]="true"
          ></md-radio>
          <md-radio
            value="radioHelp"
            name="radio{{ groupNumber }}"
            label="Radio Example with help text"
            htmlId="radioHelp{{ groupNumber }}"
            helpText="This is help text for the Radio component"
            [(ngModel)]="radioGroup1"
          ></md-radio>
        </md-radio-group>
      </form>
      <form #radioForm2="ngForm">
        <md-radio-group>
          <md-radio
            value="radioDisabled"
            name="radioDisabled{{ groupNumber }}"
            label="Disabled Radio Example"
            htmlId="radioDisabled{{ groupNumber }}"
            [disabled]="true"
            [(ngModel)]="radioGroup2"
          ></md-radio>
          <md-radio
            value="radioDisabledChecked"
            name="radioDisabledChecked{{ groupNumber }}"
            label="Disabled Radio Checked Example"
            htmlId="radioDisabledChecked{{ groupNumber }}"
            [disabled]="true"
            [checked]="true"
            [(ngModel)]="radioGroup2"
          ></md-radio>
          <md-radio
            value="radioDisabledHelp"
            name="radioDisabledHelp{{ groupNumber }}"
            label="Disabled Radio Example with help text"
            htmlId="radioDisabledHelp{{ groupNumber }}"
            [disabled]="true"
            helpText="This is help text for the Disabled Radio component"
            [(ngModel)]="radioGroup2"
          ></md-radio>
        </md-radio-group>
      </form>
      <form #radioForm3="ngForm">
        <md-radio-group>
          <md-radio
            value="radioReadonly"
            name="radioReadonly{{ groupNumber }}"
            label="Readonly Radio Example"
            htmlId="radioReadonly{{ groupNumber }}"
            [readonly]="true"
            [(ngModel)]="radioGroup3"
          ></md-radio>
          <md-radio
            value="radioReadonlyChecked"
            name="radioReadonlyChecked{{ groupNumber }}"
            label="Readonly Radio Checked Example"
            htmlId="radioReadonlyChecked{{ groupNumber }}"
            [readonly]="true"
            [(ngModel)]="radioGroup3"
          ></md-radio>
          <md-radio
            value="radioReadonlyHelp"
            name="radioReadonlyHelp{{ groupNumber }}"
            label="Readonly Radio Example with help text"
            htmlId="radioReadonlyHelp{{ groupNumber }}"
            [readonly]="true"
            helpText="This is help text for the Disabled Radio component"
            [(ngModel)]="radioGroup3"
          ></md-radio>
        </md-radio-group>
      </form>
      <form #radioForm4="ngForm">
        <md-radio-group>
          <md-radio
            value="radioNested0"
            name="radioNested0{{ groupNumber }}"
            label="Nested Radio Example Level 0"
            htmlId="radioNested0{{ groupNumber }}"
            nestedLevel="0"
            [(ngModel)]="radioGroup4"
          ></md-radio>
          <md-radio
            value="radioNested1"
            name="radioNested1{{ groupNumber }}"
            label="Nested Radio Example Level 1"
            htmlId="radioNested1Checked{{ groupNumber }}"
                      nestedLevel="1"
            [(ngModel)]="radioGroup4"
          ></md-radio>
          <md-radio
            value="radioNested2"
            name="radioNested2{{ groupNumber }}"
            label="Nested Radio Example Level 2"
            htmlId="radioNested2{{ groupNumber }}"
            helpText="This is help text for the Radio component"
            nestedLevel="2"
            [(ngModel)]="radioGroup4"
          ></md-radio>
          <md-radio
            value="radioNested3"
            name="radioNested3{{ groupNumber }}"
            label="Nested Radio Example Level 3"
            htmlId="radioNested3{{ groupNumber }}"
            helpText="This is help text for the Radio component"
            nestedLevel="3"
            [(ngModel)]="radioGroup4"
          ></md-radio>
        </md-radio-group>
      </form>
    </ng-template>

    <div class="row" style="padding: 1rem;">
      <ng-container *ngTemplateOutlet="radios; context: groupOne"></ng-container>
    </div>
    <div class="md--dark row" style="background-color: black; padding: 1rem;">
      <ng-container *ngTemplateOutlet="radios; context: groupTwo"></ng-container>
    </div>
    <div class="md--contrast">
      <div class="row" style="padding: 1rem;">
        <ng-container *ngTemplateOutlet="radios; context: groupThree"></ng-container>
      </div>
      <div class="md--dark row" style="background-color: black; padding: 1rem;">
        <ng-container *ngTemplateOutlet="radios; context: groupFour"></ng-container>
      </div>
    </div>
  `,
})
export class ExampleRadioKitchenSinkComponent {
  radioGroup1 = 'radioChecked';
  radioGroup2 = 'radioDisabledChecked';
  radioGroup3 = 'radioReadonlyChecked';
  radioGroup4 = 'radioNested1';

  groupOne = { $implicit: 1 };
  groupTwo = { $implicit: 2 };
  groupThree = { $implicit: 3 };
  groupFour = { $implicit: 4 };
}
