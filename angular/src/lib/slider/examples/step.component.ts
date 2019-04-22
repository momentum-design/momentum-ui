import { Component } from '@angular/core';
import { SliderChange } from '@collab-ui/angular/slider';

@Component({
  selector: 'example-slider-step',
  template: `
    <div>
      {{ label }}
    </div>
    <md-slider
      [(ngModel)]="value"
      max="500"
      tick="100"
      step="20"
      (change)="change($event)"
    ></md-slider>
  `,
})
export class ExampleSliderStepComponent {
  value: SliderChange = { high: 300, low: 100 };
  get label(): string {
    return `Low: ${this.value.low} High: ${this.value.high}`;
  }

  change(event: SliderChange) {
    console.info(event);
  }
}
