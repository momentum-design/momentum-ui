import { Component } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputSectionModule } from '../../input-section';

@Component({
  template: `
    <md-input-section [className]="className" [position]="position">
      Test
    </md-input-section>
  `,
})

class MDInputSectionComponent {
  className: string;
  position: string;
}

describe('InputSectionComponent', () => {
  let component: MDInputSectionComponent;
  let fixture: ComponentFixture<MDInputSectionComponent>;
  let sectionEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MDInputSectionComponent],
      imports: [InputSectionModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDInputSectionComponent);
    component = fixture.componentInstance;
    sectionEl = fixture.debugElement.query(By.css('md-input-section')).nativeElement;
    fixture.detectChanges();
  });

  it('should create and match snapshot', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correct position', () => {
    expect(sectionEl.className.includes('before')).toBe(true);
    fixture.componentInstance.position = 'after';
    fixture.detectChanges();

    expect(sectionEl.className.includes('after')).toBe(true);
  });

  it('should render className', () => {
    expect(sectionEl.className.includes('test-class')).toBeFalsy();
    fixture.componentInstance.className = 'test-class';
    fixture.detectChanges();

    expect(sectionEl.className.includes('test-class')).toBe(true);
  });
});

