<template>
  <div>
    <div class='columns small-4'>
      <md-button-group>
        <md-button ariaLabel="left"><md-icon name="icon-arrow-left_12" /></md-button>
        <md-button ariaLabel="right"><md-icon name="icon-arrow-right_12" /></md-button>
      </md-button-group>
    </div>
    <div class='columns small-4'>
      <md-button-group type="pill">
        <md-button ariaLabel="left"><md-icon name="icon-flag_16" /></md-button>
        <md-button ariaLabel="right"><md-icon name="icon-cancel_16" /></md-button>
      </md-button-group>
    </div>
    <div class='columns small-4'>
      <md-button-group type="pill" pillWidth="60px">
        <md-button ariaLabel="left"><md-icon name="icon-flag_16" /></md-button>
      </md-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleButtonGroupPill',
};
</script>

