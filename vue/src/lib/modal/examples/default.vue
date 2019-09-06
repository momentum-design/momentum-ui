<template>
  <div class="row">
    <div class="docs-example docs-example--spacing">
      <md-button
        @click="() => showModal = true"
        ariaLabel="Open Modal"
        color="primary"
      >Default/Medium Modal</md-button>
      <md-button
        @click="() => showModal2 = true"
        ariaLabel="Open Modal 2"
        color="primary"
      >Default/Medium Modal with Message</md-button>
      <md-modal
        applicationId="app"
        @hide="showModal = false"
        :show="showModal"
        ref="modal1"
        htmlId="modal1"
        backdropClickExit
      >
        <md-modal-header
          headerLabel="Default Modal"
          showCloseButton
        />
        <md-modal-body>
          <form ref="form1" />
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
      <md-modal
        applicationId="app"
        @hide="showModal2 = false"
        :show="showModal2"
        ref="modal2"
        htmlId="modal2"
        backdropClickExit
      >
        <md-modal-header
          headerLabel="Default Modal"
          message="To create a meeting invite manually, copy and paste the meeting information and people into your email calendar invite."
          showCloseButton
        />
        <md-modal-body>
          <form ref="form1" />
        </md-modal-body>
        <md-modal-footer>
          <md-button
            @click="() => $refs.modal2.closeModal()"
            ariaLabel="Close Modal"
            color="default"
          >Cancel</md-button>
          <md-button
            type="submit"
            @click="() => $refs.modal2.closeModal()"
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
  name: 'ExampleModalDefault',

  data() {
    return {
      showModal: false,
      showModal2: false,
    }
  },
};
</script>

