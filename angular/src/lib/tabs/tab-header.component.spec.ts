import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabHeaderComponent } from './tab-header.component';

describe('TabHeaderComponent', () => {
  let component: TabHeaderComponent;
  let fixture: ComponentFixture<TabHeaderComponent>;
  let testElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading', () => {
    component.heading = 'textAddOn';
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.innerHTML).toContain('textAddOn');
  });

  it('should render subHeading', () => {
    component.heading = 'subHeading';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement;
    expect(testElement.innerHTML).toContain('subHeading');
  });

});
