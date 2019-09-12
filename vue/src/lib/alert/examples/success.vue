<template>
  <section>
    <div>
      <div class="row">
        <md-button
          ariaLabel="Click to Open"
          @click="() => show = true"
          color="primary"
        >Success</md-button>
      </div>
    </div>
    <br />
    <md-alert-container>
      <md-alert
        closable
        title="Success"
        message="Who's awesome?  You are!"
        :dismissBtnEvents="{
          click: () => show = false
        }"
        :dismissBtnProps="{
          ariaLabel: 'Close Alert'
        }"
        :show="show"
        type="success"
      />
    </md-alert-container>
  </section>
</template>

<script>
export default {
  name: 'ExampleAlertSuccess',

  data() {
    return {
      show: false
    }
  },
};
</script>

