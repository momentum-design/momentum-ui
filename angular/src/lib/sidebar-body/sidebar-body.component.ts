import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-sidebar-body',
  template: `<ng-content></ng-content>`,
  styles: [],
  host: {
    'class': 'md-sidebar__body'
  }
})
export class SideBarBodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
