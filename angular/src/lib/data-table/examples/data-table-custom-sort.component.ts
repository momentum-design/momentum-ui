import { Component } from '@angular/core';
const moment = require('moment');
@Component({
  selector: 'example-data-table-custom-sort',
  template: `

  <md-data-table
    [columns]="columns"
    [data]="people"
    [containerStyle]="{'width': '80%'}"
    [customSort]="true"
    (sortBy)="mySort($event)"
  >
    <ng-template mdTemplateName="header" let-columns>
      <tr>
        <th *ngFor="let column of columns" [mdSortColumn]="column.field">
          {{column.header}}
          <md-sortIcon [field]="column.field"></md-sortIcon>
        </th>
      </tr>
    </ng-template>

    <ng-template mdTemplateName="body" let-row let-columns="columns">
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
export class DataTableCustomSortComponent {

  columns = [
    { header: 'Name', field: 'name' },
    { header: 'Age', field: 'age' },
    { header: 'Custom Date Sort', field: 'date' },
    { header: 'Custom Quarter Sort', field: 'quarter' }
  ];

  people = [
    {'name': 'John', 'age': 32, 'date': '01-08-2011', 'quarter': 'Q1-2016'},
    {'name': 'Paul', 'age': 12, 'date': '04-07-2022', 'quarter': '2000'},
    {'name': 'Ben', 'age': 23, 'date': '04-02-2019', 'quarter': '2017'},
    {'name': 'Dan', 'age': 75, 'date': '06-01-2015', 'quarter': '2018' },
    {'name': 'Mike', 'age': 45, 'date': '07-05-2015', 'quarter': 'Q2-2012'},
    {'name': 'Joe', 'age': 86, 'date': '09-06-2016', 'quarter': 'Q3-2017'},
    {'name': 'Robert', 'age': 34, 'date': '05-12-2017', 'quarter': 'Q3-2018'}
  ];


  mySort(event) {
    console.info('sort event: ', event);

    // custom sort on date column
    if (event.field === 'date') {
      const dateSorter = function (a, b): number {
        const momentA = moment(a.date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        const momentB = moment(b.date, 'MM-DD-YYYY').format('YYYY-MM-DD');

        let result: number = -1;

        if (moment(momentB).isBefore(momentA, 'day')) {
          result = 1;
        }
        return result * event.order;
      };

      this.people.sort(dateSorter);

    } else {

      // default
      event.data.sort((data1, data2) => {
        const val1 = data1[event.field];
        const val2 = data2[event.field];
        let result = null;

        if (val1 == null && val2 != null) {
            result = -1;
        } else if (val1 != null && val2 == null) {
            result = 1;
        } else if (val1 == null && val2 == null) {
            result = 0;
        } else if (typeof val1 === 'string' && typeof val2 === 'string') {
          // custom sort on quarter column
          if (event.field === 'quarter') {
            const order1 = val1.split('-');
            const order2 = val2.split('-');
            const val1Q = order1.length === 2 ? order1[0] : '';
            const val1Y = order1.length === 2 ? order1[1] :  order1[0];
            const val2Q = order2.length === 2 ? order2[0] : '';
            const val2Y = order2.length === 2 ? order2[1] :  order2[0];

            if (val1Y.localeCompare(val2Y) === 0) {
              result = val1Q.localeCompare(val2Q);
            } else {
              result = val1Y.localeCompare(val2Y);
            }

          // default else
          } else {
            result = val1.localeCompare(val2);
          }
        } else {
          result = (val1 < val2) ? -1 : (val1 > val2) ? 1 : 0;
        }
        return (event.order * result);
      });
    }
  }
}
