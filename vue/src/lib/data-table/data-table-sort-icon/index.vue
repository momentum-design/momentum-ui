<template>
  <i class="md-icon icon md-sortIcon"
  :class="sorted === 1 ? 'icon-arrow-filled-down_12' : 'icon-arrow-filled-up_12'"></i>
</template>

<script>
export default {
  name: 'md-data-table-sort-icon',

  data() {
    return {
      data: this.dataTable.data,
      sorted: null,
    }
  },

  inject: {
    dataTable: {
      default: {}
    },
  },

  props: {
    /** @prop field being sorted on */
    field: String,
  },

  watch: {
    data(val) {
      this.$nextTick(function() {
         this.updateSortIcon();
      });
    },
  },

  mounted() {
    this.updateSortIcon();
  },

  methods: {
    updateSortIcon() {
      this.sorted = this.dataTable.isColumnSorted(this.field) ? this.dataTable.dSortOrder : -1;
    }
  },
};
</script>
