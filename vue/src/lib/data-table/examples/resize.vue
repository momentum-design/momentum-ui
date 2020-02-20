<template>
  <md-data-table
    :columns="columns"
    :data="people"
    :resizableColumns="true"
    :columnDividers="true"
  >
    <template v-slot:header="slotProps">
      <tr>
        <th v-for="(column, index) in slotProps.columns" :key="index" v-mdResizeColumn="{dataTable: slotProps.dataTable}">
          {{ column.header }}
        </th>
      </tr>
    </template>

  </md-data-table>
</template>

<script>
import DataTable from '../index';

export default {
  name: 'ExampleDataTableResize',

  data() {
    return {
      columns: [
        { header: 'Name', field: 'name' },
        { header: 'State', field: 'state' },
        { header: 'Age', field: 'age' },
        { header: 'Color', field: 'color' }
      ],
      people: [
        {'name': 'John', 'state': 'Texas', 'age': 32, 'color': 'Orange'},
        {'name': 'Paul', 'state': 'California', 'age': 12, 'color': 'Black'},
        {'name': 'Ben', 'state': 'Florida', 'age': 23, 'color': 'Gray'},
        {'name': 'Lauren', 'state': 'Kansas', 'age': 75, 'color': 'Blue' },
        {'name': 'Mike', 'state': 'New York', 'age': 45, 'color': 'Orange'},
        {'name': 'Joe', 'state': 'Texas', 'age': 86, 'color': 'Black'},
        {'name': 'Robert', 'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
        {'name': 'Greg', 'state': 'Arizona', 'age': 29, 'color': 'Orange'},
        {'name': 'Sarah', 'state': 'Texas', 'age': 32, 'color': 'Black'},
        {'name': 'Derek', 'state': 'Montana', 'age': 27, 'color': 'Red'},
        {'name': 'Joe', 'state': 'Texas', 'age': 86, 'color': 'Black'},
        {'name': 'Michelle', 'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
        {'name': 'Greg', 'state': 'Arizona', 'age': 29, 'color': 'Orange'},
        {'name': 'Thomas', 'state': 'Texas', 'age': 32, 'color': 'Black'}
      ],
    }
  },

  directives: {
    mdResizeColumn: DataTable.directives.mdResizeColumn
  },
};
</script>
