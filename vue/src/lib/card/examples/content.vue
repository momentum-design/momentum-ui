<template>
  <md-card style="width: 400px;">
    <md-card-section style="display: flex, justifyContent: space-between">
      <md-avatar src="http://react.collab-ui.com/barbara.png" style="display: flex" />
      <h4>Content</h4>
      <h6>Subtitle</h6>
    </md-card-section>
    <md-card-section full>
      <img alt="placeholder" src="https://place-hold.it/400x400" />
    </md-card-section>
    <md-card-section>
      Et netus et malesuada fames ac turpis egestas macecenas. Adipisccing at in tellus integer.
    </md-card-section>
    <md-card-section style="width: 100%, display: flex, justifyContent: flex-end, alignItems: baseline">
      <md-link href="" style="margin-right: 16px"> Link Text </md-link>
      <md-button
        ariaLabel="myAriaLabel"
      >Button</md-button>
    </md-card-section>
  </md-card>
</template>

<script>
export default {
  name: 'ExampleCardContent',
};
</script>
