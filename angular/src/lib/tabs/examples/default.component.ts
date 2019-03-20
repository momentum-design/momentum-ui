import { Component } from '@angular/core';

@Component({
  selector: 'example-tabs-default',
  template: `
    <cui-tabs [focus]='0' className='MyClass' (whenSelect)='onClick($event)'>
        <cui-tab-header heading='test'></cui-tab-header>
        <cui-tab-list>
            <cui-tab>Tab A</cui-tab>
            <cui-tab>Tab B</cui-tab>
        </cui-tab-list>
        <cui-tab-content>
            <cui-tab-pane>Pane A</cui-tab-pane>
            <cui-tab-pane>Pane B</cui-tab-pane>
        </cui-tab-content>
    </cui-tabs>
  `,
})
export class ExampleTabsDefaultComponent {
  
  onClick = (e) => {
    console.log(e);
  }
}
