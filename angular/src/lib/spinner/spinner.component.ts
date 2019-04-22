import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'md-spinner',
  templateUrl: './spinner.component.html',
  styles: [],
})
export class SpinnerComponent implements OnInit {
  @Input() public className: string;
  @Input() public color: string = 'black';
  @Input() public size: number = 36;
  @Input() public percentage: number;
  @Input() public showCheck: boolean = false;
  @Input() public showPercentage: boolean = false;

  public isPercentage: boolean;

  constructor() {}

  ngOnInit() {
    this.checkPercentage(this.percentage);
  }

  get defaultClasses() {
    return {
      ['md-spinner--' + this.size]: this.sizeCheck(this.size),
      ['md-spinner--36']: Number(this.size) === 36,
      ['md-spinner--' + this.color]: this.color,
      [this.className]: this.className,
    };
  }

  get percentageClasses() {
    return {
      ['md-spinner-progress--' + this.size]: this.sizeCheck(this.size),
      ['md-spinner-progress__percentage-' + this.percentage]: this.percentage,
      ['md-spinner-progress--' + this.color]: this.color,
      [this.className]: this.className,
    };
  }

  get checkMarkClasses() {
    return {
      ['md-spinner-progress__inset-circle--check']:
        this.sizeCheck(this.size) && this.showCheck,
      ['md-spinner-progress__inset-circle--check' + this.percentage]:
        this.showCheck && Number(this.percentage) === 100,
    };
  }

  private checkPercentage = percent => {
    if (!isNaN(percent)) {
      this.isPercentage = true;
      this.percentage = Math.round(percent);
    }
    if (Number(this.size) !== 36 && this.showPercentage) {
      console.warn(
        'Spinner: Percentage will not be shown for sizes smaller than 36'
      );
    }
  }

  private sizeCheck = size => {
    const sizes = [16, 20, 28, 36];
    if (sizes.includes(Number(size))) {
      return true;
    }
    console.warn('Only sizes 16, 20, 28, 36 are acceptable for spinner');
    return false;
  }
}
