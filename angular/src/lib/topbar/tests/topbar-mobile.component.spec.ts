import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarModule } from '../topbar.module';

describe('TopbarMobileComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <cui-top-bar-mobile>
        <div class="testingforTbM"></div>
      </cui-top-bar-mobile>
    `,
  })
  class TestAppComponent { }

  let testComponent: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TopbarModule],
      declarations: [TestAppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAppComponent);
    testComponent = fixture.componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render one TopbarMobile', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('cui-top-bar-mobile');
    expect(element.querySelector('.cui-top-bar__mobile')).not.toBeNull();
  });

  it('should render children', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.cui-tb-mobile__nav');
    expect(element.children[0].className).toContain('testingforTbM');
  });
});
