import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityButtonComponent } from '../activity-button.component';

describe('ActivityButtonComponent', () => {
  let component: ActivityButtonComponent;
  let fixture: ComponentFixture<ActivityButtonComponent>;
  let testElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render size 84', () => {
    component.size = 84;
    component.type = 'chat';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('i')[0];
    expect(testElement.className).toContain('36');
  });

  it('should render size 56', () => {
    component.size = 56;
    component.type = 'chat';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('i')[0];
    expect(testElement.className).toContain('24');
  });

  it('should render size 68', () => {
    component.size = 68;
    component.type = 'chat';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('i')[0];
    expect(testElement.className).toContain('28');
  });

  it('should render label', () => {
    component.type = 'chat';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('button')[0];
    expect(testElement.getAttribute('aria-label')).toContain('Chat');
  });

  it('should render label by prop', () => {
    component.type = 'chat';
    component.ariaLabel = 'testAriaLabel';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('button')[0];
    expect(testElement.getAttribute('aria-label')).toContain('testAriaLabel');
  });

  it('should render button className', () => {
    component.type = 'chat';
    component.className = 'testStr';
    component.ngOnInit();
    fixture.detectChanges();
    testElement = fixture.nativeElement.getElementsByTagName('button')[0];
    expect(testElement.className).toContain('testStr');
  });

});
