import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-sidebar-footer',
  template: `<ng-content></ng-content>`,
  styles: [],
  host: {
    'class': 'md-sidebar__footer'
  }

})
export class SidebarFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
