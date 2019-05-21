import { Component } from '@angular/core';

@Component({
  selector: 'example-data-table-multi-select',
  template: `

    <md-data-table
      [columns]="columns"
      [data]="people"
      [(selection)]="selectedPeople"
      dataKey="name"
      [containerStyle]="{'width': '60%'}"
    >

      <ng-template mdTemplateName="header" let-columns>
        <tr>
          <th style="width: 4rem">
            <md-data-table-header-checkbox></md-data-table-header-checkbox>
          </th>

          <th *ngFor="let column of columns">
            {{column.header}}
          </th>
        </tr>
      </ng-template>

      <ng-template mdTemplateName="body" let-row let-columns="columns">
        <tr>

          <td>
            <md-data-table-checkbox [data]="row"></md-data-table-checkbox>
          </td>

          <td *ngFor="let column of columns">
            {{row[column.field]}}
          </td>
        </tr>
      </ng-template>

    </md-data-table>

    <ul>
      <li *ngFor="let person of selectedPeople" style="text-align: left">
        {{person.name}} from {{person.state}} is {{person.age}}
      </li>
    </ul>
  `,
  styles: []
})
export class DataTableMultiSelectComponent {

  // dataKey value should be unique ideally and used on md-data-table, if not provided, will use findIndex to find row

  columns = [
    { header: 'Name', field: 'name' },
    { header: 'State', field: 'state' },
    { header: 'Age', field: 'age' },
    { header: 'Color', field: 'color' }
  ];

  people = [
    {'name': 'John', 'state': 'Texas', 'age': 32, 'color': 'Orange'},
    {'name': 'Paul', 'state': 'California', 'age': 12, 'color': 'Black'},
    {'name': 'Ben', 'state': 'Florida', 'age': 23, 'color': 'Gray'},
    {'name': 'Dan', 'state': 'Kansas', 'age': 75, 'color': 'Blue' },
    {'name': 'Mike', 'state': 'New York', 'age': 45, 'color': 'Orange'},
    {'name': 'Joe', 'state': 'Texas', 'age': 86, 'color': 'Black'},
    {'name': 'Robert', 'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
    {'name': 'Greg', 'state': 'Arizona', 'age': 29, 'color': 'Orange'},
    {'name': 'Thomas', 'state': 'Texas', 'age': 32, 'color': 'Black'},
    {'name': 'Derek', 'state': 'Montana', 'age': 27, 'color': 'Red'}
  ];

  selectedPeople: [];

}


