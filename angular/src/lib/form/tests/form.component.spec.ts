import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormComponent } from '../form.component';
import { FormModule } from '../form.module';

describe('FormComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <md-form name="test">
        <div class="testingChildren"></div>
      </md-form>
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
    const fixture = TestBed.createComponent(FormComponent);
    const testComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render only Form', () => {
    const fixture = TestBed.createComponent(FormComponent);
    const testComponent = fixture.componentInstance;
    testComponent.name = 'test';
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('md-form');
  });

  it('should render children under Form Content wrapper', () => {
    const fixture = TestBed.createComponent(TestAppComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.testingChildren');
    expect(element).not.toBeNull();
  });
});
