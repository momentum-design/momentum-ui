import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '../modal.service';
import { Overlay } from '@angular/cdk/overlay';
import { ModalComponent } from '../modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let testElement: HTMLElement;
  let testService: Overlay;
  let textModalService: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [ModalService, Overlay],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render full fix', () => {
    component.ngOnInit();
    component.showModal();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.innerHTML).toBeTruthy();
  });

  it('should run service Overlay', () => {
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    testService = TestBed.get(Overlay);
    expect(testService).toBeTruthy();
  });

  it('should run textModalService Overlay', () => {
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    textModalService = TestBed.get(Overlay);
    expect(textModalService).toBeTruthy();
  });
});
