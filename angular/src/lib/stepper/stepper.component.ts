import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'md-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit, AfterViewInit {
  @Input() public steps: {
    title: string,
    fields?: FormControl[],
    disabled?: boolean
  }[];
  @Input() private stepNumber: number;
  @Output() stepChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.stepNumber = 0;
  }

  ngAfterViewInit() {
    this.steps.forEach((step, index) => {
      if (index) {
        const start = (document.getElementById('step' + (index - 1)));
        const end = (document.getElementById('step' + index));
        const line = (document.getElementById('line' + index));
        const x1 = start.offsetLeft + (start.offsetWidth * 1.5);
        const y1 = start.offsetTop + (start.offsetHeight / 2);
        const x2 = end.offsetLeft - (end.offsetWidth * .5);
        const y2 = end.offsetTop + (end.offsetHeight / 2);
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
      }

    });
  }

  public onClick(index): void {
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
    console.log(index);
    console.log(this.hasErrors(step.fields));
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
