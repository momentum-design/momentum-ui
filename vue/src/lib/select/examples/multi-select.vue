<template>
  <md-select isMulti defaultValue="Select Item Here" @select="handleSelect">
    <md-select-option value="test1" label="test1" id="1" />
    <md-select-option value="test2" label="test2" id="2" />
    <md-select-option value="test3" label="test3" id="3" />
    <md-select-option value="test4" label="test4" id="4" />
  </md-select>
</template>

<script>
export default {
  name: 'ExampleSelectMultiSelect',

  methods: {
    handleSelect(selected) {}
  },
};
</script>
