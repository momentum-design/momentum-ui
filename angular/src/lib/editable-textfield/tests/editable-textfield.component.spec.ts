import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormControl } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { EditableTextfieldComponent } from '../editable-textfield.component';

describe('EditableTextfieldComponent', () => {
  let component: EditableTextfieldComponent;
  let fixture: ComponentFixture<EditableTextfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditableTextfieldComponent],
      imports: [FormsModule, BrowserModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTextfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render a editable input when disabled after click', () => {
    component.disabled = true;

    fixture.detectChanges();

    spyOn(component, 'handleClick');

    const inputNativeElement = fixture.nativeElement;
    const button = inputNativeElement.querySelector(
      '.md-editable-textfield__button'
    );

    button.click();

    fixture.whenStable().then(() => {
      expect(button).not.toBeNull();
    });
  });

  it('should render a div button when not focused', () => {
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const normal = inputNativeElement.querySelector(
      '.md-editable-textfield__button'
    );

    expect(normal).not.toBeNull();
  });

  it('should render the editable text input when clicked normally', () => {
    fixture.detectChanges();

    spyOn(component, 'handleClick');

    const inputNativeElement = fixture.nativeElement;
    const button = inputNativeElement.querySelector(
      '.md-editable-textfield__button'
    );
    const input = inputNativeElement.querySelector('input');

    button.click();

    fixture.whenStable().then(() => {
      setTimeout(() => {
        expect(input).not.toBeNull();
      }, 100);
    });
  });
});
