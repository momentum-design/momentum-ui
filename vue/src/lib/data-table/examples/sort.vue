<template>
  <md-data-table
    :columns="columns"
    :data="people"
    :sortable="true"
  ></md-data-table>
</template>

<script>
export default {
  name: 'ExampleDataTableSort',

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
};
</script>
