import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-playground',
  template: `
        <!-- Insert example here -->

        <example-sidebar-default></example-sidebar-default>

       <!-- <br>

        <example-sidebar-dark></example-sidebar-dark>

        <br>

        <example-sidebar-with-icons></example-sidebar-with-icons>

        <br>

        <example-sidebar-page-level></example-sidebar-page-level> -->
  `,
})
export class PlaygroundComponent implements OnInit {
  ngOnInit() {}

  onSelect (event) {
    console.info('custom onSelect working');
  }
}