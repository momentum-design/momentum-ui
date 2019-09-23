import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditableTextfieldComponent } from '../../editable-textfield';
import { InputModule } from '../../input';
import { InputContainerModule } from '../../input-container';

describe('EditableTextfieldComponent', () => {
  let component: EditableTextfieldComponent;
  let fixture: ComponentFixture<EditableTextfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditableTextfieldComponent],
      imports: [
        CommonModule,
        FormsModule,
        InputContainerModule,
        InputModule,
      ],
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
