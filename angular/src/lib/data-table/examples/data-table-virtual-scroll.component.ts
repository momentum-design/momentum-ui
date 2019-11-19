import { Component, OnInit } from '@angular/core';
import { PeopleService } from './data-table-example-service';

@Component({
  selector: 'example-data-table-virtual-scroll',
  template: `

    <md-data-table
      [columns]="columns"
      [data]="virtualPeople"
      [scrollable]="true"
      scrollHeight="400px"
      [virtualScroll]="true"
      (lazyLoad)="virtualLoad($event)"
      [lazy]="true"
      [containerStyle]="{'width': '80%'}"
    >

      <ng-template mdTemplateName="header" let-columns>
        <tr>
          <th *ngFor="let column of columns">
            {{column.header}}
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
export class DataTableVirtualScrollComponent implements OnInit {

  columns;
  virtualPeople: Array<object>;
  newArr = [];

  sampleData = [
    {'id': '1', 'age': 32, 'color': 'Orange'},
    {'id': '2', 'age': 12, 'color': 'Black'},
    {'id': '3', 'age': 23, 'color': 'Gray'},
    {'id': '4', 'age': 36, 'color': 'Black'},
    {'id': '5', 'age': 34, 'color': 'Yellow'},
    {'id': '6', 'age': 29, 'color': 'Orange'},
    {'id': '7', 'age': 32, 'color': 'Black'},
    {'id': '8', 'age': 27, 'color': 'Red'},
    {'id': '9', 'age': 32, 'color': 'Orange'},
    {'id': '10', 'age': 12, 'color': 'Black'},
    {'id': '11', 'age': 23, 'color': 'Gray'},
    {'id': '12', 'age': 46, 'color': 'Black'},
    {'id': '13', 'age': 34, 'color': 'Yellow'},
    {'id': '14', 'age': 29, 'color': 'Orange'},
    {'id': '15', 'age': 23, 'color': 'Gray'},
    {'id': '16', 'age': 95, 'color': 'Blue' },
    {'id': '17', 'age': 32, 'color': 'Black'},
    {'id': '18', 'age': 27, 'color': 'Red'},
    {'id': '19', 'age': 32, 'color': 'Orange'},
    {'id': '20', 'age': 12, 'color': 'Black'},
  ];

  constructor(
    private peopleService: PeopleService
  ) {}

  ngOnInit() {
    this.columns = [
      { header: 'Id', field: 'id' },
      { header: 'Age', field: 'age' },
      { header: 'Color', field: 'color' }
    ];

    this.virtualPeople = this.sampleData.slice(0, 20);
  }

  virtualLoad(event) {

    // loads at end of scroll

    this.peopleService.get().subscribe( res => {
      this.newArr = res;
    });

    for (let i = 0; i < this.newArr.length; i++) {
      this.virtualPeople.push(this.newArr[i]);
    }
  }
}
