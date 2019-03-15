import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AlertBannerModule } from '../index';

describe('AlertBannerComponent', () => {
  let testComponent: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  @Component({
    selector: 'test-app',
    template: `
    <cui-alert-banner
      *ngIf="show"
      (hide)="show=false"
      [type]="type"
      [closable]="closable"
    >
      Alert Banner
    </cui-alert-banner>
    `,
  })
  class TestAppComponent {
    show = true;
    type = 'info';
    closable = false;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [AlertBannerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAppComponent);
    testComponent = fixture.debugElement.componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const alertBannerElement = element.querySelector('cui-alert-banner');
    expect(alertBannerElement).toBeTruthy();
    expect(alertBannerElement).toMatchSnapshot();
  });

  it('should default to type "info"', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const div = element.querySelector('.cui-alert-banner--info');
    expect(div).not.toBeNull();
  });

  it('should default to type "warning"', () => {
    testComponent.type = 'warning';
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const div = element.querySelector('.cui-alert-banner--warning');
    expect(div).not.toBeNull();
  });

  it('should default to type "error"', () => {
    testComponent.type = 'error';
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const div = element.querySelector('.cui-alert-banner--error');
    expect(div).not.toBeNull();
  });

  it('should not display closable button by default', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const div = element.querySelector('.cui-alert-banner__close');
    expect(div).toBeNull();
  });

  it('should display closable button if prop set to true', () => {
    testComponent.closable = true;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const div = element.querySelector('.cui-alert-banner__close');
    expect(div).not.toBeNull();
  });

  it('should close the banner on click of close button', () => {
    testComponent.closable = true;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const button = element.querySelector('.cui-alert-banner__close');
    button.click();
    fixture.detectChanges();
    const alertBannerElement = element.querySelector('cui-alert-banner');
    expect(alertBannerElement).toBeNull();
  });
});

