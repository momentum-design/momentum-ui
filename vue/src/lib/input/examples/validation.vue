<template>
  <form name='testFrom' @submit="handleSubmit">
    <md-input
      name="inputValidation"
      label="Advanced Validation"
      htmlId="inputValidation"
      containerSize="medium-6"
      helpText="Field Must contain at least 6 characters and 1 capital letter"
      :messageArr="testMeError"
      @change="handleChange"
      :value="testMe"
    />
  </form>
</template>

<script>
export default {
  name: 'ExampleInputValidation',

  data() {
    return {
      testMe: '',
      testMeError: []
    }
  },

  methods: {
    handleChange(e) {
      this.testMe = e.target.value
    },

    handleSubmit(event) {
      event && event.preventDefault();
      this.validateField('testMe', this.testMe);
    },

    addElement(array, element) {
      return array.includes(element)
      ? [...array]
      : [...array, element];
    },

    removeElement(array, element) {
      return array.filter((ele) => ele !== element);
    },

    createErrorArr(validationArr, value) {
      return validationArr.reduce((agg, e) =>
        value.match(e.test)
        ? this.removeElement(agg, e)
        : this.addElement(agg, e)
      , []);
    },

    validateField(fieldName, value) {
      const rules = {
        testMe: {
          validation: [
            {
              message: 'Preferred if TestMe Field is 8 characters',
              test: '^[a-zA-Z]{8,}$',
              type: 'warning'
            },
            {
              message: 'TestMe Field is too short',
              test: '^[a-zA-Z]{6,}$',
              type: 'error'
            },
            {
              message: 'TestMe Field must contain Caps',
              test: '[A-Z]',
              type: 'error'
            },
            {
              message: 'Preferred if TestMe Field has 2 caps',
              test: '[A-Z]{2}',
              type: 'warning'
            }
          ],
          errors: this.testMeError
        }
      };

      this[`${fieldName}Error`] = this.createErrorArr(rules[fieldName].validation, value);
    },
  },
};
</script>
