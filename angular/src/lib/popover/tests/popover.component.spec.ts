import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BadgeModule } from 'src/lib/public_api';
import { PopoverModule } from '../popover.module';
import { OverlayContainer, Overlay } from '@angular/cdk/overlay';

@Component({
  template: `<md-badge mdPopover="Hello World!">Popover with text only</md-badge>
  <button md-button mdPopover="my button" direction="bottom" showArrow="false" aria-label="myAriaLabel" (click)="onClick()">
        Test Me
      </button>`
})
class TestPopoverComponent {}

describe('Popover Test', () => {
  let component: TestPopoverComponent;
  let fixture: ComponentFixture<TestPopoverComponent>;
  let testEl: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPopoverComponent ],
      imports: [BadgeModule, PopoverModule],
      providers: [Overlay]
    })
    .compileComponents();
  }));

  beforeEach(inject([OverlayContainer], (container: OverlayContainer) => {
    overlayContainer = container;
    overlayContainerEl = container.getContainerElement();
    fixture = TestBed.createComponent(TestPopoverComponent);
    component = fixture.componentInstance;
    testEl = fixture.debugElement.query(By.css('md-badge'));
    testEl.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
  }));

  it('should match snapshot', () => {
    expect(overlayContainerEl).toMatchSnapshot();
  });

  it('popover should appear when hovering over badge', () => {

    const popoverEl = overlayContainerEl.querySelector('md-popover');
    expect(popoverEl).not.toBeNull();
  });

  it('default popover should have the the default classes', () => {

    const divEl = overlayContainerEl.querySelectorAll('div');
    expect(divEl[2].className).toContain('md-popover md-event-overlay md-event-overlay--arrow md-event-overlay--right');
  });
});
