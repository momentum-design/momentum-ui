import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from '../data-table.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataTableModule } from '../data-table.module';

describe('DataTableComponent', () => {
  let component: TestAppComponent;
  let fixture: ComponentFixture<TestAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line: no-use-before-declare
      declarations: [ TestAppComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [DataTableModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // tslint:disable-next-line: no-use-before-declare
    fixture = TestBed.createComponent(TestAppComponent);
    component = fixture.componentInstance;
  });

  it('should create a data table', () => {

    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const table = inputNativeElement.querySelector('.md-data-table');

    expect(table.className).toContain('md-data-table');
  });


  it('should create a data table header', () => {

    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const table = inputNativeElement.querySelector('.md-data-table__thead');

    expect(table.className).toContain('md-data-table__thead');
  });


  it('should create a data table body', () => {

    fixture.detectChanges();

    const inputNativeElement = fixture.nativeElement;
    const table = inputNativeElement.querySelector('.md-data-table__tbody');

    expect(table.className).toContain('md-data-table__tbody');
  });

});


@Component({
  selector: 'test-app',
  template: `

<md-data-table [columns]="columns" [data]="people">
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
})
export class TestAppComponent {
  disabled = false;
  htmlId = '';
  indeterminate = false;
  label = '';
  name = 'TDG';
  nestedLevel = 1;
  required = false;
  value = '';

  columns = [
    { header: 'Name', field: 'name' },
    { header: 'State', field: 'state' },
    { header: 'Age', field: 'age' },
  ];

  people = [
    {'name': 'John', 'state': 'Texas', 'age': 32, 'color': 'Orange'},
    {'name': 'Paul', 'state': 'California', 'age': 12, 'color': 'Black'},
    {'name': 'Ben', 'state': 'Florida', 'age': 23, 'color': 'Gray'},
  ];
}
