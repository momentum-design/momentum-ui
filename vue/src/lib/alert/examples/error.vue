<template>
  <section>
    <div>
      <div class="row">
        <md-button
          ariaLabel="Click to Open"
          @click="() => show = true"
          color="primary"
        >Error</md-button>
      </div>
    </div>
    <br />
    <md-alert-container>
      <md-alert
        closable
        title="Error"
        message="Who's awesome?  You are!"
        :dismissBtnEvents="{
          click: () => show = false
        }"
        :dismissBtnProps="{
          ariaLabel: 'Close Alert'
        }"
        :show="show"
        type="error"
      />
    </md-alert-container>
  </section>
</template>

<script>
export default {
  name: 'ExampleAlertError',

  data() {
    return {
      show: false
    }
  },
};
</script>

