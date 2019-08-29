<template>
  <section>
    <div>
      <div class="row">
        <md-button
          ariaLabel="Click to Open"
          @click="() => show = true"
          color="primary"
        >Warning</md-button>
      </div>
    </div>
    <br />
    <md-alert-container>
      <md-alert
        closable
        title="Alert"
        message="Who's awesome?  You are!"
        :dismissBtnEvents="{
          click: () => show = false
        }"
        :dismissBtnProps="{
          ariaLabel: 'Close Alert'
        }"
        :show="show"
        type="warning"
      />
    </md-alert-container>
  </section>
</template>

<script>
export default {
  name: 'ExampleAlertWarning',

  data() {
    return {
      show: false
    }
  },
};
</script>

