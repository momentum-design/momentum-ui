import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-sidebar-header',
  template: `<ng-content></ng-content>`,
  styles: [],
  host: {
    'class': 'md-sidebar__header'
  }
})
export class SidebarHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
