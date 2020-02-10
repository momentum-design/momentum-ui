import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'example-stepper-default',
  templateUrl: './stepper-default.component.html'
})
export class ExampleStepperKitchenSinkComponent implements OnInit {

  public testForm = this.fb.group({
    checkedValues: ['', Validators.required],
    radioControl: ['', Validators.required],
    toggle: ['', Validators.required],
    slider: ['', Validators.required],
    inputControl: ['', Validators.minLength(3)]
  });

  public steps = [{
    title: 'Momentum Checkbox',
    fields: [this.testForm.controls['checkedValues']]
  },
  {
    title: 'Momentum Radio Button',
    fields: [this.testForm.controls['radioControl']]
  }, {
    title: 'Momentum Toggle & Slider',
    fields: [this.testForm.controls['toggle'], this.testForm.controls['slider']]
  },
  {
    title: 'Momentum Input',
    fields: [this.testForm.controls['inputControl']]
  },
  {
    title: 'Disabled Screen',
    disabled: true
  },
  {
    title: 'Form Preview',
    fields: Object.values(this.testForm.controls)
  }
  ];

  public stepNumber = 0;



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onStepChange(stepNumber) {
    this.stepNumber = stepNumber;
  }

  next() {
    if (this.stepNumber < 4) {
      this.stepNumber++;
    }
  }

  back() {
    if (this.stepNumber > 0) {
      this.stepNumber--;
    }
  }

  submit() {
  }

}
