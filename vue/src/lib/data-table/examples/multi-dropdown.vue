<template>
  <div>
    <md-data-table
      :columns="columns"
      :data="people"
      :selection="selectedPeople"
      dataKey="name"
      :columnDividers="true"
      @selectionChange="handleSelectionChange"
    >
      <template v-slot:header="slotProps">
        <tr>
          <th style="width: 1rem">
            <md-data-table-header-checkbox></md-data-table-header-checkbox>
          </th>
          <th style="width: 1rem"></th>
          <th v-for="(column, index) in slotProps.columns" :key="index" style="width: 6rem" >
            {{ column.header }}
          </th>
        </tr>
      </template>

      <template v-slot:body="slotProps">
        <tr :key="slotProps.index">
          <td>
            <md-data-table-checkbox :data="slotProps.row"></md-data-table-checkbox>
          </td>
          <td>
            <md-avatar :title="slotProps.row['avatar']"></md-avatar>
          </td>
          <td>
            {{ slotProps.row['name'] }}
          </td>
          <td>
            {{ slotProps.row['email'] }}
          </td>
          <td>
            {{ slotProps.row['updated'] }}  {{ slotProps.index }}
          </td>
          <td>
            <md-select
              :tableRowIndex="slotProps.index"
              :defaultValue="slotProps.row.status"
              @select="onChange"
              >
                <md-select-option value="Active" label="Active" />
                <md-select-option value="Pending" label="Pending" />
                <md-select-option value="Trial" label="Trial" />
            </md-select>
          </td>
        </tr>
      </template>

    </md-data-table>
    <div class="medium-4 columns">
      <ul>
        <li v-for="(person, index) in selectedPeople" :key="index" style="text-align: left">
          {{person.name}} - {{person.email}} -  {{person.updated}} - {{person.status}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleDataTableMultiDropdown',

  data() {
    return {
      columns: [
        { header: 'Full Name', field: 'name' },
        { header: 'Email', field: 'email' },
        { header: 'Last Updated', field: 'updated' },
        { header: 'Status', field: 'status' }
      ],
      people: [
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
      ],
      selectedPeople: [],
    }
  },

  methods: {
    onChange(e) {
        console.info('select change: ', e);
    },

    handleSelectionChange(selection) {
      this.selectedPeople = selection;
    }
  },

};
</script>
