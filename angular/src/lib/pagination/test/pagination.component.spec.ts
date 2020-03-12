import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationService } from '../pagination.service';
import { PaginationComponent } from '../pagination.component';
import { PaginationArrowModule } from '../pagination-arrow.module';
import { PaginationNumberModule } from '../pagination-number.module';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PaginationNumberComponent } from '../pagination-number.component';
import { PaginationArrowComponent } from '../pagination-arrow.component';

@Component({
  template: `
    <md-pagination
      [total]='totalPages'
      [current]='currentPage'
      [firstGroupNum]='firstGroupNum'
      [midGroupNum]='midGroupNum'
      [lastGroupNum]='lastGroupNum'
    ></md-pagination>
  `
})
class PaginationWrapperComponent {
  totalPages: number;
  currentPage: number;
  firstGroupNum: number = 2;
  midGroupNum: number = 3;
  lastGroupNum: number = 2;
}

describe('PaginationComponent', () => {
  describe('creation and rendering', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
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
      paginationService = TestBed.get(PaginationService);
      expect(paginationService).toBeTruthy();
    });

    it('should create 4 clickable elements', () => {
      component.total = 3;
      component.current = 2;
      component.ngOnInit();
      fixture.detectChanges();
      testElements = fixture.nativeElement.getElementsByTagName('a');

      // Clickable elements should be ( < 1 3 > )
      expect(testElements.length).toEqual(4);
    });

    it('should disable previous', () => {
      component.total = 3;
      component.ngOnInit();
      fixture.detectChanges();
      const prevArrow = fixture.debugElement.queryAll(By.directive(PaginationArrowComponent))[0];
      expect(prevArrow.componentInstance.isEnable).toBe(false);
    });

    it('should correctly render 5 buttons', () => {
      component.total = 5;
      component.current = 5;
      component.ngOnInit();
      fixture.detectChanges();

      const ellipsis: DebugElement[] = fixture.debugElement.queryAll(By.css('li.pagination_li.ellipsis'));
      expect(ellipsis.length).toBe(0);

      const renderedText = getRenderedNumbers(fixture);
      expect(renderedText).toContain('1 2 3 4 5');
    });

    it('should correctly render 6 buttons', () => {
      component.total = 6;
      component.current = 5;
      component.ngOnInit();
      fixture.detectChanges();

      const ellipsis: DebugElement[] = fixture.debugElement.queryAll(By.css('li.pagination_li.ellipsis'));
      expect(ellipsis.length).toBe(0);

      const renderedText = getRenderedNumbers(fixture);
      expect(renderedText).toContain('1 2 3 4 5 6');
    });

    it('should correctly render 7 buttons', () => {
      component.total = 7;
      component.current = 4;
      component.ngOnInit();
      fixture.detectChanges();

      const renderedText = getRenderedNumbers(fixture);
      expect(renderedText).toContain('1 2 3 4 5 6 7');
    });
  });

  describe('when dynamically changing inputs', () => {
    let component: PaginationWrapperComponent;
    let fixture: ComponentFixture<PaginationWrapperComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ PaginationWrapperComponent, PaginationComponent ],
        imports: [PaginationArrowModule, PaginationNumberModule],
        providers: [ PaginationService ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PaginationWrapperComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render 7 buttons after changing current page', () => {
      component.currentPage = 1;
      component.totalPages = 7;
      fixture.detectChanges();

      const ellipsis: DebugElement[] = fixture.debugElement.queryAll(By.css('li.pagination_li.ellipsis'));
      expect(ellipsis.length).toBe(1);

      component.currentPage = 4;
      fixture.detectChanges();

      const renderedText = getRenderedNumbers(fixture);
      expect(renderedText).toContain('1 2 3 4 5 6 7');
    });

    it('should disable the next button if total is reduced to current', () => {
      component.currentPage = 5;
      component.totalPages = 10;
      fixture.detectChanges();

      const nextArrow = fixture.debugElement.queryAll(By.directive(PaginationArrowComponent))[1];
      expect(nextArrow.componentInstance.isEnable).toBe(true);

      component.totalPages = 5;
      fixture.detectChanges();

      expect(nextArrow.componentInstance.isEnable).toBe(false);
    });

    it('should set current to total when total decreases below current page value', () => {
      component.currentPage = 5;
      component.totalPages = 5;
      fixture.detectChanges();

      component.totalPages = 3;
      fixture.detectChanges();

      const paginationComponent = fixture.debugElement.query(By.directive(PaginationComponent));
      expect(paginationComponent.componentInstance.paginationService.currentPage).toBe(component.totalPages);
    });

    it('should render correctly after changing group sizes', () => {
      component.currentPage = 3;
      component.totalPages = 5;
      fixture.detectChanges();

      component.firstGroupNum = 1;
      component.midGroupNum = 1;
      component.lastGroupNum = 1;
      fixture.detectChanges();

      const ellipsis: DebugElement[] = fixture.debugElement.queryAll(By.css('li.pagination_li.ellipsis'));
      expect(ellipsis.length).toBe(2);

      const renderedText = getRenderedNumbers(fixture);
      expect(renderedText).toContain('1 3 5');
    });
  });
});

function getRenderedNumbers(fixture) {
  const numberComponents: DebugElement[] = fixture.debugElement.queryAll(By.directive(PaginationNumberComponent));
  const numberComponentsText = numberComponents
    .reduce((accumulator, currentElement) => `${accumulator} ${currentElement.nativeElement.textContent}`, '');
  return numberComponentsText;
}
