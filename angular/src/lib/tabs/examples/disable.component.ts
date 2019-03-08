import { Component } from '@angular/core';

@Component({
  selector: 'example-tabs-disable',
  template: `
    <cui-tabs [focus]='1' className='MyClass' (whenSelect)='onClick($event)'>
        <cui-tab-header heading='test'></cui-tab-header>
        <cui-tab-list>
            <cui-tab>B</cui-tab>
            <cui-tab>A1</cui-tab>
            <cui-tab [disabled]='true'>A2</cui-tab>
            <cui-tab>A3</cui-tab>
        </cui-tab-list>
        <cui-tab-content>
            <cui-tab-pane>Pane B</cui-tab-pane>
            <cui-tab-pane>Pane A1</cui-tab-pane>
            <cui-tab-pane>Pane A2</cui-tab-pane>
            <cui-tab-pane>Pane A3</cui-tab-pane>
        </cui-tab-content>
    </cui-tabs>
  `,
})
export class ExampleTabsDisableComponent {

  dataModel: string = 'Test';

  constructor() {

  }

  onClick = (e) => {
    console.log(e);
  }
}
