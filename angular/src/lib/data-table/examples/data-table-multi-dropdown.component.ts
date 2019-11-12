import { Component } from '@angular/core';

@Component({
  selector: 'example-data-table-multi-dropdown-select',
  template: `

    <md-data-table
      [columns]="columns"
      [data]="people"
      containerClass="testContainerClass"
      dataKey="name"
      [(selection)]="selectedPeople"
      [columnDividers]="true"
      [containerStyle]="{'width': '100%'}"
    >

      <ng-template mdTemplateName="header" let-columns>
        <tr>
          <th style="width: 1rem">
            <md-data-table-header-checkbox></md-data-table-header-checkbox>
          </th>
          <th style="width: 1rem">

          </th>
          <th style="width: 5rem">
            Full Name
          </th>
          <th style="width: 5rem">Email</th>
          <th style="width: 5rem">Last Updated</th>
          <th style="width: 10rem">Status</th>
        </tr>
      </ng-template>

      <ng-template mdTemplateName="body" let-row let-rowIndex="rowIndex">
        <tr [mdSelectRow]="row">

          <td>
            <md-data-table-checkbox [data]="row"></md-data-table-checkbox>
          </td>
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

    <div class="medium-4 columns">
      <ul>
        <li *ngFor="let person of selectedPeople" style="text-align: left">
          {{person.name}} - {{person.email}} -  {{person.updated}} - {{person.status}}
        </li>
      </ul>
    </div>
  `,
  styles: []
})
export class DataTableMultiDropdownComponent {

  status;
  selectedPeople;

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
}
