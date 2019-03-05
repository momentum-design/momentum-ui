import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelComponent } from '../label.component';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the label text', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const span = inputNativeElement.querySelector('label > span');

    expect(span).not.toBeNull();
    expect(span.textContent).toMatch('Test Label');
  });

  it('should render a theme to the label', () => {
    component.theme = 'dark';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const label = inputNativeElement.querySelector('label');

    expect(label.className).toContain('cui-label--dark');
  });

  it('should render a custom class to the label', () => {
    component.className = 'test';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const label = inputNativeElement.querySelector('label');

    expect(label.className).toContain('test');
  });
});
