import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarModule } from '../topbar.module';

describe('TopbarRightComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <md-top-bar-right>
        <div class="testingforTbR"></div>
      </md-top-bar-right>
    `,
  })
  class TestAppComponent {}

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

  it('should render one TopbarRight', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('md-top-bar-right');
    expect(element.className).toContain('md-top-bar__right');
  });

  it('should render children', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.testingforTbR');
    expect(element).not.toBeNull();
  });
});
