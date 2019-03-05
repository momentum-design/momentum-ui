import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsService } from '../tabs/tabs.service';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let testElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsComponent ],
      providers: [TabsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
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

  it('should render justified', () => {
    component.justified = true;
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.className).toContain('cui-tab--justified');
  });

});
