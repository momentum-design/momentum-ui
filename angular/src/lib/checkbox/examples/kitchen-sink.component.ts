import { Component } from '@angular/core';

@Component({
  selector: 'example-checkbox-kitchen-sink',
  template: `
    <ng-template #checkboxes let-groupNumber>
      <md-checkbox
        name="checkbox{{groupNumber}}"
        label="Checkbox Example"
        [(ngModel)]="checkboxModels[groupNumber]"
        htmlId="checkbox{{groupNumber}}"
        ></md-checkbox>
      <md-checkbox
        name="checkboxChecked{{groupNumber}}"
        label="Checkbox Checked Example"
        [(ngModel)]="checkboxModels[groupNumber]"
        htmlId="checkboxChecked{{groupNumber}}"
        ></md-checkbox>
      <md-checkbox
        name="checkboxIndeterminate{{groupNumber}}"
        label="Checkbox Indeterminate Example"
        [(ngModel)]="checkboxModels[groupNumber]"
        htmlId="checkboxIndeterminate{{groupNumber}}"
        ></md-checkbox>


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
  checkedValues: string[] = [];
  checkboxModels: any = {
    1: {},
    2: {},
    3: {},
    4: {},
  };
  checkboxGroups = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
  };
  groupOne = {$implicit: 1};
  groupTwo = {$implicit: 2};
  groupThree = {$implicit: 3};
  groupFour = {$implicit: 4};
}
