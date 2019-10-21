<template>
  <div
    class="md-card"
    :class="$listeners.click && ` md-card--clickable`"
    @click="handleClick"
    @keydown="handleKeydown"
    role="presentation"
  ><slot></slot></div>
</template>

<script>
export default {
  name: 'md-card',

  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },

    handleKeydown(e) {
      if (
        e.which === 32
        || e.which === 13
        || e.charCode === 32
        || e.charCode === 13
      ) {
        this.handleClick(e);
        e.preventDefault();
      }
    }
  },
};
</script>
