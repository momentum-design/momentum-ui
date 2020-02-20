<template>
  <md-data-table
    :columns="columns"
    :data="virtualPeople"
    :scrollable="true"
    :virtualScroll="true"
    :lazy="true"
    scrollHeight="400px"
    :containerStyle="{'width': '80%'}"
    @lazyLoad="virtualLoad"
  ></md-data-table>
</template>

<script>
export default {
  name: 'ExampleDataTableVirtualScroll',

  data() {
    return {
      columns: [
        { header: 'Id', field: 'id' },
        { header: 'Age', field: 'age' },
        { header: 'Color', field: 'color' }
      ],
      virtualPeople: [
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
      ],
    }
  },

  methods: {
    getPople() {
      return [
        {'id': Math.random().toString(36).slice(2), 'age': 32, 'color': 'Orange'},
        {'id': Math.random().toString(36).slice(2), 'age': 12, 'color': 'Black'},
        {'id': Math.random().toString(36).slice(2), 'age': 23, 'color': 'Gray'},
        {'id': Math.random().toString(36).slice(2), 'age': 36, 'color': 'Black'},
        {'id': Math.random().toString(36).slice(2), 'age': 34, 'color': 'Yellow'},
        {'id': Math.random().toString(36).slice(2), 'age': 29, 'color': 'Orange'},
        {'id': Math.random().toString(36).slice(2), 'age': 32, 'color': 'Black'},
        {'id': Math.random().toString(36).slice(2), 'age': 27, 'color': 'Red'},
        {'id': Math.random().toString(36).slice(2), 'age': 32, 'color': 'Orange'},
        {'id': Math.random().toString(36).slice(2), 'age': 12, 'color': 'Black'}
      ];
    },

    virtualLoad(event) {
      // loads at end of scroll
      this.virtualPeople = this.virtualPeople.concat(this.getPople());
    }
  },
};
</script>
