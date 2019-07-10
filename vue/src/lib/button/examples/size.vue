<template>
  <div class="example-spacing">
    <md-button :ariaLabel="'For the Win'">no size</md-button>
    <md-button :ariaLabel="'For the Win'" :size="28">size 28</md-button>
    <md-button :ariaLabel="'For the Win'">size 36</md-button>
    <md-button :ariaLabel="'For the Win'" :size="40">size 40</md-button>
    <md-button :ariaLabel="'For the Win'" :size="52">size 52</md-button>
  </div>
</template>

<script>
export default {
  name: 'ExampleButtonSize',
};
</script>

