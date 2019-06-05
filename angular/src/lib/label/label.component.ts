import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'md-label',
  templateUrl: './label.component.html',
  styles: [],
})
export class LabelComponent implements OnInit {
  @Input() public className: string;
  @Input() public theme: string;
  @Input() public label: string;
  @Input() public htmlFor: string;

  constructor() {}

  ngOnInit() {}

  get labelClasses() {
    return {
      ['md-label--' + this.theme]: this.theme,
      [this.className]: this.className,
    };
  }
}
