<template>
  <md-data-table
    :columns="columns"
    :data="people"
    :customSort="true"
    @sortBy="mySort"
  >
    <template v-slot:header="slotProps">
      <tr>
        <th v-for="(column, index) in slotProps.columns" :key="index" v-mdSortColumn="{dataTable: slotProps.dataTable, field: column.field}">
          {{ column.header }}
          <md-data-table-sort-icon :field="column.field" />
        </th>
      </tr>
    </template>

    <template v-slot:body="slotProps">
      <tr :key="slotProps.index">
        <td v-for="(column, index) in slotProps.columns" :key="index">
          {{ slotProps.row[column.field] }}
        </td>
      </tr>
    </template>

  </md-data-table>
</template>

<script>
import DataTable from '../index';
import moment from 'moment';
export default {
  name: 'ExampleDataTableCustomSort',

  data() {
    return {
      columns: [
        { header: 'Name', field: 'name' },
        { header: 'Age', field: 'age' },
        { header: 'Custom Date Sort', field: 'date' },
        { header: 'Custom Quarter Sort', field: 'quarter' }
      ],
      people: [
        {'name': 'John', 'age': 32, 'date': '01-08-2011', 'quarter': 'Q1-2016'},
        {'name': 'Paul', 'age': 12, 'date': '04-07-2022', 'quarter': '2000'},
        {'name': 'Ben', 'age': 23, 'date': '04-02-2019', 'quarter': '2017'},
        {'name': 'Dan', 'age': 75, 'date': '06-01-2015', 'quarter': '2018' },
        {'name': 'Mike', 'age': 45, 'date': '07-05-2015', 'quarter': 'Q2-2012'},
        {'name': 'Joe', 'age': 86, 'date': '09-06-2016', 'quarter': 'Q3-2017'},
        {'name': 'Robert', 'age': 34, 'date': '05-12-2017', 'quarter': 'Q3-2018'}
      ],
    }
  },

  directives: {
    mdSortColumn: DataTable.directives.mdSortColumn
  },

  methods: {
    mySort(event) {
      console.info('sort event: ', event);

      // custom sort on date column
      if (event.field === 'date') {
        const dateSorter = function (a, b) {
          const momentA = moment(a.date, 'MM-DD-YYYY').format('YYYY-MM-DD');
          const momentB = moment(b.date, 'MM-DD-YYYY').format('YYYY-MM-DD');

          let result = -1;

          if (moment(momentB).isBefore(momentA, 'day')) {
            result = 1;
          }
          return result * event.order;
        };

        this.people.sort(dateSorter);

      } else {

        // default
        this.people.sort((data1, data2) => {
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
  },
};
</script>
