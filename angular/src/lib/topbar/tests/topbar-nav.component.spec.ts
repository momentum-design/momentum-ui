import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarModule } from '../topbar.module';

describe('TopbarNavComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <cui-top-bar-nav>
        <div class="testingforTbN"></div>
      </cui-top-bar-nav>
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

  it('should render one TopbarNav', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('cui-top-bar-nav');
    expect(element.className).toContain('cui-top-bar__nav');
  });

  it('should render children', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.testingforTbN');
    expect(element).not.toBeNull();
  });
});
