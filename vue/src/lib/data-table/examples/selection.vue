<template>
  <fragment>
  <md-data-table
    :columns="columns"
    :data="people"
    :rowSelection="true"
    :selection="selectedPerson"
    :columnDividers="true"
    :containerStyle="{'width': '60%'}"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
  ></md-data-table>
  <div v-if="selectedPerson">
    Selected Row:
    {{selectedPerson.name}} - {{selectedPerson.email}} - {{selectedPerson.updated}} - {{selectedPerson.id}}
  </div>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  name: 'ExampleDataTableSelection',

  data() {
    return {
      columns: [
        { header: 'Full Name', field: 'name' },
        { header: 'Email', field: 'email' },
        { header: 'Last Updated', field: 'updated' },
        { header: 'ID Number', field: 'id' }
      ],
      people: [
        {'name': 'John Jones', 'email': 'jjones@cisco.com', 'updated': '02-July-2019', 'id': 1547852158},
        {'name': 'Paul Baltes', 'email': 'pbaltes@cisco.com', 'updated': '03-June-2019', 'id': 4673165849},
        {'name': 'Caleb Valdez', 'email': 'cvaldez@cisco.com', 'updated': '07-May-2019', 'id': 9432165975},
        {'name': 'Corelia Ball', 'email': 'cball@cisco.com', 'updated': '04-July-2019', 'id': 8561346581 },
        {'name': 'Mike Snow', 'email': 'msnow@cisco.com', 'updated': '05-April-2019', 'id': 1245731648},
        {'name': 'Joe Johnson', 'email': 'jjohnson@cisco.com', 'updated': '05-July-2019', 'id': 3674162849},
        {'name': 'Robert McGregor', 'email': 'rmcgregor@cisco.com', 'updated': '01-July-2019', 'id': 8412596312},
        {'name': 'Greg Dmritov', 'email': 'gdmritov@cisco.com', 'updated': '05-March-2019', 'id': 1245731648},
        {'name': 'Thomas Campbell', 'email': 'tcampbell@cisco.com', 'updated': '07-July-2019', 'id': 6777658497},
        {'name': 'Derek Nelson', 'email': 'dnelson@cisco.com', 'updated': '07-June-2019', 'id': 9432548164}
      ],
      selectedPerson: null,
    }
  },

  components: { Fragment },

  methods: {
    onRowSelect(e) {
        console.info('row select emitter : ', e);
        this.selectedPerson = e.data;
    },
    onRowUnselect(e) {
        console.info('unselected: ', e);
        this.selectedPerson = null;
    },
  },
};
</script>
