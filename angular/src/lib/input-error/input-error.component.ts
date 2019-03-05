import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cui-input-error',
  template: `
  <div class="cui-input__messages" role="alert">
    <div class="message">{{error}}</div>
  </div>
  `,
  styles: []
})
export class InputErrorComponent implements OnInit {

  @Input() public error: string;

  constructor() { }

  ngOnInit() {
  }

}
