import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from '../radio.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RadioComponent', () => {
  // let component: RadioComponent;
  // let fixture: ComponentFixture<RadioComponent>;

  let component: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line: no-use-before-declare
      declarations: [RadioComponent, TestAppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  it('should render the correct label to the radio', () => {
    component.label = 'Label Text';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const label = inputNativeElement.querySelector('label');

    expect(label.className).toContain('md-radio__label');
    expect(label.textContent).toMatch('Label Text');
  });

  it('should render a disabled radio', () => {
    component.disabled = true;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const radio = inputNativeElement.querySelector('.md-radio__input');

    expect(radio.disabled).toBe(true);
  });

  it('should render a unselected radio ', () => {
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const radio = inputNativeElement.querySelector('.md-radio__input');

    expect(radio.checked).toBe(false);
  });

  it('should render a nested radio ', () => {
    component.nestedLevel = 1;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const radio = inputNativeElement.querySelector('.md-input--nested-1');

    expect(radio.className).toContain('md-input--nested-1');
  });
});


@Component({
  selector: 'test-app',
  template: `
    <md-radio
      [name]="name"
      [value]="value"
      [label]="label"
      [disabled]="disabled"
      [htmlId]="htmlId"
    >
    </md-radio>

    <md-radio
      [name]="name"
      [value]="value"
      [label]="label"
      [htmlId]="htmlId"
    >
    </md-radio>

    <md-radio
      [name]="name"
      [label]="label"
      [value]="value"
      [nestedLevel]="nestedLevel"
    >
    </md-radio>
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
