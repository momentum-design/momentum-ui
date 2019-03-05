import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsService } from './tabs.service';
import { TabListComponent } from './tab-list.component';

describe('TabListComponent', () => {
  let component: TabListComponent;
  let fixture: ComponentFixture<TabListComponent>;
  let testElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabListComponent ],
      providers: [TabsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render headerLabel', () => {
    component.role = 'headerLabel';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.getAttribute('role')).toContain('headerLabel');
  });

});
