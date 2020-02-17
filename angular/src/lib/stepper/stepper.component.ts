import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'md-stepper',
  templateUrl: './stepper.component.html'
})

// Refer: https://momentum.design/guidelines/wizards

export class StepperComponent implements OnInit, AfterViewInit {

  /** @prop Set the properties of the steps in the stepper | null */
  @Input() public steps: {
    title: string;  // Step title
    fields?: FormControl[]; // Form fields in the step which is used to validate and display error
    disabled?: boolean; // Set if the step should be disabled
  }[];

  /** @prop Set the step number when it is changed by clicking next button in the Wizard | 0 */
  @Input() private stepNumber: number;

  /** @prop Handler to be called when the step is changed by clicking on a step in the Stepper | null */
  @Output() stepChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.stepNumber = 0;
  }

  ngAfterViewInit() {
    this.drawLines();
  }

  private drawLines(): void {
    this.steps.forEach((step, index) => {
      if (step) {
        const start = document.getElementById('step' + (index - 1));
        const end = document.getElementById('step' + index);
        const line = document.getElementById('line' + index);
        if (start && end && line) {
          const x1 = start.offsetLeft + start.offsetWidth * 1.5;
          const y1 = start.offsetTop + start.offsetHeight / 2;
          const x2 = end.offsetLeft - end.offsetWidth * 0.5;
          const y2 = end.offsetTop + end.offsetHeight / 2;
          line.setAttribute('x1', x1.toString());
          line.setAttribute('y1', y1.toString());
          line.setAttribute('x2', x2.toString());
          line.setAttribute('y2', y2.toString());
        }
      }
    });
  }

  public onClick(index: number): void {
    if (!this.steps[index].disabled) {
      this.stepNumber = index;
      this.stepChange.emit(index);
    }
  }

  private isComplete(fields: FormControl[]): boolean {
    if (fields) {
      const incompleteField = fields.find((field: FormControl) => {
        return (
          field.value === '' ||
          (Array.isArray(field.value) && field.value.length === 0) ||
          field.value === null ||
          field.value === undefined
        );
      });
      return incompleteField === undefined;
    } else {
      return false;
    }
  }

  private hasErrors(fields: FormControl[]): boolean {
    if (fields) {
      const errorField = fields.find((field: FormControl) => {
        return field.touched && field.errors && Object.keys(field.errors).length > 0;
      });
      return errorField !== undefined;
    } else {
      return false;
    }
  }

  public getClasses(index, step): object {
    const classes = {
      active: index === this.stepNumber,
      'md-step-incomplete': !this.isComplete(step.fields),
      'md-step-error': this.hasErrors(step.fields),
      'md-step-complete': !this.hasErrors(step.fields) && this.isComplete(step.fields),
      'md-step-disabled': step.disabled,
    };
    return classes;
  }
}
