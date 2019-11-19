import { Component } from '@angular/core';

@Component({
  selector: 'example-tabs-default',
  template: `
    <md-tabs
      [focus]="0"
      className="MyClass"
      (whenSelect)="onClick($event)"
    >
      <md-tab-header heading="test"></md-tab-header>
      <md-tab-list>
        <md-tab>
          Onboarding
        </md-tab>

        <md-tab>
          Subscriptions
        </md-tab>

        <md-tab>
          Info
        </md-tab>
      </md-tab-list>

    <md-tab-content>
      <md-tab-pane>Pane A1</md-tab-pane>
      <md-tab-pane>Pane A2</md-tab-pane>
      <md-tab-pane>Pane A3</md-tab-pane>
    </md-tab-content>


    </md-tabs>
  `,
})
export class ExampleTabsDefaultComponent {
  // can use md-tabs without md-tab-content for just tabs without panes
  onClick = e => {
    console.info('tab idx: ', e);
  }
}
