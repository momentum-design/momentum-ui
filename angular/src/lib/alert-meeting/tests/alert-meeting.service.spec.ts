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
import { CompositeAvatarModule } from '../../composite-avatar';
import { AlertMeetingModule, AlertMeetingService } from '../index';

describe('AlertMeetingService', () => {
  let alertService: AlertMeetingService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let viewContainerFixture: ComponentFixture<ContainerComponent>;

  const title = 'Important Meeting';
  const message = 'Attendance Required';
  const status = 'In 5 mins.';

  const attendeeOne = {title: 'J $'};
  const attendeeTwo = {title: 'Hee Haw'};
  const attendeeThree = {title: 'Hollywood Squarepants'};

  const attendeeListOne = [attendeeOne];
  const attendeeListTwo = [attendeeOne, attendeeTwo];
  const attendeeListThree = [attendeeOne, attendeeTwo, attendeeThree];

  @Component({
    selector: 'view-container',
    template: ``,
  })
  class ContainerComponent {}

  @NgModule({
    imports: [
      CommonModule,
      AlertMeetingModule,
      AvatarModule,
      CompositeAvatarModule,
    ],
    exports: [ContainerComponent],
    providers: [AlertMeetingService],
    declarations: [ContainerComponent],
    entryComponents: [ContainerComponent],
  })
  class AlertMeetingTestModule {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AlertMeetingModule,
        AlertMeetingTestModule,
        AvatarModule,
        CompositeAvatarModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(inject([AlertMeetingService, OverlayContainer], (service: AlertMeetingService, container: OverlayContainer) => {
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

  it('should render one AlertMeeting', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
    });
    viewContainerFixture.detectChanges();

    const container = overlayContainerElement.querySelector('cui-alert-meeting-container');
    expect(container).not.toBeNull();
    const element = container.querySelector('cui-alert-meeting');
    expect(element).not.toBeNull();
    expect(element.className).toContain('cui-alert--meeting');
  });

  it('should render meeting title', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert__title');
    expect(element.textContent).toEqual(title);
  });

  it('should render meeting message', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert__message');
    expect(element.textContent).toEqual(message);
  });

  it('should render meeting status', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert__status');
    expect(element.textContent).toEqual(status);
  });

  it('should render an avatar', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('cui-avatar');
    expect(element.length).toEqual(1);
  });

  it('should only render a close button when onSnooze is not passed in', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('.cui-button');
    expect(element.length).toEqual(1);
  });

  it('should render snooze button when onSnooze is passed in', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
      onSnooze: () => {}
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('.cui-button');
    expect(element.length).toEqual(2);
  });

  it('should handle snooze aria-label when remindAriaLabel is passed in', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
      remindAriaLabel: 'testSnooze',
      onSnooze: () => {}
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('.cui-button');
    expect(element[0].getAttribute('aria-label')).toEqual('testSnooze');
  });

  it('should handle close aria-label when closeAriaLabel is passed in', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
      closeAriaLabel: 'testClose',
      onHide: () => {}
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('.cui-button');
    expect(element[0].getAttribute('aria-label')).toEqual('testClose');
  });

  it('should use cui-alert__content class when onSnooze is passed in', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
      onSnooze: () => {}
    });
    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelectorAll('.cui-alert__content').length).toEqual(1);
    expect(overlayContainerElement.querySelectorAll('.cui-alert__content--wide').length).toEqual(0);
  });

  it('should use cui-alert__content--wide class when onSnooze is not passed in', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
    });
    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelectorAll('.cui-alert__content').length).toEqual(1);
    expect(overlayContainerElement.querySelectorAll('.cui-alert__content--wide').length).toEqual(1);
  });

  it('should render a composite avatar when attendee list is greater than 1', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListTwo,
    });
    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelectorAll('cui-composite-avatar').length).toEqual(1);
    expect(overlayContainerElement.querySelectorAll('cui-avatar').length).toEqual(2);
  });

  it('should render a composite avatar with only 2 avatars when attendee list is greater than 2', () => {
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListThree,
    });
    viewContainerFixture.detectChanges();

    expect(overlayContainerElement.querySelectorAll('cui-composite-avatar').length).toEqual(1);
    expect(overlayContainerElement.querySelectorAll('cui-avatar').length).toEqual(2);
  });

  it('should handle onClick event', () => {
    let count = 0;
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
      onClick: () => count++
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelector('.cui-alert--meeting');
    (element as HTMLButtonElement).click();
    expect(count).toBe(1);
  });

  it('should handle space keyDown event', () => {
    let count = 0;
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
      onClick: () => count++
    });
    viewContainerFixture.detectChanges();

    overlayContainerElement.querySelector('.cui-alert').dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'Space',
      })
    );
    expect(count).toBe(1);
  });

  it('should handle enter keyDown event', () => {
    let count = 0;
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
      onClick: () => count++
    });
    viewContainerFixture.detectChanges();

    overlayContainerElement.querySelector('.cui-alert').dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'Enter',
      })
    );
    expect(count).toBe(1);
  });

  it('should handle onSnooze event', () => {
    let count = 0;
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
      onSnooze: () => count++
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('.cui-button');
    (element[0] as HTMLButtonElement).click();
    expect(count).toBe(1);
  });

  it('should handle onHide event', () => {
    let count = 0;
    alertService.show({
      title: title,
      message: message,
      status: status,
      attendees: attendeeListOne,
      onHide: () => count++
    });
    viewContainerFixture.detectChanges();

    const element = overlayContainerElement.querySelectorAll('.cui-button');
    (element[0] as HTMLButtonElement).click();
    expect(count).toBe(1);
  });

});
