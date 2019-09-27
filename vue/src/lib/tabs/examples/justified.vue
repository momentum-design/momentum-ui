<template>
  <md-tabs justified :focus="0">
    <md-tab-list>
      <md-tab
        heading='First Tab' :disabled="true"
      />
      <md-tab
        heading='Second Tab'
      />
      <md-tab
        heading='Third Tab'
      />
    </md-tab-list>
    <md-tab-content>
      <md-tab-pane>
        Testing 1
      </md-tab-pane>
      <md-tab-pane>
        Testing 2
      </md-tab-pane>
      <md-tab-pane>
        Testing 3
      </md-tab-pane>
    </md-tab-content>
  </md-tabs>
</template>

<script>
export default {
  name: 'ExampleTabsJustified',
};
</script>

