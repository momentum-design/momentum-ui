<template>
  <div>
    <md-combo-box :options="['a', 'ab', 'abc']" ></md-combo-box>
    <md-combo-box>
      <md-list-item label="a" :disabled="true" />
      <md-list-item label="ab" />
      <md-list-item label="abc" />
    </md-combo-box>
  </div>
</template>

<script>
export default {
  name: 'ExampleComboBoxDefault',
};
</script>

