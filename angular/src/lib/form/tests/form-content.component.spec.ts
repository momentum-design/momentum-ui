import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormContentComponent } from '../form-content.component';
import { FormModule } from '../form.module';

describe('FormContentComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <md-form-content>
        <div class="testingChildren"></div>
      </md-form-content>
    `,
  })
  class TestAppComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormModule],
      declarations: [TestAppComponent],
    }).compileComponents();
  }));

  it('should create and match snapshot', () => {
    const fixture = TestBed.createComponent(FormContentComponent);
    const testComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render one FormContent', () => {
    const fixture = TestBed.createComponent(FormContentComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('section__content');
  });

  it('should render children', () => {
    const fixture = TestBed.createComponent(TestAppComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.testingChildren');
    expect(element).not.toBeNull();
  });
});
