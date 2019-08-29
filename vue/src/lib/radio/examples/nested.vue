<template>
  <md-radio-group name="RadioGroup2" @change="onChange">
    <md-radio
      value="parent"
      label="Parent Radio Example"
      htmlId="parentRadio"
      name="nestedRadios"
      key="child-0"
    />
    <md-radio
      value="child1"
      label="Child Radio Nested 1 Level"
      htmlId="childRadio1"
      name="nestedRadios"
      nestedLevel="1"
      key="child-1"
    />
    <md-radio
      value="child2"
      label="Child Radio Nested 2 Level"
      htmlId="childRadio2"
      name="nestedRadios"
      nestedLevel="2"
      key="child-2"
    />
    <md-radio
      value="child3"
      label="Child Radio Nested 3 Level"
      htmlId="childRadio3"
      name="nestedRadios"
      nestedLevel="3"
      key="child-3"
    />
  </md-radio-group>
</template>

<script>
export default {
  name: 'ExampleRadioNested',

  methods: {
    onChange(e) {}
  },
};
</script>

