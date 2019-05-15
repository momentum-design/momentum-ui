import { Component, OnInit, ViewChild } from '@angular/core';
import { CoachmarkComponent } from '@momentum-ui/angular';

@Component({
  selector: 'example-coachmark-default',
  template: `
    <a #myTitle class='md-button md-button--36 mrt' (click)="show('myCoachmark')">Open my coachmark</a>
    <md-coachmark #myCoachmark [archor]='myTitle' className='testAddOnClass'>
      <p>coachmark</p>
      <ng-container coahmark_subheader>subheader</ng-container>
      <a #coachmark_close class='md-button md-button--36'>close</a>
    </md-coachmark>
    <a #myTitle2 class='md-button md-button--36 mrt' (click)="show('myCoachmark2')">Open another coachmark</a>
    <md-coachmark #myCoachmark2 [archor]='myTitle2' originX='end' originY='top' [height]='300'>
      <p>coachmark end top</p>
      <ng-container coachmark_header>header</ng-container>
      <a #coachmark_close class='md-button md-button--36'>close</a>
    </md-coachmark>
    <br>
    <a #myTitle3 class='md-button md-button--36 mrt' (click)="show('myCoachmark3')">Open another coachmark</a>
    <md-coachmark #myCoachmark3 [archor]='myTitle3' overlayY='bottom' originY='top' originX='end' overlayX='end'>
      <p>coachmark end top</p>
      <ng-container coachmark_header>header</ng-container>
      <a #coachmark_close class='md-button md-button--36'>close</a>
    </md-coachmark>
    <a #myTitle4 class='md-button md-button--36 mrt' (click)="show('myCoachmark4')">Open another coachmark</a>
    <md-coachmark #myCoachmark4 [archor]='myTitle4' originX='start' overlayX='end' overlayY='bottom'>
      <p>coachmark end top</p>
      <ng-container coachmark_header>header</ng-container>
      <a #coachmark_close class='md-button md-button--36'>close</a>
    </md-coachmark>
  `,
  styles: ['.mrt{margin:300px 0 0 300px;}']
})
export class CoachmarkDefaultComponent implements OnInit {

  @ViewChild('myCoachmark') myCoachmark: CoachmarkComponent;
  @ViewChild('myCoachmark2') myCoachmark2: CoachmarkComponent;
  @ViewChild('myCoachmark3') myCoachmark3: CoachmarkComponent;
  @ViewChild('myCoachmark4') myCoachmark4: CoachmarkComponent;


  constructor() { }

  ngOnInit() {
  }

  show = (name) => {
    this[name].show();
  }

}
