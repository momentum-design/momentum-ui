<template>
  <div class="md-data-table__checkbox--wrapper">
    <md-checkbox
      :checked="checked"
      :disabled="disabled"
      label=""
      :htmlId="htmlId"
      @change="handleChange">
    </md-checkbox>
  </div>
</template>

<script>
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'md-data-table-header-checkbox',

  data() {
    return {
      checked: false,
      htmlId: this.id || uniqueId('md-data-table-checkbox-'),
    }
  },

  inject: ['eventBus', 'dataTable'],

  props: {
    disabled: Boolean,
    id: String,
  },

  created() {
    this.eventBus.$on('selectionChange', this.updateCheckedState);
  },

  beforeDestroy() {
    this.eventBus.$off('selectionChange');
  },

  mounted() {
    this.updateCheckedState();
  },

  methods: {
    handleChange(event) {
      if (!this.disabled) {
        if (this.dataTable.data && this.dataTable.data.length > 0) {
          this.dataTable.toggleRowsWithCheckbox(event, !this.checked);
        }
      }
    },

    updateCheckedState() {
      this.checked = 
        this.dataTable.data && this.dataTable.data.length > 0
        && this.dataTable.dSelection && this.dataTable.dSelection.length > 0
        && this.dataTable.dSelection.length === this.dataTable.data.length;
    },

  },
};
</script>
