import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from '../checkbox.component';
import { FormsModule } from '@angular/forms';
import { InputHelperModule } from '../../input-helper'
import { LabelModule } from '../../label';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ],
      imports: [FormsModule, LabelModule, InputHelperModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct label to the checkbox', () => {
    component.label = "Label Text"
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const label = inputNativeElement.querySelector('label');

    expect(label.className).toContain("cui-checkbox__label");
    expect(label.textContent).toMatch("Label Text");
  });


  it('should render a disabled checkbox', () => {
    component.disabled = true;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const checkbox = inputNativeElement.querySelector('.cui-checkbox__input');

    expect(checkbox.disabled).toBe(true);
  });


  it('should render a unchecked checkbox ', () => {
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const checkbox = inputNativeElement.querySelector('.cui-checkbox__input');

    expect(checkbox.checked).toBe(false);
  });


  it('should render a indeterminate checkbox ', () => {
    component.indeterminate = true;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const checkbox = inputNativeElement.querySelector('.indeterminate');

    expect(checkbox.className).toContain('indeterminate');
  });


  it('should render a required checkbox ', () => {
    component.required = true;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const checkbox = inputNativeElement.querySelector('.cui-checkbox__input');

    expect(checkbox.required).toBe(true);
  });


  it('should render a nested checkbox ', () => {
    component.nestedLevel = 1;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const checkbox = inputNativeElement.querySelector('.cui-input--nested-1');

    expect(checkbox.className).toContain("cui-input--nested-1");
  });
});
