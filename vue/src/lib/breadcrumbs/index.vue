<template>
  <ul
    class="md-breadcrumbs"
    :class="{className}">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'md-breadcrumbs',
    props: {
      className: ""
    },
    created() {
      if (this.$slots && this.$slots.default) {
        let lastTag = this.$slots.default[this.$slots.default.length - 1];
        if(lastTag.tag === "li") {
          lastTag.data.class = "current";
        }
      }
    }
  };
</script>
