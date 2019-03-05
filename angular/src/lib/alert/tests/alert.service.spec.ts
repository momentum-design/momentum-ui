import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AlertModule, AlertService } from '../index';

describe('AlertService', () => {
  let alertService: AlertService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let viewContainerFixture: ComponentFixture<ContainerComponent>;

  const alertTitle = 'Now Hear This!';
  const alertMessage = 'Jefe Guadelupe, unit tesing like a boss!';

  @Component({
    selector: 'view-container',
    template: ``,
  })
  class ContainerComponent {
    constructor() {}
  }

  @NgModule({
    imports: [CommonModule, AlertModule],
    exports: [ContainerComponent],
    providers: [AlertService],
    declarations: [ContainerComponent],
    entryComponents: [ContainerComponent],
  })
  class AlertTestModule {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AlertModule, AlertTestModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(inject([AlertService, OverlayContainer], (service: AlertService, container: OverlayContainer) => {
    alertService = service;
    overlayContainer = container;
    overlayContainerElement = container.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ContainerComponent);
    viewContainerFixture.detectChanges();
  });

  it('should match snapshot', () => {
    expect(overlayContainerElement).toMatchSnapshot();
  });

  it('should render a cui-alert-container html element in bottom-right by default', () => {
    alertService.info(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert-container');
    expect(overlayContainerElement).toMatchSnapshot();

    expect(element).not.toBeNull();
    expect(element.className).toContain('cui-alert__container--bottom-right');
  });

  it('should honor position prop when top-left is passed in', () => {
    alertService.info(alertTitle, alertMessage, { position: 'top-left' });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert-container');
    expect(element.className).toContain('cui-alert__container--top-left');
  });

  it('should honor position prop when top-center is passed in', () => {
    alertService.info(alertTitle, alertMessage, { position: 'top-center' });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert-container');
    expect(element.className).toContain('cui-alert__container--top-center');
  });

  it('should honor position prop when top-right is passed in', () => {
    alertService.info(alertTitle, alertMessage, { position: 'top-right' });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert-container');
    expect(element.className).toContain('cui-alert__container--top-right');
  });

  it('should honor position prop when bottom-left is passed in', () => {
    alertService.info(alertTitle, alertMessage, { position: 'bottom-left' });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert-container');
    expect(element.className).toContain('cui-alert__container--bottom-left');
  });

  it('should honor position prop when bottom-center is passed in', () => {
    alertService.info(alertTitle, alertMessage, { position: 'bottom-center' });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert-container');
    expect(element.className).toContain('cui-alert__container--bottom-center');
  });

  it('should honor position prop when bottom-right is passed in', () => {
    alertService.info(alertTitle, alertMessage, { position: 'bottom-right' });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert-container');
    expect(element.className).toContain('cui-alert__container--bottom-right');
  });

  it('should render an info Alert when info() is called', () => {
    alertService.info(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert');

    expect(element).not.toBeNull();
    expect(element.className).toContain('cui-alert--info');
  });

  it('should render an success Alert when success() is called', () => {
    alertService.success(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert');

    expect(element).not.toBeNull();
    expect(element.className).toContain('cui-alert--success');
  });

  it('should render an warning Alert when warning() is called', () => {
    alertService.warning(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert');

    expect(element).not.toBeNull();
    expect(element.className).toContain('cui-alert--warning');
  });

  it('should render an error Alert when error() is called', () => {
    alertService.error(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('cui-alert');

    expect(element).not.toBeNull();
    expect(element.className).toContain('cui-alert--error');
  });

  it('should hide the Alert when hide() is called', () => {
    const key = alertService.info(alertTitle, alertMessage);
    alertService.hide(key);

    viewContainerFixture.detectChanges();
    const element = overlayContainerElement.querySelector('cui-alert-container');

    expect(element).toBeNull();
  });

  it('should render icon', () => {
    alertService.info(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert__icon');

    expect(element).not.toBeNull();
  });

  it('should render content', () => {
    alertService.info(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert__content');

    expect(element).not.toBeNull();
  });

  it('should render title', () => {
    alertService.info(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert__title');

    expect(element).not.toBeNull();
  });

  it('should render message', () => {
    alertService.info(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert__message');

    expect(element).not.toBeNull();
  });

  it('should display closable button by default', () => {
    alertService.info(alertTitle, alertMessage);
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert__button');

    expect(element).not.toBeNull();
  });

  it('should not display closable button if prop set to false', () => {
    alertService.info(alertTitle, alertMessage, { closable: false });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert__button');

    expect(element).toBeNull();
  });

  it('should handle onHide event when onHide option is defined', () => {
    let count = 0;

    alertService.info(alertTitle, alertMessage, { onHide: () => count++ });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('button');

    element.click();
    expect(count).toBe(1);
  });
});
