import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ModalService} from '../../modal/modal.service';
import { ModalHeaderComponent } from '../modal-header.component';

describe('ModalHeaderComponent', () => {
  let component: ModalHeaderComponent;
  let fixture: ComponentFixture<ModalHeaderComponent>;
  let testElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHeaderComponent ],
      imports: [],
      providers: [ModalService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHeaderComponent);
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

  it('should render headerLabel', () => {
    component.headerLabel = 'headerLabel';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('span')[0];
    expect(testElement.innerHTML).toContain('headerLabel');
  });

  it('should render message', () => {
    component.headerLabel = 'headerLabel';
    component.message = 'message';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('span')[1];
    expect(testElement.innerHTML).toContain('message');
  });

});
