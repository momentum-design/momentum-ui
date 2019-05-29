import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationService } from '../pagination.service';
import { PaginationComponent } from '../pagination.component';
import { PaginationArrowModule } from '../pagination-arrow.module';
import { PaginationNumberModule } from '../pagination-number.module';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let testElement: HTMLElement;
  let testElements: Array<HTMLElement>;
  let paginationService: PaginationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      imports: [PaginationArrowModule, PaginationNumberModule],
      providers: [ PaginationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run service Overlay', () => {
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    paginationService = TestBed.get(PaginationService);
    expect(paginationService).toBeTruthy();
  });

  it('should render total 3', () => {
    component.total = 3;
    component.current = 2;
    component.ngOnInit();
    fixture.detectChanges();
    testElements = fixture.nativeElement.getElementsByTagName('a');
    expect(testElements.length).toEqual(4);
  });

  it('should disable previous', () => {
    component.total = 3;
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('md-pagination-arrow')[0];
    expect(testElement.className).toContain('icon-arrow-left-optical_20');
  });

});
