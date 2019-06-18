import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormSubSectionComponent } from '../form-subsection.component';
import { FormModule } from '../form.module';

describe('FormSubSectionComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <md-form-sub-section>
        <div class="testingChildren"></div>
      </md-form-sub-section>
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
    const fixture = TestBed.createComponent(FormSubSectionComponent);
    const testComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render only FormSubSection', () => {
    const fixture = TestBed.createComponent(FormSubSectionComponent);
    const testComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('sub-section');
  });

  it('should render description', () => {
    const fixture = TestBed.createComponent(FormSubSectionComponent);
    const testComponent = fixture.componentInstance;
    testComponent.description = 'test';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.sub-section__description');
    expect(element.textContent).toEqual('test');
  });

  it('should render children under Form Content wrapper', () => {
    const fixture = TestBed.createComponent(TestAppComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.testingChildren');
    expect(element).not.toBeNull();
  });
});
