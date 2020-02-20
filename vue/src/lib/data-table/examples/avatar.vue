<template>
  <md-data-table
    :columns="columns"
    :data="people"
    :containerStyle="{'width': '60%'}"
  >
    <template v-slot:header="slotProps">
      <tr>
        <th style="width: 4rem"></th>
        <th v-for="(column, index) in slotProps.columns" :key="index">
          {{ column.header }}
        </th>
      </tr>
    </template>

    <template v-slot:body="slotProps">
      <tr :key="slotProps.index">
        <td>
          <md-avatar :title="slotProps.row['avatar']"></md-avatar>
        </td>
        <td v-for="(column, index) in slotProps.columns" :key="index">
          {{ slotProps.row[column.field] }}
        </td>
      </tr>
    </template>

  </md-data-table>
</template>

<script>
export default {
  name: 'ExampleDataTableAvatar',

  data() {
    return {
      columns: [
        { header: 'Full Name', field: 'name' },
        { header: 'Email', field: 'email' },
        { header: 'Last Updated', field: 'updated' },
        { header: 'ID Number', field: 'id' }
      ],
      people: [
        {'avatar': 'John Jones', 'name': 'John Jones', 'email': 'jjones@cisco.com', 'updated': '02-July-2019', 'id': 1547852158},
        {'avatar': 'Paul Baltes', 'name': 'Paul Baltes', 'email': 'pbaltes@cisco.com', 'updated': '03-June-2019', 'id': 4673165849},
        {'avatar': 'Caleb Valdez', 'name': 'Caleb Valdez', 'email': 'cvaldez@cisco.com', 'updated': '07-May-2019', 'id': 9432165975},
        {'avatar': 'Corelia Ball', 'name': 'Corelia Ball', 'email': 'cball@cisco.com', 'updated': '04-July-2019', 'id': 8561346581 },
        {'avatar': 'Mike Snow', 'name': 'Mike Snow', 'email': 'msnow@cisco.com', 'updated': '05-April-2019', 'id': 1245731648},
        {'avatar': 'Joe Johnson', 'name': 'Joe Johnson', 'email': 'jjohnson@cisco.com', 'updated': '05-July-2019', 'id': 3674162849},
        {'avatar': 'Robert McGregor', 'name': 'Robert McGregor', 'email': 'rmcgregor@cisco.com', 'updated': '01-July-2019', 'id': 8412596312},
        {'avatar': 'Greg Dmritov', 'name': 'Greg Dmritov', 'email': 'gdmritov@cisco.com', 'updated': '05-March-2019', 'id': 1245731648},
        {'avatar': 'Thomas Campbell', 'name': 'Thomas Campbell', 'email': 'tcampbell@cisco.com', 'updated': '07-July-2019', 'id': 6777658497},
        {'avatar': 'Derek Nelson', 'name': 'Derek Nelson', 'email': 'dnelson@cisco.com', 'updated': '07-June-2019', 'id': 9432548164}
      ],
    }
  },
};
</script>
