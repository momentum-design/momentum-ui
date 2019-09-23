import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconModule } from '../../icon';
import { InputModule, InputService } from '../../input';
import { InputContainerModule } from '../../input-container';
import { InputMessageModule } from '../../input-message';
import { InputSectionModule } from '../../input-section';

@Component({
  template: `
    <md-input-container
      [isFilled]="isFilled"
      [class]="class"
      [clear]="clear"
      [clearAriaLabel]="clearAriaLabel"
      [containerSize]="containerSize"
      [helpText]="helpText"
      [inputSize]="inputSize"
      [label]="label"
      [messageArr]="messageArr"
      [nestedLevel]="nestedLevel"
      [secondaryLabel]="secondaryLabel"
      [status]="status"
    >
      <md-input-section *ngIf="inputBefore" position='before'>
        <md-icon
          name="clear-active_16"
        ></md-icon>
      </md-input-section>
      <md-input-section *ngIf="inputAfter" position='after'>
        <md-icon
          name="clear-active_16"
        ></md-icon>
      </md-input-section>
      <md-input-message *ngIf="status">{{status}}</md-input-message>
      <input
        mdInput
        id='test-id'
        [disabled]="disabled"
        [placeholder]="placeholder"
        [readonly]="readonly"
        [required]="required"
        [shape]="shape"
        [value]="value"
      />
      <textarea mdInput *ngIf="textArea">test</textarea>
    </md-input-container>`,
})

class MDInputComponent {
  class: string;
  clear: boolean;
  clearAriaLabel: string;
  containerSize: string;
  disabled: boolean;
  helpText: string;
  inputAfter: boolean;
  inputBefore: boolean;
  inputSize: string;
  isFilled: boolean;
  label: string;
  messageArr: Array<{message: string, type: string}>;
  nestedLevel: number;
  placeholder: string;
  readonly: boolean;
  required: boolean;
  secondaryLabel: string;
  shape: string;
  status: string;
  textArea: boolean;
  type: string;
  value: string;
}

describe('InputDirective', () => {
  let component: MDInputComponent;
  let fixture: ComponentFixture<MDInputComponent>;
  let groupEl: HTMLElement;
  let inputEl: HTMLInputElement;
  let wrapperEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MDInputComponent],
      imports: [IconModule, InputMessageModule, InputModule, InputContainerModule, InputSectionModule],
      providers: [InputService]
    }).compileComponents();

    fixture = TestBed.createComponent(MDInputComponent);
    component = fixture.componentInstance;
    groupEl = fixture.debugElement.query(By.css('md-input-container')).nativeElement;
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    wrapperEl = fixture.debugElement.query(By.css('.md-input__wrapper')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should not overwrite existing id', () => {
    expect(inputEl.id).toBe('test-id');
  });

  it('should render class', () => {
    expect(groupEl.classList.contains('test-input')).toBeFalsy();

    fixture.componentInstance.class = 'test-input';
    fixture.detectChanges();

    expect(groupEl.classList.contains('test-input')).toBe(true);
  });

  it('should render multiline class', () => {
    expect(fixture.debugElement.query(By.css('textarea'))).toBeFalsy();

    fixture.componentInstance.textArea = true;
    fixture.detectChanges();

    expect(fixture.debugElement
      .query(By.css('textarea'))
      .nativeElement
      .classList
    ).toContain('md-input--multiline');
  });


  it('should render filled class', () => {
    expect(groupEl.classList.contains('md-input--filled')).toBeFalsy();

    fixture.componentInstance.isFilled = true;
    fixture.detectChanges();

    expect(groupEl.classList.contains('md-input--filled')).toBe(true);
  });

  it('should render containerSize class', () => {
    expect(groupEl.classList.contains('small-6')).toBeFalsy();

    fixture.componentInstance.containerSize = 'small-6';
    fixture.detectChanges();

    expect(groupEl.classList.contains('small-6')).toBe(true);
  });

  it('should render inputSize class', () => {
    expect(wrapperEl.classList.contains('small-6')).toBeFalsy();

    fixture.componentInstance.inputSize = 'small-6';
    fixture.detectChanges();

    expect(wrapperEl.classList.contains('small-6')).toBe(true);
  });

  it('should render a disabled input', () => {
    expect(inputEl.disabled).toBe(false);

    fixture.componentInstance.disabled = true;
    fixture.detectChanges();

    expect(groupEl.classList.contains('md-disabled')).toBe(true);
    expect(inputEl.classList.contains('md-disabled')).toBe(true);
    expect(inputEl.disabled).toBe(true);
  });

  it('should render a placeholder', () => {
    expect(inputEl.placeholder).toBeFalsy();

    fixture.componentInstance.placeholder = 'test-placeholder';
    fixture.detectChanges();

    expect(inputEl.placeholder).toBe('test-placeholder');
  });

  it('should render a readonly input', () => {
    expect(inputEl.readOnly).toBeFalsy();

    fixture.componentInstance.readonly = true;
    fixture.detectChanges();

    expect(groupEl.classList.contains('md-read-only')).toBe(true);
    expect(inputEl.classList.contains('md-read-only')).toBe(true);
    expect(inputEl.readOnly).toBe(true);
  });

  it('should render a required input', () => {
    expect(inputEl.required).toBeFalsy();

    fixture.componentInstance.required = true;
    fixture.detectChanges();

    expect(inputEl.required).toBe(true);
  });

  it('should render a shape class', () => {
    expect(inputEl.classList.contains('md-input--pill')).toBeFalsy();

    fixture.componentInstance.shape = 'pill';
    fixture.detectChanges();

    expect(inputEl.classList.contains('md-input--pill')).toBe(true);
  });

  it('should render a specific type', () => {
    fixture.componentInstance.type = 'text';
    fixture.detectChanges();

    expect(inputEl.type).toBe('text');
  });

  it('should render a value', () => {
    expect(inputEl.value).toBe('undefined');

    fixture.componentInstance.value = 'test-value';
    fixture.detectChanges();

    expect(inputEl.value).toBe('test-value');
  });

  it('should handle focus', () => {
    expect(inputEl.classList.contains('md-active')).toBeFalsy();

    inputEl.focus();
    fixture.detectChanges();

    expect(inputEl.classList.contains('md-active')).toBe(true);
  });

  it('should handle clear prop', () => {
    expect(fixture.debugElement.query(By.css('md-icon'))).toBeFalsy();

    fixture.componentInstance.clear = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('md-icon'))).toBeTruthy();
  });

  it('should handle clearAriaLabel prop', () => {
    fixture.componentInstance.clear = true;
    fixture.componentInstance.clearAriaLabel = 'test-clear';

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('button'))
        .nativeElement
        .getAttribute('aria-label')
      ).toBe('test-clear');
  });

  it('should handle helpText prop', () => {
    fixture.componentInstance.helpText = 'test-help';

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('md-input-helper'))
        .nativeElement
        .textContent
      ).toContain('test-help');
  });

  it('should handle label prop', () => {
    fixture.componentInstance.label = 'test-label';

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('md-label'))
        .nativeElement
        .textContent
      ).toContain('test-label');
  });

  it('should handle secondary label prop', () => {
    fixture.componentInstance.secondaryLabel = 'test-sec-label';

    fixture.detectChanges();

    expect(
      fixture.debugElement
        .query(By.css('.md-input__secondary-label'))
        .nativeElement
        .textContent
      ).toContain('test-sec-label');
  });

  it('should handle nested level prop', () => {
    expect(groupEl.classList.contains('md-input--nested-2')).toBeFalsy();

    fixture.componentInstance.nestedLevel = 2;
    fixture.detectChanges();

    expect(groupEl.classList.contains('md-input--nested-2')).toBe(true);
  });

  it('should render inputBefore', () => {
    fixture.componentInstance.inputBefore = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('md-input-section'))).toBeTruthy();
    expect(inputEl.classList.contains('md-input--before')).toBe(true);
  });

  it('should render inputAfter', () => {
    fixture.componentInstance.inputAfter = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('md-input-section'))).toBeTruthy();
    expect(inputEl.classList.contains('md-input--after')).toBe(true);
  });

  it('should handle success messageArr', () => {
    fixture.componentInstance.messageArr = [{message: 'test', type: 'success'}];
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('md-input-message'))).toBeTruthy();
    expect(groupEl.classList.contains('md-success')).toBe(true);
  });

  it('should handle warning messageArr', () => {
    fixture.componentInstance.messageArr = [{message: 'test', type: 'warning'}];
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('md-input-message'))).toBeTruthy();
    expect(groupEl.classList.contains('md-warning')).toBe(true);
  });

  it('should handle error messageArr', () => {
    fixture.componentInstance.messageArr = [{message: 'test', type: 'error'}];
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('md-input-message'))).toBeTruthy();
    expect(groupEl.classList.contains('md-error')).toBe(true);
  });

  it('should handle success status', () => {
    fixture.componentInstance.status = 'success';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('md-input-message'))).toBeTruthy();
    expect(groupEl.classList.contains('md-success')).toBe(true);
  });

  it('should handle warning status', () => {
    fixture.componentInstance.status = 'warning';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('md-input-message'))).toBeTruthy();
    expect(groupEl.classList.contains('md-warning')).toBe(true);
  });

  it('should handle error status', () => {
    fixture.componentInstance.status = 'error';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('md-input-message'))).toBeTruthy();
    expect(groupEl.classList.contains('md-error')).toBe(true);
  });
});

