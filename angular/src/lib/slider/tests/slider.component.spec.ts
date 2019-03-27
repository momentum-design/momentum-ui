import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderChange, SliderComponent } from '../slider.component';
import { SliderPointerChange } from '../slider-pointer.component';
import { SliderModule } from '../slider.module';

describe('SliderComponent', () => {
  let testComponent: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  @Component({
    selector: 'test-app',
    template: `
      <cui-slider
        [min]="0"
        [max]="100"
        (change)="change($event)"
      ></cui-slider>
    `,
  })
  class TestAppComponent {
    @ViewChild(SliderComponent) public slider: SliderComponent;

    change(_: SliderChange) {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestAppComponent],
      imports: [FormsModule, SliderModule],
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

  it('should render Slider properly', () => {
    testComponent.slider.value = { low: 10, high: 40 };
    fixture.detectChanges();
    const slider = fixture.nativeElement.querySelector('cui-slider');
    expect(slider.querySelectorAll('.cui-slider__pointer').length).toEqual(2);
    expect(slider.querySelectorAll('.cui-slider__bar').length).toEqual(1);
    expect(slider.querySelectorAll('.cui-slider__selection').length).toEqual(1);
  });

  it('when only one sliderPointer is present', () => {
    testComponent.slider.value = 40;
    fixture.detectChanges();
    const slider = fixture.nativeElement.querySelector('cui-slider');
    expect(slider.querySelectorAll('.cui-slider__pointer').length).toEqual(1);
  });

  it('when slider moves and attempts to cross over', () => {
    testComponent.slider.value = { low: 10, high: 40 };
    testComponent.slider.getSliderWidth = () => 100;
    fixture.detectChanges();

    spyOn(testComponent, 'change');
    testComponent.slider.onSliderMove('sliderLow', <SliderPointerChange>{
      from: 10,
      to: 70,
      direction: 1,
    });
    fixture.whenStable().then(() => {
      expect(testComponent.change).toHaveBeenCalledWith({
        low: 40,
        high: 40,
      });
    });
    expect(testComponent.slider.sliderLow).toEqual(40);
    expect(testComponent.slider.sliderHigh).toEqual(40);
  });

  it('should slider stops at boundaries when moving in forward direction', () => {
    testComponent.slider.value = { low: 10, high: 40 };
    testComponent.slider.getSliderWidth = () => 100;
    fixture.detectChanges();

    spyOn(testComponent, 'change');
    testComponent.slider.onSliderMove('sliderHigh', <SliderPointerChange>{
      from: 40,
      to: 110,
      direction: 1,
    });
    fixture.whenStable().then(() => {
      expect(testComponent.change).toHaveBeenCalledWith({
        low: 10,
        high: 100,
      });
    });
    expect(testComponent.slider.sliderHigh).toEqual(100);
  });

  it('should slider stops at boundaries when moving in backward direction', () => {
    testComponent.slider.value = { low: 10, high: 40 };
    testComponent.slider.getSliderWidth = () => 100;
    fixture.detectChanges();

    spyOn(testComponent, 'change');
    testComponent.slider.onSliderMove('sliderLow', <SliderPointerChange>{
      from: 10,
      to: -20,
      direction: -1,
    });
    fixture.whenStable().then(() => {
      expect(testComponent.change).toHaveBeenCalledWith({ low: 0, high: 40 });
    });
    expect(testComponent.slider.sliderLow).toEqual(0);
  });

  it('on keyboard events arrow right', () => {
    testComponent.slider.value = 40;
    testComponent.slider.getSliderWidth = () => 100;
    fixture.detectChanges();

    const slider = fixture.nativeElement.querySelector('cui-slider');

    slider.querySelector('.cui-slider__pointer').dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowRight',
      })
    );
    expect(testComponent.slider.sliderHigh).toEqual(41);
  });

  it('on keyboard events arrow left', () => {
    testComponent.slider.value = 40;
    testComponent.slider.getSliderWidth = () => 100;
    fixture.detectChanges();

    const slider = fixture.nativeElement.querySelector('cui-slider');

    slider.querySelector('.cui-slider__pointer').dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowLeft',
      })
    );
    expect(testComponent.slider.sliderHigh).toEqual(39);
  });

  it('on keyboard events arrow up', () => {
    testComponent.slider.value = 40;
    testComponent.slider.getSliderWidth = () => 100;
    fixture.detectChanges();

    const slider = fixture.nativeElement.querySelector('cui-slider');

    slider.querySelector('.cui-slider__pointer').dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowUp',
      })
    );
    expect(testComponent.slider.sliderHigh).toEqual(41);
  });

  it('on keyboard events arrow down', () => {
    testComponent.slider.value = 40;
    testComponent.slider.getSliderWidth = () => 100;
    fixture.detectChanges();

    const slider = fixture.nativeElement.querySelector('cui-slider');

    slider.querySelector('.cui-slider__pointer').dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'ArrowDown',
      })
    );
    expect(testComponent.slider.sliderHigh).toEqual(39);
  });
});
