import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'example-radio-kitchen-sink',
  template: `
    <ng-template #radios let-groupNumber>
      <form #radioForm="ngForm">
        <md-radio-group>
          <md-radio
            value="radio{{ groupNumber }}"
            name="radio{{ groupNumber }}"
            label="Radio Example"
            htmlId="radio{{ groupNumber }}"
            ngModel
          ></md-radio>
          <md-radio
            value="radioChecked{{ groupNumber }}"
            name="radio{{ groupNumber }}"
            label="Radio Checked Example"
            htmlId="radioChecked{{ groupNumber }}"
            ngModel
            [checked]="true"
          ></md-radio>
          <md-radio
            value="radioHelp{{ groupNumber }}"
            name="radio{{ groupNumber }}"
            label="Radio Example with help text"
            htmlId="radioHelp{{ groupNumber }}"
            helpText="This is help text for the Radio component"
            ngModel
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
  // radioForm = new FormGroup({
  //   radioControl: new FormControl('')
  // });
  checked = true;
  groupOne = { $implicit: 1 };
  groupTwo = { $implicit: 2 };
  groupThree = { $implicit: 3 };
  groupFour = { $implicit: 4 };
}
