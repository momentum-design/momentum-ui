import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'md-card',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
  host: {
    'class': 'md-card',
  }
})

export class CardComponent {

}
