import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputHelperModule } from '../../input-helper';
import { LabelModule } from '../../label';
import { CheckboxModule } from '../checkbox.module';

describe('CheckboxComponent', () => {
  let component: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line: no-use-before-declare
      declarations: [TestAppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, LabelModule, InputHelperModule, CheckboxModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    // tslint:disable-next-line: no-use-before-declare
    fixture = TestBed.createComponent(TestAppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct label to the checkbox', () => {
    component.label = 'Label Text';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const label = inputNativeElement.querySelector('label');

    expect(label.className).toContain('md-checkbox__label');
    expect(label.textContent).toMatch('Label Text');
  });

  it('should render a disabled checkbox', () => {
    component.disabled = true;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const checkbox = inputNativeElement.querySelector('.md-checkbox__input');

    expect(checkbox.disabled).toBe(true);
  });

  it('should render a unchecked checkbox ', () => {
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const checkbox = inputNativeElement.querySelector('.md-checkbox__input');

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
    const checkbox = inputNativeElement.querySelector('.md-checkbox__input');

    expect(checkbox.required).toBe(true);
  });

  it('should render a nested checkbox ', () => {
    component.nestedLevel = 1;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const checkbox = inputNativeElement.querySelector('.md-input--nested-1');

    expect(checkbox.className).toContain('md-input--nested-1');
  });
});

@Component({
  selector: 'test-app',
  template: `
    <md-checkbox
      [name]="name"
      [value]="value"
      [required]="required"
      [label]="label"
      [(ngModel)]="checkedValues"
      [htmlId]="val1"
      [disabled]="disabled"
    >
    </md-checkbox>

    <md-checkbox
      [name]="name"
      [value]="value"
      [label]="label"
      [(ngModel)]="checkedValues"
      [htmlId]="htmlId"
      [nestedLevel]="nestedLevel"
    >
    </md-checkbox>

    <md-checkbox
      [name]="name"
      [value]="value"
      [label]="label"
      [(ngModel)]="checkedValues"
      [htmlId]="htmlId"
      [nestedLevel]="nestedLevel"
    >
    </md-checkbox>

    <md-checkbox
      [name]="name"
      [indeterminate]="indeterminate"
      [value]="value"
      [label]="label"
      [(ngModel)]="checkedValues"
      [htmlId]="htmlId"
      [nestedLevel]="nestedLevel"
    >
    </md-checkbox>
  `,
})
export class TestAppComponent {
  disabled = false;
  htmlId = '';
  indeterminate = false;
  label = '';
  name = 'TDG';
  nestedLevel = 1;
  required = false;
  value = '';
}
