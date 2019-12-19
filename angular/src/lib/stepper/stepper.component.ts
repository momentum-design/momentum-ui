import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'md-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  @Input() public steps: {
    title: string,
    fields: FormControl[]
  }[];
  @Input() private stepNumber: number;
  @Output() stepChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.stepNumber = 0;
  }

  public onclick(index): void {
    this.stepNumber = index;
    this.stepChange.emit(index);
  }

  private isComplete(fields: FormControl[]): boolean {
    if (fields) {
      const incompleteField = fields.find((field: FormControl) => {
        return (field.value === '') ||
          (Array.isArray(field.value) && field.value.length === 0) ||
          (field.value === null) || (field.value === undefined);
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
      'active': index === this.stepNumber,
      'md-step-incomplete': !this.isComplete(step.fields),
      'md-step-error': this.hasErrors(step.fields),
      'md-step-complete': !this.hasErrors(step.fields) && this.isComplete(step.fields),
      'md-step-disabled': step.disabled
    };
    return classes;
  }

}
