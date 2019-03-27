import { Component } from '@angular/core';
import { SliderChange } from '@collab-ui/angular/slider';

@Component({
  selector: 'example-slider-default',
  template: `
    <div>
      {{ label }}
    </div>
    <cui-slider
      [(ngModel)]="value"
      max="500"
      tick="100"
      (change)="change($event)"
    ></cui-slider>
  `,
})
export class ExampleSliderDefaultComponent {
  value: number = 200;
  get label(): string {
    return `${this.value}`;
  }

  change(event: SliderChange) {
    console.info(event);
  }
}
