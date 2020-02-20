<template>
  <md-topbar
    color="light"
    title="Momentum UI"
  >
    <md-topbar-nav>
      <md-list-item>Develop</md-list-item>
      <md-list-item>Styles</md-list-item>
      <md-list-item>Layout</md-list-item>
      <md-list-item>Navigation</md-list-item>
    </md-topbar-nav>
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
      <md-list-item>Develop</md-list-item>
      <md-list-item>Styles</md-list-item>
      <md-list-item>Layout</md-list-item>
      <md-list-item>Navigation</md-list-item>
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
  name: 'ExampleTopbarLight',
};
</script>

