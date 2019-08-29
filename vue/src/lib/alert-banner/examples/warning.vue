<template>
  <div>
    <div>
      <md-alert-banner
        :show="showAlert1"
        closable
        @hide="() => showAlert1 = false"
        type="warning"
      >
        Warning Alert Banner
      </md-alert-banner>
    </div>
    <div>
      <div class='row'>
        <br />
        <md-button
          @click="() => showAlert1 = !showAlert1"
          ariaLabel="Warning Alert Banner"
          class="btn--primary btn--large"
        >Toggle Warning Alert Banner</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleAlertBannerWarning',

  data() {
    return {
      showAlert1: true,
    }
  },
};
</script>

