import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'md-input-helper',
  template: `
    <p [ngClass]="inputHelperClasses" class="md-input__help-text">
      {{ message }}
    </p>
  `,
  styles: [],
})
export class InputHelperComponent implements OnInit {
  @Input() public message: string;
  @Input() public className: string;

  constructor() {}

  ngOnInit() {}

  get inputHelperClasses() {
    return {
      [this.className]: this.className,
    };
  }
}
