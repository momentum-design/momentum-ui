import { Component, OnInit, ViewChild } from '@angular/core';
import { CoachmarkComponent } from '@momentum-ui/angular';

@Component({
  selector: 'example-coachmark-open',
  template: `
    <a #myTitle class='md-button md-button--36 mrt' (click)='show()' >Coach mark will point me</a>
    <md-coachmark #myCoachmark [archor]='myTitle' [isOpen]='true'>
      <p>ng-content here</p>
      <ng-container coahmark_subheader>subheader</ng-container>
      <a class='md-button md-button--36' #coachmark_close>hide</a>
    </md-coachmark>
  `,
  styles: ['.mrt{margin:300px 0 0 300px;}']
})
export class CoachmarkOpenComponent implements OnInit {

  @ViewChild('myCoachmark') myCoachmark: CoachmarkComponent;

  constructor() { }

  ngOnInit() {

  }

  show = () => {
    this.myCoachmark.show();
  }

}
