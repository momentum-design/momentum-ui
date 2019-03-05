import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBodyComponent } from '../modal-body.component';

describe('ModalBodyComponent', () => {
  let component: ModalBodyComponent;
  let fixture: ComponentFixture<ModalBodyComponent>;
  let testElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalBodyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render classname', () => {
    component.class = 'textAddOn';
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.className).toContain('textAddOn');
  });
});
