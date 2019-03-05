import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsService } from '../tabs/tabs.service';
import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let testElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabComponent ],
      providers: [TabsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render classname', () => {
    component.className = 'textAddOn';
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.className).toContain('textAddOn');
  });

  it('should render disable', () => {
    component.disabled = true;
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.className).toContain('disabled');
  });

  it('should render role', () => {
    component.role = 'role-tab';
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('A')[0];
    expect(testElement.getAttribute('role')).toContain('role-tab');
  });
});
