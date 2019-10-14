<template>
  <md-avatar title="Tom Smith" aria-label="Tom Smith" @click="handleClick"></md-avatar>
</template>

<script>
export default {
  name: 'ExampleAvatarClickable',

  methods: {
    handleClick(e) {
      alert(`${e.target.title} clicked`);
    }
  },
};
</script>
