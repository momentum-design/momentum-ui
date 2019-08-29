<template>
  <div class="medium-4 columns">
    <md-list>
      <md-list-item link="javascript:void(0)">
        <md-list-item-section position="left">Left</md-list-item-section>
        <md-list-item-section position="right">Right</md-list-item-section>
      </md-list-item>
      <md-list-item link="javascript:void(0)">
        <md-list-item-section position="center">Center</md-list-item-section>
      </md-list-item>
      <md-list-item link="javascript:void(0)">
        <md-list-item-section position="center-align">
          Center Align
        </md-list-item-section>
      </md-list-item>
      <md-list-item link="javascript:void(0)">
        <md-list-item-section position="left">Left</md-list-item-section>
        <md-list-item-section position="center">Center</md-list-item-section>
        <md-list-item-section position="right">Right</md-list-item-section>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'ExampleListItemSection',
};
</script>
