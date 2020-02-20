<template>
  <md-topbar
    color="light"
  >
    <md-topbar-right>
      <div class="md-top-bar__user" />
      <div class="md-top-bar__logged-out">
        <a href="javascript:void(0)">Log In</a>
        <md-button color="blue" ariaLabel="myAriaLabel">
          Button
        </md-button>
      </div>
    </md-topbar-right>
    <md-topbar-mobile :shouldCloseOnClick="false">
      <template v-slot:brand>
        <a
          href="javascript:void(0)"
          title="Momentum UI"
        >
          <md-icon name="cisco-logo" :size="32" />
        </a>
      </template>
    </md-topbar-mobile>
    
    <template v-slot:brand>
      <a
        href="javascript:void(0)"
        title="Momentum UI"
      >
        <md-icon name="cisco-logo" :size="32" />
      </a>
    </template>
  </md-topbar>
</template>

<script>
export default {
  name: 'ExampleTopbarNoMiddle',
};
</script>

