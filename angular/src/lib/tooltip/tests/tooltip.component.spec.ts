import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BadgeModule } from 'src/lib/public_api';
import { TooltipModule } from '../tooltip.module';
import { OverlayContainer, Overlay } from '@angular/cdk/overlay';

@Component({
  template: `<md-badge mdTooltip="Hello World!">tooltip with text only</md-badge>
  <button md-button mdTooltip="my button" direction="bottom" showArrow="false" aria-label="myAriaLabel" (click)="onClick()">
        Test Me
      </button>`
})
class TesttooltipComponent {}

describe('tooltip Test', () => {
  let component: TesttooltipComponent;
  let fixture: ComponentFixture<TesttooltipComponent>;
  let testEl: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesttooltipComponent ],
      imports: [BadgeModule, TooltipModule],
      providers: [Overlay]
    })
    .compileComponents();
  }));


  beforeEach(inject([OverlayContainer], (container: OverlayContainer) => {
    overlayContainer = container;
    overlayContainerEl = container.getContainerElement();
    fixture = TestBed.createComponent(TesttooltipComponent);
    component = fixture.componentInstance;
    testEl = fixture.debugElement.query(By.css('md-badge'));
    testEl.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
  }));

  it('should match snapshot', () => {
    expect(overlayContainerEl).toMatchSnapshot();
  });

  it('tooltip should appear when hovering over badge', () => {
    const tooltipEl = overlayContainerEl.querySelector('md-tooltip');
    expect(tooltipEl).not.toBeNull();
  });

  it('default tooltip should have the the default classes', () => {

    const divEl = overlayContainerEl.querySelectorAll('div');
    expect(divEl[2].className).toContain('md-event-overlay md-event-overlay--top md-tooltip md-event-overlay--arrow');
  });
});
