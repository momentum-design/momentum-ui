<template>
  <span>
    <md-checkbox
      value="parent"
      label="Parent Checkbox Example"
      htmlId="parentCheckbox"
      :checked="parent"
      @change="() => parent = !parent"
      key="child-0"
    />
    <md-checkbox
      value="child1"
      label="Child Checkbox Nested 1 Level"
      htmlId="childCheckbox1"
      nestedLevel="1"
      :checked="child1"
      @change="() => child1 = !child1"
      key="child-1"
    />
    <md-checkbox
      value="child2"
      label="Child Checkbox Nested 2 Levels"
      htmlId="childCheckbox2"
      nestedLevel="2"
      :checked="child2"
      @change="() => child2 = !child2"
      key="child-2"
    />
    <md-checkbox
      value="child3"
      label="Child Checkbox Nested 3 Levels"
      htmlId="childCheckbox3"
      nestedLevel="3"
      :checked="child3"
      @change="() => child3 = !child3"
      key="child-3"
    />
  </span>
</template>

<script>
export default {
  name: 'ExampleCheckboxNested',

  data() {
    return {
      parent: false,
      child1: false,
      child2: false,
      child3: false,
    }
  },

  methods: {
    onChange(e) {}
  },
};
</script>

