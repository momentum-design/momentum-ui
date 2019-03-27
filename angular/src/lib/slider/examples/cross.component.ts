import { Component } from '@angular/core';
import { SliderChange } from '@collab-ui/angular/slider';

@Component({
  selector: 'example-slider-cross',
  template: `
    <div>
      {{ label }}
    </div>
    <cui-slider
      [(ngModel)]="value"
      max=500
      tick=100
      [canCross]="true"
      (change)="onChange($event)"
    ></cui-slider>
  `
})
export class ExampleSliderCrossComponent {
  value: SliderChange = {high: 300, low: 100};
  get label(): string { return `Low: ${this.value.low} High: ${this.value.high}`; }

  onChange(event: SliderChange) {
   console.log(event);
  }
}
