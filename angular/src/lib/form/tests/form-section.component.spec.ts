import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormSectionComponent } from '../form-section.component';
import { FormModule } from '../form.module';

describe('FormSectionComponent', () => {
  @Component({
    selector: 'test-app',
    template: `
      <md-form-section title="test">
        <div class="testingChildren"></div>
        <div class="testingChildren"></div>
      </md-form-section>
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
    const fixture = TestBed.createComponent(FormSectionComponent);
    const testComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render one FormSection', () => {
    const fixture = TestBed.createComponent(FormSectionComponent);
    const testComponent = fixture.componentInstance;
    testComponent.title = 'test';
    fixture.detectChanges();
    expect(fixture.nativeElement.className).toContain('md-form__section');
    expect(fixture.nativeElement.querySelector('.section__title')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.section__description')).toBeNull();
  });

  it('should render description', () => {
    const fixture = TestBed.createComponent(FormSectionComponent);
    const testComponent = fixture.componentInstance;
    testComponent.description = 'test';
    testComponent.title = 'test';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.section__description');
    expect(element.textContent).toEqual('test');
  });

  it('should render children under Form Content wrapper', () => {
    const fixture = TestBed.createComponent(TestAppComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelectorAll('.testingChildren');
    expect(element.length).toEqual(2);
    const element2 = fixture.nativeElement.querySelector('md-form-content');
    expect(element2.children.length).toEqual(2);
  });
});
