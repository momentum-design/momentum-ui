import { Component } from '@angular/core';

@Component({
  selector: 'example-data-table',
  template: `
    <div>
      <select [(ngModel)]="choice" style="width: 20rem;">
          <option *ngFor="let c of choices" [ngValue]="c">{{c.name}}</option>
      </select>
    </div>
    <ng-container [ngSwitch]="choice.id">
        <example-data-table-default *ngSwitchCase="'default'"></example-data-table-default>
        <example-data-table-avatar *ngSwitchCase="'avatar'"></example-data-table-avatar>
        <example-data-table-multi-dropdown-select *ngSwitchCase="'multi-drop'"></example-data-table-multi-dropdown-select>
        <example-data-table-multi-select-checkbox *ngSwitchCase="'multi-select-check'"></example-data-table-multi-select-checkbox>
        <example-data-table-multi-select-resize-scroll *ngSwitchCase="'multi-select-scroll'"></example-data-table-multi-select-resize-scroll>
        <example-data-table-resize *ngSwitchCase="'resize'"></example-data-table-resize>
        <example-data-table-resize-scroll *ngSwitchCase="'resize-scroll'"></example-data-table-resize-scroll>
        <example-data-table-scroll *ngSwitchCase="'scroll'"></example-data-table-scroll>
        <example-data-table-select *ngSwitchCase="'select'"></example-data-table-select>
        <example-data-table-selection *ngSwitchCase="'selection'"></example-data-table-selection>
        <example-data-table-sort *ngSwitchCase="'sort'"></example-data-table-sort>
        <example-data-table-custom-sort *ngSwitchCase="'sort-custom'"></example-data-table-custom-sort>
        <example-data-table-virtual-scroll *ngSwitchCase="'virtual-scroll'"></example-data-table-virtual-scroll>
        <example-data-table-zebra *ngSwitchCase="'zebra'"></example-data-table-zebra>
    </ng-container>
  `,
  styles: [],
})

export class ExampleDataTableComponent {
    choices = [
        { id: 'default', name: 'Default' },
        { id: 'avatar', name: 'Avatar' },
        { id: 'multi-drop', name: 'Multi-Dropdown' },
        { id: 'multi-select-check', name: 'Multi-Select Checkbox'},
        { id: 'multi-select-scroll', name: 'Multi-Select Scroll' },
        { id: 'resize', name: 'Resize' },
        { id: 'resize-scroll', name: 'Resize Scroll'},
        { id: 'scroll', name: 'Scroll' },
        { id: 'select', name: 'Select' },
        { id: 'selection', name: 'Selection' },
        { id: 'sort', name: 'Sort' },
        { id: 'sort-custom', name: 'Sort (Custom)' },
        { id: 'virtual-scroll', name: 'Virtual Scroll' },
        { id: 'zebra', name: 'Zebra' }
    ];

    choice = this.choices[0];
}
