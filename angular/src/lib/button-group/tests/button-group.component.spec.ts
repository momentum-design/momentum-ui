import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonGroupModule } from '../button-group.module';
import { ButtonModule } from '../../button';

describe('ButtonGroupComponent', () => {
  let testComponent: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  @Component({
    selector: 'test-app',
    template: `
      <md-button-group class="default">
        <button md-button aria-label="1">one</button>
        <button md-button aria-label="2" [disabled]="true">two</button>
      </md-button-group>

      <md-button-group class="pill" type="pill">
        <button md-button aria-label="1">one</button>
        <button md-button aria-label="2">two</button>
      </md-button-group>

      <md-button-group class="highlightSelected" [highlightSelected]="false">
        <button md-button aria-label="1">one</button>
        <button md-button aria-label="2">two</button>
      </md-button-group>

      <md-button-group class="activeIndex" activeIndex=1>
        <button md-button aria-label="1">one</button>
        <button md-button aria-label="2">two</button>
      </md-button-group>

      <md-button-group class="focusOnLoad" [focusOnLoad]="true">
        <button md-button aria-label="1" id="focus-one">one</button>
        <button md-button aria-label="2" id="focus-two">two</button>
      </md-button-group>
    `,
  })
  class TestAppComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [ButtonGroupModule, ButtonModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAppComponent);
    testComponent = fixture.componentInstance;
  });

  it('should create and match snapshot', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('ButtonGroup should have justified as true', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.default');
    expect(element.className).toContain('md-button-group--justified');
  });

  it('ButtonGroup type is set to pill', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.pill');
    expect(element.className).toContain('md-button-group--pill');
  });

  it('should not highlight the active button when highlightSelected is false', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.highlightSelected');
    const button = element.querySelector('button');
    button.click();
    expect(button.className).not.toContain('active');
  });

  it('onClick should should mark the button as active', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.default');
    const button = element.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(button.className).toContain('active');
  });

  it('if focusOnLoad is set to true, then should set the focus on the first button', () => {
    fixture.detectChanges();
    expect(document.activeElement.id).toEqual('focus-one');
  });

  it('when activeIndex prop is passed, the button should be selected', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.activeIndex');
    const buttons = element.querySelectorAll('button');
    expect(buttons[1].className).toContain('active');
  });

  it('on keyboard events arrow right', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.focusOnLoad');
    const buttons = element.querySelectorAll('button');
    buttons[0].dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      })
    );
    fixture.detectChanges();
    expect(buttons[1].getAttribute('tabindex')).toEqual('0');
  });

  it('on keyboard events arrow down', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.focusOnLoad');
    const buttons = element.querySelectorAll('button');
    buttons[0].dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      })
    );
    fixture.detectChanges();
    expect(buttons[1].getAttribute('tabindex')).toEqual('0');
  });

  it('on keyboard events arrow left', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.focusOnLoad');
    const buttons = element.querySelectorAll('button');
    buttons[0].dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      })
    );
    fixture.detectChanges();
    expect(buttons[1].getAttribute('tabindex')).toEqual('0');
  });

  it('on keyboard events arrow up', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.focusOnLoad');
    const buttons = element.querySelectorAll('button');
    buttons[0].dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      })
    );
    fixture.detectChanges();
    expect(buttons[1].getAttribute('tabindex')).toEqual('0');
  });

});
