import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { colors } from '../../../data/colors';

@Component({
  selector: 'docs-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlaygroundComponent implements OnInit {
  public title = 'Playground';
  public description = 'Use this page to develop and test components for the toolkit.';

  constructor() { }

  ngOnInit() {
  }
}
