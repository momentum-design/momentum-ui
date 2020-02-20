<template>
  <md-sidebar :withIcons="false">
    <md-sidebar-body>
      <md-sidebar-nav>
        <md-sidebar-nav-item
          title='Level 1'
        />
        <md-sidebar-nav-item
          title='Level 1 + Sub'
        >
          <md-sidebar-nav-item title='Level 2' />
          <md-sidebar-nav-item title='Level 2' />
          <md-sidebar-nav-item title='Level 2 + Sub'>
            <md-sidebar-nav-item title='Level 3' />
            <md-sidebar-nav-item title='Level 3' />
            <md-sidebar-nav-item title='Level 3' />
          </md-sidebar-nav-item>
        </md-sidebar-nav-item>
      </md-sidebar-nav>
      <md-sidebar-nav title='section title'>
        <md-sidebar-nav-item
          title='Level 1'
        />
      </md-sidebar-nav>
    </md-sidebar-body>
  </md-sidebar>
</template>

<script>
export default {
  name: 'ExampleSidebarDefault',
};
</script>

