<template>
  <md-input class="md-search-input" v-bind="$attrs">
    <md-spinner v-if="isLoading" :size="20" slot="inputBefore" />
    <md-icon
      v-if="!isLoading"
      class="md-search-input__icon"
      name="search_20"
      slot="inputBefore"
    />
  </md-input>
</template>

<script>
export default {
  name: 'md-input-search',

  props: {
    /** @prop Determines if spinner is present | false */
    isLoading: Boolean
  }
};
</script>
