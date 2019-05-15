import { Component, OnInit, ViewChild } from '@angular/core';
import { CoachmarkComponent } from '@momentum-ui/angular';

@Component({
  selector: 'example-coachmark-backdrop',
  template: `
    <a #myTitle class='md-button md-button--36 mrt' (click)='show("myCoachmark")' >Coach mark will point me</a>
    <md-coachmark #myCoachmark [archor]='myTitle' [allowClickAway]='true' (whenClick)='handleClick($event)' (whenClose)='handleClose()'>
      <p>allowClickAway</p>
      <a class='md-button md-button--36' #coachmark_close>hide</a>
    </md-coachmark>
    <a #myTitle2 class='md-button md-button--36 mrt' (click)='show("myCoachmark2")' >Coach mark will point me</a>
    <md-coachmark #myCoachmark2 [archor]='myTitle2' [closeOnClick]='true'>
      <p>closeOnClick</p>
      <a class='md-button md-button--36' #coachmark_close>hide</a>
    </md-coachmark>
  `,
  styles: ['.mrt{margin:300px 0 0 300px;}']
})
export class CoachmarkBackdropComponent implements OnInit {

  @ViewChild('myCoachmark') myCoachmark: CoachmarkComponent;
  @ViewChild('myCoachmark2') myCoachmark2: CoachmarkComponent;

  constructor() { }

  ngOnInit() {

  }

  show = (name) => {
    this[name].show();
  }

  handleClick = (e) => {
    console.info(e);
  }

  handleClose = () => {
    console.info('coach mark has been closed');
  }

}
