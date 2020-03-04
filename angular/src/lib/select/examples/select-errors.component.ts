import { Component } from '@angular/core';

@Component({
  selector: 'example-select-errors',
  template: `
    <div class="medium-8 columns">
      <md-select
        [options]="options"
        [(ngModel)]="selection"
        placeholder="Select an option"
        (handleChange)="onChange($event)"
        optionLabel="choice"
        buttonClass="custom-button-class"
        [buttonStyle]="{width: '80%'}"
        scrollHeight="350px"
        [isWarn]="isWarn"
        [isError]="isError"
        [warnMsg]="warningMessage"
        [errorMsg]="errorMessage"
        overlayClass="testOverlayClass" >
      </md-select>
    </div>

  <p> ngModel: {{selection ? selection.choice : 'none'}} <p>
  `,
  styles: []
})
export class SelectErrorsComponent {
  warningMessage = 'This is a sample warning message.';
  errorMessage = 'This is a sample error message.';
  isWarn: boolean;
  isError: boolean;
  selection;
  options;

  constructor() {
    this.options = [
      { choice: 'Good' },
      { choice: 'Warning' },
      { choice: 'Error' },
      { choice: 'Error and Warning' }
    ];
  }

  onChange(e) {
    if (e.value.choice === 'Warning' || e.value.choice === 'Error and Warning') {
      this.isWarn = true;
    } else {
      this.isWarn = false;
    }

    if (e.value.choice === 'Error' || e.value.choice === 'Error and Warning') {
      this.isError = true;
    } else {
      this.isError = false;
    }
  }
}
