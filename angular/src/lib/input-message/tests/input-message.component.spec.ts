import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { InputMessageComponent } from '../input-message.component';

describe('InputMessageComponent', () => {
  let component: InputMessageComponent;
  let fixture: ComponentFixture<InputMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputMessageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should overwrite id', () => {
    expect(fixture.nativeElement.getAttribute('id')).toContain('md-error-');
    component.id = 'test-id';
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('id')).toContain('test-id');
  });
});
