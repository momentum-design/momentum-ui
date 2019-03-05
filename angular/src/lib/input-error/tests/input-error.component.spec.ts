import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorComponent } from '../input-error.component';

describe('InputErrorComponent', () => {
  let component: InputErrorComponent;
  let fixture: ComponentFixture<InputErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputErrorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a error message with correct text', () => {
    component.error = 'This is where the success message would be.';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    const inputNativeElement = fixture.nativeElement;
    const error = inputNativeElement.querySelector('.message');

    expect(error.textContent).toBe('This is where the success message would be.');
  });
});
