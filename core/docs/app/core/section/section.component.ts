import { NgClass } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'docs-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent implements OnInit {
  public angularJsImg = require('assets/angularjs-inline.png');
  public angularImg = require('assets/angular-inline.png');
  public reactImg = require('assets/react-inline.png');
  public angularUrl;
  public angularJsUrl;
  public reactUrl;
  public id;

  @Input() public section;
  @Input() public showCode;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const catId = this.route.snapshot.params.category;
    const compId = this.route.snapshot.params.component;
    const path = `${catId}/${compId}#{this.section.section}`;
    this.angularUrl = `http://collab-ui-angular/${path}`;
    this.angularJsUrl = `http://collab-ui-angularjs/${path}`;
    this.reactUrl = `http://collab-ui-react/${path}`;
    this.id = `${this.section.component}-${this.section.section}`;
  }

}
