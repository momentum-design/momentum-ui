import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsService } from '../tabs/tabs.service';
import { TabPaneComponent } from './tab-pane.component';

describe('TabPaneComponent', () => {
  let component: TabPaneComponent;
  let fixture: ComponentFixture<TabPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPaneComponent ],
      providers: [TabsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
