<template>
  <div class="row">
    <div class="docs-example docs-example--spacing">
      <md-popover
        popoverTrigger="Click"
      >
        <md-button ariaLabel="Click" >Click</md-button>
        <md-list slot="content">
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="edit_20" />
            </md-list-item-section>
            <md-list-item-section position="center">
              Edit space settings
            </md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="favorite_20" />
            </md-list-item-section>
            <md-list-item-section position="center">Add to favorites</md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="alert_20" />
            </md-list-item-section>
            <md-list-item-section position="center">Notifications</md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="accessories_20" />
            </md-list-item-section>
            <md-list-item-section position="center">
              Add Integrations & Bots
            </md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="stored-info_20" />
            </md-list-item-section>
            <md-list-item-section position="center">View space policy</md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="archive_20" />
            </md-list-item-section>
            <md-list-item-section position="center">Archive space</md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="cancel_20" />
            </md-list-item-section>
            <md-list-item-section position="center">
              Remove space from team
            </md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="exit-room_20" />
            </md-list-item-section>
            <md-list-item-section position="center">Leave space</md-list-item-section>
          </md-list-item>
        </md-list>
      </md-popover>
    </div>
    <div class="docs-example docs-example--spacing">
      <md-popover
        popoverTrigger="MouseEnter"
      >
        <md-button ariaLabel="MouseEnter" >MouseEnter</md-button>
        <md-list slot="content">
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="edit_20" />
            </md-list-item-section>
            <md-list-item-section position="center">
              Edit space settings
            </md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="favorite_20" />
            </md-list-item-section>
            <md-list-item-section position="center">Add to favorites</md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="alert_20" />
            </md-list-item-section>
            <md-list-item-section position="center">Notifications</md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="accessories_20" />
            </md-list-item-section>
            <md-list-item-section position="center">
              Add Integrations & Bots
            </md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="stored-info_20" />
            </md-list-item-section>
            <md-list-item-section position="center">View space policy</md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="archive_20" />
            </md-list-item-section>
            <md-list-item-section position="center">Archive space</md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="cancel_20" />
            </md-list-item-section>
            <md-list-item-section position="center">
              Remove space from team
            </md-list-item-section>
          </md-list-item>
          <md-list-item>
            <md-list-item-section position="left">
              <md-icon name="exit-room_20" />
            </md-list-item-section>
            <md-list-item-section position="center">Leave space</md-list-item-section>
          </md-list-item>
        </md-list>
      </md-popover>
    </div>
    <div class="docs-example docs-example--spacing">
      <md-popover
        popoverTrigger="Focus"
      >
        <md-button ariaLabel="Focus" >Focus</md-button>
        <span slot="content" style="padding: 10px">Focus</span>
      </md-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamplePopoverDefault',
};
</script>

