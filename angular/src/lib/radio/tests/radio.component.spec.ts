import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioComponent } from '../radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct label to the radio', () => {
    component.label = "Label Text"
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const label = inputNativeElement.querySelector('label');

    expect(label.className).toContain("cui-radio__label");
    expect(label.textContent).toMatch("Label Text");
  });


  it('should render a disabled radio', () => {
    component.disabled = true;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const radio = inputNativeElement.querySelector('.cui-radio__input');

    expect(radio.disabled).toBe(true);
  });

  it('should render a unselected radio ', () => {
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const radio = inputNativeElement.querySelector('.cui-radio__input');

    expect(radio.checked).toBe(false);
  });

  it('should render a nested radio ', () => {
    component.nestedLevel = 1;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const radio = inputNativeElement.querySelector('.cui-input--nested-1');

    expect(radio.className).toContain("cui-input--nested-1");
  });
});
