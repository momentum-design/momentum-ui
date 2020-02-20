<template>
  <div class="md-data-table__checkbox--wrapper">
    <md-checkbox
      :checked="checked"
      :disabled="disabled"
      label=""
      :htmlId="htmlId"
      @change="handleChange"
      >
    </md-checkbox>
  </div>
</template>

<script>
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'md-data-table-checkbox',

  data() {
    return {
      checked: false,
      htmlId: this.id || uniqueId('md-data-table-checkbox-'),
    }
  },

  inject: ['eventBus', 'dataTable'],

  props: {
    data: Object,
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
        this.dataTable.toggleRowWithCheckbox({
            originalEvent: event,
        }, this.data);
      }
    },

    updateCheckedState() {
      this.checked = this.dataTable.isSelected(this.data);
    },

  },
};
</script>
