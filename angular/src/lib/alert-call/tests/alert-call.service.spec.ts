import {
  async,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Component, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AvatarModule } from '../../avatar';
import { AlertCallModule, AlertCallService } from '../index';

describe('AlertCallService', () => {
  let alertService: AlertCallService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let viewContainerFixture: ComponentFixture<ContainerComponent>;

  const title = 'Incoming call';
  const caller1 = {
    title: 'Jefe Guadelupe',
    alt: '+1 408-555-1212',
  };

  @Component({
    selector: 'view-container',
    template: ``,
  })
  class ContainerComponent {}

  @NgModule({
    imports: [
      CommonModule,
      AlertCallModule,
      AvatarModule,

    ],
    exports: [ContainerComponent],
    providers: [AlertCallService],
    declarations: [ContainerComponent],
    entryComponents: [ContainerComponent],
  })
  class AlertCallTestModule {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AlertCallModule,
        AlertCallTestModule,
        AvatarModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(inject([AlertCallService, OverlayContainer], (service: AlertCallService, container: OverlayContainer) => {
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

  it('should render one AlertCall', () => {
    alertService.show({
      title: title,
      caller: caller1,
    });
    viewContainerFixture.detectChanges();

    const container = overlayContainerElement.querySelector('md-alert-call-container');
    expect(container).not.toBeNull();
    const element = container.querySelector('md-alert-call');
    expect(element).not.toBeNull();
    expect(element.className).toContain('md-alert--call');
  });

  it('should handle rejectAriaLabel', () => {
    alertService.show({
      title: title,
      caller: caller1,
      rejectAriaLabel: 'rejectLabel'
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    expect(element[element.length - 1].getAttribute('aria-label')).toEqual('rejectLabel');
  });

  it('should handle shareAriaLabel', () => {
    alertService.show({
      title: title,
      caller: caller1,
      onAnswerShare: () => {},
      shareAriaLabel: 'shareAriaLabel'
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    expect(element[0].getAttribute('aria-label')).toEqual('shareAriaLabel');
  });

  it('should handle videoAriaLabel', () => {
    alertService.show({
      title: title,
      caller: caller1,
      onAnswerVideo: () => {},
      videoAriaLabel: 'videoAriaLabel'
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    expect(element[0].getAttribute('aria-label')).toEqual('videoAriaLabel');
  });

  it('should handle voiceAriaLabel', () => {
    alertService.show({
      title: title,
      caller: caller1,
      onAnswerVoice: () => {},
      voiceAriaLabel: 'voiceAriaLabel'
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    expect(element[0].getAttribute('aria-label')).toEqual('voiceAriaLabel');
  });

  it('should render call title', () => {
    alertService.show({
      title: title,
      caller: caller1,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.md-alert__title');
    expect(element.textContent).toEqual(title);
  });

  it('should render an avatar', () => {
    alertService.show({
      title: title,
      caller: caller1,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('md-avatar');
    expect(element.length).toEqual(1);
  });

  it('should handle caller.title prop', () => {
    alertService.show({
      title: title,
      caller: caller1,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.md-alert__caller-title');
    expect(element.textContent).toEqual(caller1.title);
  });

  it('should handle caller.alt prop', () => {
    alertService.show({
      title: title,
      caller: caller1,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.md-alert__caller-subtitle');
    expect(element.textContent).toEqual(caller1.alt);
  });

  it('should handle caller.type', () => {
    alertService.show({
      title: title,
      caller: {
        title: '+1 972-555-1212',
        type: 'number'
      },
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.md-avatar__letter');
    expect(element.textContent).toEqual('#');
  });

  it('should handle device', () => {
    alertService.show({
      title: title,
      caller: {
        title: 'SJC21-Babelfish',
        alt: '+1 469-555-1212',
        type: 'device'
      },
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('.md-avatar__icon');
    expect(element.length).toEqual(1);
  });

  it('should render two action buttons when onAnswerVoice is passed in', () => {
    alertService.show({
      title: title,
      caller: caller1,
      onAnswerVoice: () => {},
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    expect(element.length).toEqual(2);
  });

  it('should render reject action button when nothing else is passed in', () => {
    alertService.show({
      title: title,
      caller: caller1,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    expect(element.length).toEqual(1);
  });

  it('should handle onReject event', () => {
    let count = 0;
    alertService.show({
      title: title,
      caller: caller1,
      onReject: () => count++
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    (element[element.length - 1] as HTMLButtonElement).click();
    expect(count).toEqual(1);
  });

  it('should handle onAnswerShare event', () => {
    let count = 0;
    alertService.show({
      title: title,
      caller: caller1,
      onAnswerShare: () => count++
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    (element[0] as HTMLButtonElement).click();
    expect(count).toEqual(1);
  });

  it('should handle onAnswerVoice event', () => {
    let count = 0;
    alertService.show({
      title: title,
      caller: caller1,
      onAnswerVoice: () => count++
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    (element[0] as HTMLButtonElement).click();
    expect(count).toEqual(1);
  });

  it('should handle onAnswerVideo event', () => {
    let count = 0;
    alertService.show({
      title: title,
      caller: caller1,
      onAnswerVideo: () => count++
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('button');
    (element[0] as HTMLButtonElement).click();
    expect(count).toEqual(1);
  });
});
