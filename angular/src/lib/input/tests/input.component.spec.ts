import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { InputComponent } from '../input.component';
import { LabelModule } from '../../label';
import { InputErrorModule } from '../../input-error';
import { InputHelperModule } from '../../input-helper';

describe('InputComponent', () => {
  let testComponent: InputComponent;
  let testFixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule, LabelModule, BrowserModule, InputErrorModule, InputHelperModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    testFixture = TestBed.createComponent(InputComponent);
    testComponent = testFixture.componentInstance;
    (testComponent as any).control = new FormControl();
    testFixture.detectChanges();
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(testFixture).toMatchSnapshot();
  });

  it('should render a label to the input and check to see correct label Text', () => {
    testComponent.label = 'Test Label';
    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const span = inputNativeElement.querySelector('span');

    expect(span).not.toBeNull();
    expect(span.textContent).toMatch('Test Label');
  });

  it('should render a help text message to the input', () => {
    testComponent.inputHelpText = 'Help Text';
    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const helpText = inputNativeElement.querySelector('p');

    expect(helpText.className).toContain('cui-input__help-text');
  });

  it('should render a secondary label to the input', () => {
    testComponent.secondaryLabel = 'Secondary Label';
    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const secondaryLabel = inputNativeElement.querySelector('.cui-label__secondary-label');

    expect(secondaryLabel.className).toContain('cui-label__secondary-label');
  });

  it('should render a input with password type', () => {
    testComponent.type = 'password';
    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const inputType = inputNativeElement.querySelector('input');

    expect(inputType.type).toBe('password');
  });

  it('should render a input with small-5 size', () => {
    testComponent.inputSize = 'small-5';

    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const size = inputNativeElement.querySelector('.cui-input-group');

    expect(size.className).toContain('small-5');
  });

  it('should render a disabled input', () => {
    testComponent.disabled = true;

    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const inputDisabled = inputNativeElement.querySelector('input');

    expect(inputDisabled.disabled).toBe(true);
  });

  it('should render a readonly input', () => {
    testComponent.readOnly = true;

    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const inputReadOnly = inputNativeElement.querySelector('input');

    expect(inputReadOnly.readOnly).toBe(true);
  });

  it('should render a error text input', () => {
    testComponent.errorArr = [{ error: 'This is where the error message would be.', type: 'error' }];

    testComponent.ngOnChanges({
      errorArr: new SimpleChange(null, testComponent.errorArr, true),
    });

    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const inputError = inputNativeElement.querySelector('.cui-input-group');

    expect(inputError.className).toContain('error');
  });

  it('should render a warning text input', () => {
    testComponent.errorArr = [{ error: 'This is where the warning message would be.', type: 'warning' }];

    testComponent.ngOnChanges({
      errorArr: new SimpleChange(null, testComponent.errorArr, true),
    });

    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const inputError = inputNativeElement.querySelector('.cui-input-group');

    expect(inputError.className).toContain('warning');
  });

  it('should render a success text input', () => {
    testComponent.errorArr = [{ error: 'This is where the success message would be.', type: 'success' }];

    testComponent.ngOnChanges({
      errorArr: new SimpleChange(null, testComponent.errorArr, true),
    });

    testFixture.detectChanges();

    const inputNativeElement = testFixture.nativeElement;
    const inputError = inputNativeElement.querySelector('.cui-input-group');

    expect(inputError.className).toContain('success');
  });
});
