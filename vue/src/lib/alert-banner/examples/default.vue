<template>
  <div>
    <div>
      <md-alert-banner
        :show="showAlert1"
        closable
        @hide="() => showAlert1 = false"
      >
        Default Alert Banner
      </md-alert-banner>
    </div>
    <div>
      <div class='row'>
        <br />
        <md-button
          @click="() => showAlert1 = !showAlert1"
          ariaLabel="Default Alert Banner"
          class="btn--primary btn--large"
        >Toggle Default Alert Banner</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleAlertBannerDefault',

  data() {
    return {
      showAlert1: true,
    }
  },
};
</script>

