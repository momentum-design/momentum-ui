import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderContentModule } from '../page-header-content.module';
import { PageHeaderComponent } from '../page-header.component';
import { CommonModule } from '@angular/common';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;
  let testElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageHeaderComponent],
      imports: [
        CommonModule,
        PageHeaderContentModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render copy dom', () => {
    component.enableScrollFix = true;
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.getElementsByTagName('md-page-header-content').length).toBe(2);
  });

  it('should render title', () => {
    component.title = 'myTitle';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.innerHTML).toContain('myTitle');
  });

  it('should render lead', () => {
    component.lead = 'myDescription';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.innerHTML).toContain('myDescription');
  });
});
