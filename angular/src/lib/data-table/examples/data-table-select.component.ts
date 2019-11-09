import { Component } from '@angular/core';

@Component({
  selector: 'example-data-table-select',
  template: `

    <md-data-table
      [columns]="columns"
      [data]="people"
      containerClass="testContainerClass"
      [rowSelection]="true"
      [(selection)]="selectedPerson"
      [columnDividers]="true"
      [containerStyle]="{'width': '100%'}"
      (rowSelect)="onRowSelect($event)"
      (rowUnselect)="onRowUnselect($event)"
    >

      <ng-template mdTemplateName="header" let-columns>
        <tr>
          <th style="width: 2rem">

          </th>
          <th style="width: 5rem">Full Name</th>
          <th style="width: 5rem">Email</th>
          <th style="width: 6rem">Last Updated</th>
          <th style="width: 10rem">Status</th>
        </tr>
      </ng-template>

      <ng-template mdTemplateName="body" let-row let-rowIndex="rowIndex">
        <tr [mdSelectRow]="row">
          <td>
            <md-avatar title="{{row['avatar']}}"></md-avatar>
          </td>
          <td>
            {{row['name']}}
          </td>
          <td>
            {{row['email']}}
          </td>
          <td>
            {{row['updated']}}  {{rowIndex}}
          </td>
          <td>
            <md-select
              [tableRowIndex]="rowIndex"
              [options]="options"
              [(ngModel)]="row.status"
              [defaultValue]="row.status"
              (handleChange)="onChange($event)"
              optionLabel="status"
              buttonClass="custom-button-class"
              [buttonStyle]="{width: '100%'}"
              overlayClass="testOverlayClass" >
            </md-select>
          </td>
        </tr>
      </ng-template>
    </md-data-table>

    <div *ngIf="!!selectedPerson">
      Selected Row:
      {{selectedPerson.name}} - {{selectedPerson.email}} - {{selectedPerson.updated}} - {{selectedPerson.status}}
    </div>
  `,
  styles: []
})
export class DataTableSelectComponent {

  status;
  selectedPerson: [];

  columns = [
    { header: 'Full Name', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Last Updated', field: 'updated' },
    { header: 'Status', field: 'status' }
  ];

  people = [
    {'avatar': 'John Jones', 'name': 'John Jones', 'email': 'jjones@cisco.com', 'updated': '02-July-2019', 'status': 'Active'},
    {'avatar': 'Paul Baltes', 'name': 'Paul Baltes', 'email': 'pbaltes@cisco.com', 'updated': '03-June-2019', 'status': 'Active'},
    {'avatar': 'Caleb Valdez', 'name': 'Caleb Valdez', 'email': 'cvaldez@cisco.com', 'updated': '07-May-2019', 'status': 'Pending'},
    {'avatar': 'Corelia Ball', 'name': 'Corelia Ball', 'email': 'cball@cisco.com', 'updated': '04-July-2019', 'status': 'Trial' },
    {'avatar': 'Mike Snow', 'name': 'Mike Snow', 'email': 'msnow@cisco.com', 'updated': '05-April-2019', 'status': 'Active'},
    {'avatar': 'Joe Johnson', 'name': 'Joe Johnson', 'email': 'jjohnson@cisco.com', 'updated': '05-July-2019', 'status': 'Pending'},
    {'avatar': 'Robert McGregor', 'name': 'Robert McGregor', 'email': 'rmcgregor@cisco.com', 'updated': '01-July-2019', 'status': 'Trial'},
    {'avatar': 'Greg Dmritov', 'name': 'Greg Dmritov', 'email': 'gdmritov@cisco.com', 'updated': '05-March-2019', 'status': 'Active'},
    {'avatar': 'Thomas Campbell', 'name': 'Thomas Campbell', 'email': 'tcampbell@cisco.com', 'updated': '07-July-2019', 'status': 'Active'},
    {'avatar': 'Derek Nelson', 'name': 'Derek Nelson', 'email': 'dnelson@cisco.com', 'updated': '07-June-2019', 'status': 'Trial'}
  ];

  options = [
    {status: 'Active'},
    {status: 'Pending'},
    {status: 'Trial'},
  ];

  onChange(e) {
    console.info('select change: ', e.value);
  }

  onRowSelect(e) {
    console.info('row select emitter : ', e);
  }

  onRowUnselect(e) {
    console.info('unselected: ', e);
  }
}
