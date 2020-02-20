<template>
  <div class="medium-8 columns">
    <md-data-table
      :columns="columns"
      :data="people"
      :resizableColumns="true"
      :scrollable="true"
      scrollHeight="200px"
      :selection="selectedPeople"
      dataKey="name"
      @selectionChange="handleSelectionChange"
    >
      <template v-slot:colgroup="slotProps">
        <colgroup>
          <col style="width: 4rem">
          <col v-for="(column, index) in slotProps.columns" :key="index" />
        </colgroup>
      </template>

      <template v-slot:header="slotProps">
        <tr>
          <th style="width: 4rem">
            <md-data-table-header-checkbox></md-data-table-header-checkbox>
          </th>
          <th v-for="(column, index) in slotProps.columns" :key="index" >
            {{ column.header }}
          </th>
        </tr>
      </template>

      <template v-slot:body="slotProps">
        <tr :key="slotProps.index">
          <td>
            <md-data-table-checkbox :data="slotProps.row"></md-data-table-checkbox>
          </td>
          <td v-for="(column, index) in slotProps.columns" :key="index">
            {{ slotProps.row[column.field] }}
          </td>
        </tr>
      </template>
    </md-data-table>
    <div class="medium-4 columns">
      <ul>
        <li v-for="(person, index) in selectedPeople" :key="index" style="text-align: left">
          {{person.name}} - {{person.state}} -  {{person.age}} - {{person.color}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleDataTableMultiSelectResizeScroll',

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
        {'name': 'Dan', 'state': 'Kansas', 'age': 75, 'color': 'Blue' },
        {'name': 'Mike', 'state': 'New York', 'age': 45, 'color': 'Orange'},
        {'name': 'Joe', 'state': 'Texas', 'age': 86, 'color': 'Black'},
        {'name': 'Robert', 'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
        {'name': 'Greg', 'state': 'Arizona', 'age': 29, 'color': 'Orange'},
        {'name': 'Thomas', 'state': 'Texas', 'age': 32, 'color': 'Black'},
        {'name': 'Derek', 'state': 'Montana', 'age': 27, 'color': 'Red'},
        {'name': 'Robert', 'state': 'New Mexico', 'age': 34, 'color': 'Yellow'},
        {'name': 'Sarah', 'state': 'Arizona', 'age': 29, 'color': 'Orange'},
        {'name': 'Michelle', 'state': 'Montana', 'age': 24, 'color': 'Red'},
        {'name': 'Jennifer', 'state': 'New Mexico', 'age': 34, 'color': 'Purple'},
        {'name': 'Alex', 'state': 'Arizona', 'age': 29, 'color': 'Orange'},
        {'name': 'Lizzy', 'state': 'Texas', 'age': 22, 'color': 'Black'},
        {'name': 'Olivia', 'state': 'Montana', 'age': 27, 'color': 'Red'},
      ],
      selectedPeople: [
        {'name': 'Mike', 'state': 'New York', 'age': 45, 'color': 'Orange'},
        {'name': 'Joe', 'state': 'Texas', 'age': 86, 'color': 'Black'},
        {'name': 'Thomas', 'state': 'Texas', 'age': 32, 'color': 'Black'}
      ],
    }
  },

  methods: {
    handleSelectionChange(selection) {
      this.selectedPeople = selection;
    }
  },
};
</script>
