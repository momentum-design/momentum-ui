<template>
  <section>
    <div>
      <div class="row">
        <md-button
          ariaLabel="Click to Open"
          @click="() => show = true"
          color="primary"
        >Info/Default</md-button>
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
        type="info"
      />
    </md-alert-container>
  </section>
</template>

<script>
export default {
  name: 'ExampleAlertDefault',

  data() {
    return {
      show: false
    }
  },
};
</script>

