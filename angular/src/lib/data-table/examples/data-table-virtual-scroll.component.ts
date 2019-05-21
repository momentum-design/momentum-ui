import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-data-table-virtual-scroll',
  template: `

    <md-data-table
      [columns]="columns"
      [data]="virtualPeople"
      [scrollable]="true"
      scrollHeight="250px"
      [visibleRows]="30"
      [virtualScroll]="true"
      (lazyLoad)="onScrollLoadData($event)"
      [lazy]="true"
      [dataCount]="dataCount"
      [containerStyle]="{'width': '60%'}"
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
  dataCount;
  bigData;
  virtualPeople;
  loading: boolean;

  ngOnInit() {

    this.columns = [
      { header: 'Index', field: 'index' },
      { header: 'State', field: 'state' },
      { header: 'Age', field: 'age' },
      { header: 'Color', field: 'color' }
    ];

    this.dataCount = 5000;
    this.loading = true;

    this.bigData = [
      {'state': 'Texas', 'age': 32, 'color': 'Orange'},
      {'state': 'California', 'age': 12, 'color': 'Black'},
      {'state': 'Florida', 'age': 23, 'color': 'Gray'},
      {'state': 'Texas', 'age': 36, 'color': 'Black'},
      {'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
      {'state': 'Arizona', 'age': 29, 'color': 'Orange'},
      {'state': 'Texas', 'age': 32, 'color': 'Black'},
      {'state': 'Montana', 'age': 27, 'color': 'Red'},
      {'state': 'Texas', 'age': 32, 'color': 'Orange'},
      {'state': 'California', 'age': 12, 'color': 'Black'},
      {'state': 'Florida', 'age': 23, 'color': 'Gray'},
      {'state': 'Texas', 'age': 46, 'color': 'Black'},
      {'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
      {'state': 'Arizona', 'age': 29, 'color': 'Orange'},
      {'state': 'Florida', 'age': 23, 'color': 'Gray'},
      {'state': 'Kansas', 'age': 95, 'color': 'Blue' },
      {'state': 'New York', 'age': 45, 'color': 'Orange'},
      {'state': 'Texas', 'age': 26, 'color': 'Black'},
      {'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
      {'state': 'Arizona', 'age': 29, 'color': 'Orange'},
      {'state': 'Texas', 'age': 32, 'color': 'Black'},
      {'state': 'Montana', 'age': 27, 'color': 'Red'},
      {'state': 'Texas', 'age': 32, 'color': 'Orange'},
      {'state': 'California', 'age': 12, 'color': 'Black'},
      {'state': 'New York', 'age': 45, 'color': 'Orange'},
      {'state': 'Texas', 'age': 86, 'color': 'Black'},
      {'state': 'Texas', 'age': 26, 'color': 'Black'},
      {'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
      {'state': 'Arizona', 'age': 29, 'color': 'Orange'},
      {'state': 'Texas', 'age': 32, 'color': 'Black'},
      {'state': 'Montana', 'age': 27, 'color': 'Red'},
      {'state': 'Texas', 'age': 32, 'color': 'Orange'},
      {'state': 'California', 'age': 12, 'color': 'Black'},
      {'state': 'New York', 'age': 45, 'color': 'Orange'},
      {'state': 'Texas', 'age': 86, 'color': 'Black'},
      {'state': 'Texas', 'age': 26, 'color': 'Black'},
      {'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
      {'state': 'Arizona', 'age': 29, 'color': 'Orange'},
      {'state': 'Texas', 'age': 32, 'color': 'Black'},
      {'state': 'Montana', 'age': 27, 'color': 'Red'},
      {'state': 'Texas', 'age': 32, 'color': 'Orange'},
      {'state': 'California', 'age': 12, 'color': 'Black'},
      {'state': 'New York', 'age': 45, 'color': 'Orange'},
      {'state': 'Texas', 'age': 86, 'color': 'Black'},
      {'state': 'Texas', 'age': 26, 'color': 'Black'},
      {'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
      {'state': 'Arizona', 'age': 29, 'color': 'Orange'},
      {'state': 'Texas', 'age': 32, 'color': 'Black'},
      {'state': 'Montana', 'age': 27, 'color': 'Red'}
    ];
  }

  onScrollLoadData(event) {
    this.loading = true;

      setTimeout(() => {

        if (event.first === 4980) {
          this.virtualPeople = this.sectionLoad(event.first, 20); // if its the last 20 rows left just load 20
        } else {
          this.virtualPeople = this.sectionLoad(event.first, event.visibleRows); // only load the people in that section
        }

        this.loading = false;
      }, 250);
  }

  // return that specific section of data at row index
  sectionLoad(index, rows) {
    const section = [];
    for (let i = 0; i < rows; i++) {
      section[i] = {...this.bigData[i], ...{index: (index + i)}};
    }

    return section;
  }
}

