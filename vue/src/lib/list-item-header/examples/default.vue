<template>
  <div class="medium-4 columns">
    <md-list>
      <md-list-item-header header="Testing">
        <router-link to="/containers/list-item">More</router-link>
      </md-list-item-header>
    </md-list>
    <md-list class="md--dark" style="background-color: rgba(40,40,40,0.72)">
      <md-list-item-header header="Testing">
        <router-link to="/containers/list-item">More</router-link>
      </md-list-item-header>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'ExampleListItemHeaderDefault',
};
</script>

