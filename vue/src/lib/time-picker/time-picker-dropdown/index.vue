<template>
  <div
    class="md-timepicker__dropdown-container"
    @click="handleClick"
  >
    <div class="md-timepicker__dropdown">
      <div class="inline-flex"><slot></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'md-time-picker-dropdown',

  methods: {
    handleClick(e) {
      e.stopPropagation();
    }
  },
};
</script>
