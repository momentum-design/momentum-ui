import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputHelperModule } from '../../input-helper';

@Component({
  template: `
    <md-input-helper [className]="className">test</md-input-helper>
  `,
})

class MDInputHelperComponent {
  className: string;
}

describe('InputHelperComponent', () => {
  let component: MDInputHelperComponent;
  let fixture: ComponentFixture<MDInputHelperComponent>;
  let helperEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MDInputHelperComponent],
      imports: [InputHelperModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDInputHelperComponent);
    component = fixture.componentInstance;
    helperEl = fixture.debugElement.query(By.css('md-input-helper')).nativeElement;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a help text to the input', () => {
    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement.textContent;

    expect(inputNativeElement).toBe('test');
  });

  it('should render a className', () => {
    component.className = 'test-class';
    fixture.detectChanges();

    expect(helperEl.className).toContain('test-class');
  });
});
