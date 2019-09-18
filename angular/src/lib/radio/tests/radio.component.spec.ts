import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { InputHelperModule } from '../../input-helper';
import { RadioComponent } from '../radio.component';

describe('RadioComponent', () => {
  // let component: RadioComponent;
  // let fixture: ComponentFixture<RadioComponent>;

  let component: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line: no-use-before-declare
      declarations: [RadioComponent, TestAppComponent],
      imports: [
        InputHelperModule,
      ],
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

  it('should render a input help text ', () => {
    component.helpText = 'Help Text';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const helpText = inputNativeElement.querySelector('.md-input__help-text');

    expect(helpText.className).toContain('md-input__help-text');
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
      [helpText]="helpText"
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
  helpText = 'Help Text';
}
