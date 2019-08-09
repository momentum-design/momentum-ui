<template>
  <div class="medium-4 columns">
    <md-list @select="selectHandler">
      <md-list-item label="One" />
      <md-list-item label="Two" />
      <md-list-item label="Three" />
      <md-list-item label="Four" />
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'ExampleListDefault',

  methods: {
    selectHandler(e, opts) {},
  },
};
</script>

