<template>
  <div class="row">
    <div class="docs-example docs-example--spacing">
      <md-button
        @click="() => showModal = true"
        ariaLabel="Open Modal"
        color="primary"
      >Dialog</md-button>
      <md-modal
        applicationId="app"
        @hide="showModal = false"
        :show="showModal"
        ref="modal1"
        htmlId="modal1"
        size="dialog"
      >
        <md-modal-header
          headerLabel="Dialog Modal"
          showCloseButton
        />
        <md-modal-body>
          <span>I'm just a dialog box</span>
        </md-modal-body>
        <md-modal-footer>
          <md-button
            @click="() => $refs.modal1.closeModal()"
            ariaLabel="Close Modal"
            color="default"
          >Cancel</md-button>
          <md-button
            type="submit"
            @click="() => $refs.modal1.closeModal()"
            ariaLabel="Submit Form"
            color="blue"
          >OK</md-button>
        </md-modal-footer>
      </md-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleModalDialog',

  data() {
    return {
      showModal: false,
      showModal2: false,
    }
  },
};
</script>

