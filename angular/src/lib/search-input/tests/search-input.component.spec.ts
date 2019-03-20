import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { SearchInputComponent } from '../search-input.component';
import { LabelModule } from '../../label';


describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInputComponent ],
      imports: [FormsModule, LabelModule, BrowserModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a label to the search input and check to see correct label Text', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const span = inputNativeElement.querySelector('span');

    expect(span).not.toBeNull();
    expect(span.textContent).toMatch('Test Label');
  });

  it('should render a pill search input', () => {
    component.type = 'pill';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const pill = inputNativeElement.querySelector('.cui-search-input--pill');

    expect(pill.className).toContain('cui-search-input--pill');
  });

  it('should render a input search with clear button', () => {
    component.clear = true;
    component.value = "test"
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const clear = inputNativeElement.querySelector('.cui-input__icon-clear');

    expect(clear.className).toContain('cui-input__icon-clear');
  });

  it('should render a disabled search input', () => {
    component.disabled = true;
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const inputDisabled = inputNativeElement.querySelector('input');

    expect(inputDisabled.disabled).toBe(true);
  });

  it('should render a search input with small-5 size', () => {
    component.inputSize = 'small-5';
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const size = inputNativeElement.querySelector('.cui-input-group');

    expect(size.className).toContain('small-5');
  });
});