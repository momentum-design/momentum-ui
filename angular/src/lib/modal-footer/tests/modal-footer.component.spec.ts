import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFooterComponent } from '../modal-footer.component';

describe('ModalFooterComponent', () => {
  let component: ModalFooterComponent;
  let fixture: ComponentFixture<ModalFooterComponent>;
  let testElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFooterComponent);
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
