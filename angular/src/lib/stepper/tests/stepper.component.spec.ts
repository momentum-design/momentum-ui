import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperComponent } from './../stepper.component';
import { Validators, FormBuilder } from '@angular/forms';
let fb: FormBuilder;
describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepperComponent],
      providers: [FormBuilder],
    }).compileComponents();
    fb = TestBed.get(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    const formGroup = fb.group({
      password: ['123', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      confirmPassword: [[], [Validators.required]],
    });
    formGroup.controls['password'].markAsTouched();
    const inputMethod = fixture.debugElement.componentInstance;
    inputMethod.steps = [
      {
        title: 'Test',
        fields: [],
      },
      {
        title: 'Test 1',
        fields: [],
        disabled: true,
      },
      {
        title: 'Test 3',
      },
      {
        title: 'Test 2',
        fields: [formGroup.controls['password'], formGroup.controls['confirmPassword']],
      },
    ];
    inputMethod.stepNumber = 1;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit proper step change when on click is called', () => {
    component.onClick(3);
    expect(component.stepChange.hasError).toBeFalsy();
    component.onClick(1);
    expect(component.stepChange.hasError).toBeFalsy();
  });
});
describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepperComponent],
      providers: [FormBuilder],
    }).compileComponents();
    fb = TestBed.get(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    const inputMethod = fixture.debugElement.componentInstance;
    inputMethod.steps = [''];
    inputMethod.stepNumber = 1;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
