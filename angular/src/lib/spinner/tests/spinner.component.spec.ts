import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from '../spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let iconNativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with blue color class name', () => {
    component.color = 'blue';
    fixture.detectChanges();

    iconNativeElement = fixture.nativeElement;
    const i = iconNativeElement.querySelector('i');

    const expectedIconName = 'cui-spinner--blue';
    expect(i.className).toContain(expectedIconName);
  });

  it('should render with size 28', () => {
    component.size = 28;
    fixture.detectChanges();

    iconNativeElement = fixture.nativeElement;
    const i = iconNativeElement.querySelector('i');

    const expectedIconName = 'cui-spinner--28';
    expect(i.className).toContain(expectedIconName);
  });

  it('should render with className test', () => {
    component.className = 'test';
    fixture.detectChanges();

    iconNativeElement = fixture.nativeElement;
    const i = iconNativeElement.querySelector('i');

    const expectedIconName = 'test';
    expect(i.className).toContain(expectedIconName);
  });

  // it('should show a 65% fill', () => {
  //   component.percentage = 65;
  //   fixture.detectChanges();

  //   iconNativeElement = fixture.nativeElement;
  //   const div = iconNativeElement.querySelector('.cui-spinner-progress');
  //   const expectedIconName = 'cui-spinner-progress__percentage-65';

  //   expect(div.className).toContain(expectedIconName);

  // });
});
