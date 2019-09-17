import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-kitchen-sink',
  template: `
    <ng-template #checkboxes let-groupNumber>
      <md-checkbox-group>
        <md-checkbox
          value="checkbox{{ groupNumber }}"
          name="checkbox{{ groupNumber }}"
          label="Checkbox Example"
          [(ngModel)]="checkedValues"
          htmlId="checkbox{{ groupNumber }}"
        ></md-checkbox>
        <md-checkbox
          value="checkboxChecked{{ groupNumber }}"
          name="checkboxChecked{{ groupNumber }}"
          label="Checkbox Checked Example"
          [(ngModel)]="checkedValues"
          htmlId="checkboxChecked{{ groupNumber }}"
        ></md-checkbox>
        <md-checkbox
          value="checkboxIndeterminate{{ groupNumber }}"
          name="checkboxIndeterminate{{ groupNumber }}"
          label="Checkbox Indeterminate Example"
          [(ngModel)]="checkedValues"
          htmlId="checkboxIndeterminate{{ groupNumber }}"
          [indeterminate]="true"
        ></md-checkbox>
        <md-checkbox
          value="checkboxHelp{{ groupNumber }}"
          name="checkboxHelp{{ groupNumber }}"
          label="Checkbox Example with help text"
          [(ngModel)]="checkedValues"
          htmlId="checkboxHelp{{ groupNumber }}"
          helpText="This is help text for the Checkbox component"
        ></md-checkbox>
      </md-checkbox-group>

      <md-checkbox-group>
        <md-checkbox
          value="checkboxDisabled{{ groupNumber }}"
          name="checkboxDisabled{{ groupNumber }}"
          label="Disabled Checkbox Example"
          [(ngModel)]="checkedValues"
          htmlId="checkboxDisabled{{ groupNumber }}"
          [disabled]="true"
        ></md-checkbox>
        <md-checkbox
          value="checkboxDisabledChecked{{ groupNumber }}"
          name="checkboxDisabledChecked{{ groupNumber }}"
          label="Disabled Checkbox Checked Example"
          [(ngModel)]="checkedValues"
          htmlId="checkboxDisabledChecked{{ groupNumber }}"
          [disabled]="true"
        ></md-checkbox>
        <md-checkbox
          value="checkboxDisabledIndeterminate{{ groupNumber }}"
          name="checkboxDisabledIndeterminate{{ groupNumber }}"
          label="Disabled Checkbox Indeterminate Example"
          [(ngModel)]="checkedValues"
          htmlId="checkboxDisabledIndeterminate{{ groupNumber }}"
          [disabled]="true"
          [indeterminate]="true"
        ></md-checkbox>
        <md-checkbox
          value="checkboxDisabledHelp{{ groupNumber }}"
          name="checkboxDisabledHelp{{ groupNumber }}"
          label="Disabled Checkbox Example with help text"
          [(ngModel)]="checkedValues"
          htmlId="checkboxDisabledHelp{{ groupNumber }}"
          [disabled]="true"
          helpText="This is help text for the Disabled Checkbox component"
        ></md-checkbox>
      </md-checkbox-group>

      <md-checkbox-group>
        <md-checkbox
          value="checkboxReadonly{{ groupNumber }}"
          name="checkboxReadonly{{ groupNumber }}"
          label="Readonly Checkbox Example"
          [(ngModel)]="checkedValues"
          htmlId="checkboxReadonly{{ groupNumber }}"
          [readonly]="true"
        ></md-checkbox>
        <md-checkbox
          value="checkboxReadonlyChecked{{ groupNumber }}"
          name="checkboxReadonlyChecked{{ groupNumber }}"
          label="Readonly Checkbox Checked Example"
          [(ngModel)]="checkedValues"
          htmlId="checkboxReadonlyChecked{{ groupNumber }}"
          [readonly]="true"
        ></md-checkbox>
        <md-checkbox
          value="checkboxReadonlyIndeterminate{{ groupNumber }}"
          name="checkboxReadonlyIndeterminate{{ groupNumber }}"
          label="Readonly Checkbox Indeterminate Example"
          [(ngModel)]="checkedValues"
          htmlId="checkboxReadonlyIndeterminate{{ groupNumber }}"
          [readonly]="true"
          [indeterminate]="true"
        ></md-checkbox>
        <md-checkbox
          value="checkboxReadonlyHelp{{ groupNumber }}"
          name="checkboxReadonlyHelp{{ groupNumber }}"
          label="Readonly Checkbox Example with help text"
          [(ngModel)]="checkedValues"
          htmlId="checkboxReadonlyHelp{{ groupNumber }}"
          [readonly]="true"
          helpText="This is help text for the Disabled Checkbox component"
        ></md-checkbox>
      </md-checkbox-group>

      <md-checkbox-group>
        <md-checkbox
          value="checkboxNested0{{ groupNumber }}"
          name="checkboxNested0{{ groupNumber }}"
          label="Nested Checkbox Example Level 0"
          [(ngModel)]="checkedValues"
          htmlId="checkboxNested0{{ groupNumber }}"
          nestedLevel="0"
        ></md-checkbox>
        <md-checkbox
          value="checkboxNested1{{ groupNumber }}"
          name="checkboxNested1{{ groupNumber }}"
          label="Nested Checkbox Example Level 1"
          [(ngModel)]="checkedValues"
          htmlId="checkboxNested1Checked{{ groupNumber }}"
          helpText="This is help text for the Checkbox component"
          nestedLevel="1"
        ></md-checkbox>
        <md-checkbox
          value="checkboxNested2{{ groupNumber }}"
          name="checkboxNested2{{ groupNumber }}"
          label="Nested Checkbox Example Level 2"
          [(ngModel)]="checkedValues"
          htmlId="checkboxNested2{{ groupNumber }}"
          nestedLevel="2"
        ></md-checkbox>
        <md-checkbox
          value="checkboxNested3{{ groupNumber }}"
          name="checkboxNested3{{ groupNumber }}"
          label="Nested Checkbox Example Level 3"
          [(ngModel)]="checkedValues"
          htmlId="checkboxNested3{{ groupNumber }}"
          helpText="This is help text for the Checkbox component"
          nestedLevel="3"
        ></md-checkbox>
      </md-checkbox-group>
    </ng-template>

    <div class="row" style="padding: 1rem;">
      <ng-container *ngTemplateOutlet="checkboxes; context: groupOne"></ng-container>
    </div>
    <div class="md--dark row" style="background-color: black; padding: 1rem;">
      <ng-container *ngTemplateOutlet="checkboxes; context: groupTwo"></ng-container>
    </div>
    <div class="md--contrast">
      <div class="row" style="padding: 1rem;">
        <ng-container *ngTemplateOutlet="checkboxes; context: groupThree"></ng-container>
      </div>
      <div class="md--dark row" style="background-color: black; padding: 1rem;">
        <ng-container *ngTemplateOutlet="checkboxes; context: groupFour"></ng-container>
      </div>
    </div>
  `,
})
export class ExampleCheckboxKitchenSinkComponent {
  checkedValues: string[] = [
    'checkboxChecked1',
    'checkboxChecked2',
    'checkboxChecked3',
    'checkboxChecked4',
    'checkboxDisabledChecked1',
    'checkboxDisabledChecked2',
    'checkboxDisabledChecked3',
    'checkboxDisabledChecked4',
    'checkboxReadonlyChecked1',
    'checkboxReadonlyChecked2',
    'checkboxReadonlyChecked3',
    'checkboxReadonlyChecked4',
    'checkboxNested11',
    'checkboxNested12',
    'checkboxNested13',
    'checkboxNested14',
  ];

  groupOne = { $implicit: 1 };
  groupTwo = { $implicit: 2 };
  groupThree = { $implicit: 3 };
  groupFour = { $implicit: 4 };
}
