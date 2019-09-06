<template>
  <button class="md-close" @click="handleClick" />
</template>

<script>
export default {
  name: 'md-close-icon',

  methods: {
    handleClick(e) {
      this.$emit('click', e);
    }
  },
};
</script>
