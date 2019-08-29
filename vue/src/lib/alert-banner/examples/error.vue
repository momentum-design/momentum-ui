<template>
  <div>
    <div>
      <md-alert-banner
        :show="showAlert1"
        closable
        @hide="() => showAlert1 = false"
        type="error"
      >
        Error Alert Banner
      </md-alert-banner>
    </div>
    <div>
      <div class='row'>
        <br />
        <md-button
          @click="() => showAlert1 = !showAlert1"
          ariaLabel="Error Alert Banner"
          class="btn--primary btn--large"
        >Toggle Error Alert Banner</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleAlertBannerError',

  data() {
    return {
      showAlert1: true,
    }
  },
};
</script>

