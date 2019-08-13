import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSwitchComponent } from '../toggle-switch.component';

describe('ToggleSwitchComponent', () => {
  let component: ToggleSwitchComponent;
  let fixture: ComponentFixture<ToggleSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleSwitchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct label to the toggle switch', () => {
    component.label = 'Label Text';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const label = inputNativeElement.querySelector('label');

    expect(label.className).toContain('md-toggle-switch__label');
    expect(label.textContent).toMatch('Label Text');
  });

  it('should render a disabled toggle switch', () => {
    component.disabled = true;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const toggleSwitch = inputNativeElement.querySelector(
      '.md-toggle-switch__input'
    );

    expect(toggleSwitch.disabled).toBe(true);
  });

  it('should trigger a click event on toggle switch', async(() => {
    fixture.detectChanges();

    spyOn(component, 'onSwitch');

    const inputNativeElement = fixture.nativeElement;
    const toggleSwitch = inputNativeElement.querySelector(
      '.md-toggle-switch__input'
    );

    toggleSwitch.click();

    fixture.whenStable().then(() => {
      expect(component.onSwitch).toHaveBeenCalled();
      expect(toggleSwitch.checked).toBe(true);
    });
  }));
});
