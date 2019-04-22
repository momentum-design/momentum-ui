import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AccordionComponent } from '../accordion.component';
import { AccordionModule } from '../accordion.module';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  @Component({
    selector: 'test-app',
    template: `

    <md-accordion>
      <md-accordion-tab
        header="Test Header - height 56"
        [height]="56"
        [isExpanded]="true"
        (contentClick) = "fireThis($event)"
      >
        Content 1
      </md-accordion-tab>

      <md-accordion-tab
        header="Test Header 2"
        [disabled]="true"
      >
        Content 2
      </md-accordion-tab>

      <md-accordion-tab
        header="Test Header 3"
        [showSeparator]="true"
        [isExpanded]="true"
      >
        Content 3
      </md-accordion-tab>
    </md-accordion>
    `,
  })
  class TestAppComponent {

    count = 0;

    fireThis() {
      this.count++;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAppComponent ],
      imports: [AccordionModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an expanded accordion tab', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const tab = fixtureApp.nativeElement.querySelector('.md-accordion__group--active');

    expect(tab).not.toBeNull();
  });

  it('should render a 56px header', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const header = fixtureApp.nativeElement.querySelector('.md-accordion__header--56');

    expect(header).not.toBeNull();
  });

  it('should render a disabled accordion', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const disabled = fixtureApp.nativeElement.querySelector('.md-accordion__group--disabled');

    expect(disabled).not.toBeNull();
  });

  it('should render a separator under the accordion header', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();
    const separator = fixtureApp.nativeElement.querySelector('.md-accordion__header--separator');

    expect(separator).not.toBeNull();
  });

  it('should render multiple expanded accordion tabs', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    fixtureApp.detectChanges();

    const multiple = fixtureApp.nativeElement.querySelectorAll('.md-accordion__group--active').length;

    expect(multiple).toEqual(2);
  });

  it('should handle click event', () => {
    const fixtureApp = TestBed.createComponent(TestAppComponent);
    const testAppComponent = fixtureApp.componentInstance;
    fixtureApp.detectChanges();
    const content = fixtureApp.nativeElement.querySelector('.md-list-item');
    content.click();
    fixtureApp.detectChanges();
    expect(testAppComponent.count).toEqual(1);
  });
});
