<template>
  <md-list @select="selectHandler">
    <md-list-item label="One" />
    <md-list-item label="Two" />
    <md-list-item label="Three" />
    <md-list-item label="Four" />
  </md-list>
</template>

<script>
export default {
  name: 'ExampleListItemDefault',
};
</script>
