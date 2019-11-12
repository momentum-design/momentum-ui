import { Component } from '@angular/core';

@Component({
  selector: 'example-data-table-zebra',
  template: `

    <md-data-table
      [columns]="columns"
      [data]="people"
      containerClass="testContainerClass"
      tableClass="testTableClass"
      [containerStyle]="{'width': '60%'}"
      theme="zebra"
    >

      <ng-template mdTemplateName="header" let-columns>
        <tr>
          <th style="width: 8rem">Full Name</th>
          <th style="width: 10rem">Email</th>
          <th style="width: 6rem">Last Updated</th>
          <th style="width: 5rem">ID Number</th>
        </tr>
      </ng-template>

      <ng-template mdTemplateName="body" let-row let-columns="columns" let-rowIndex="rowIndex">
        <tr>
          <td *ngFor="let column of columns">
            {{row[column.field]}}
          </td>
        </tr>
      </ng-template>

    </md-data-table>
  `,
  styles: []
})
export class DataTableZebraComponent {

  columns = [
    { header: 'Full Name', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Last Updated', field: 'updated' },
    { header: 'ID Number', field: 'id' }
  ];

  people = [
    {'name': 'John Jones', 'email': 'jjones@cisco.com', 'updated': '02-July-2019', 'id': 1547852158},
    {'name': 'Paul Baltes', 'email': 'pbaltes@cisco.com', 'updated': '03-June-2019', 'id': 4673165849},
    {'name': 'Caleb Valdez', 'email': 'cvaldez@cisco.com', 'updated': '07-May-2019', 'id': 9432165975},
    {'name': 'Corelia Ball', 'email': 'cball@cisco.com', 'updated': '04-July-2019', 'id': 8561346581 },
    {'name': 'Mike Snow', 'email': 'msnow@cisco.com', 'updated': '05-April-2019', 'id': 1245731648},
    {'name': 'Joe Johnson', 'email': 'jjohnson@cisco.com', 'updated': '05-July-2019', 'id': 3674162849},
    {'name': 'Robert McGregor', 'email': 'rmcgregor@cisco.com', 'updated': '01-July-2019', 'id': 8412596312},
    {'name': 'Greg Dmritov', 'email': 'gdmritov@cisco.com', 'updated': '05-March-2019', 'id': 1245731648},
    {'name': 'Thomas Campbell', 'email': 'tcampbell@cisco.com', 'updated': '07-July-2019', 'id': 6777658497},
    {'name': 'Derek Nelson', 'email': 'dnelson@cisco.com', 'updated': '07-June-2019', 'id': 9432548164}
  ];
}
