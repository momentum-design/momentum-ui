import React from 'react';
import { Input } from '@collab-ui/react';
export default class Form extends React.PureComponent {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.retrieveState = this.retrieveState.bind(this);
    this.addElement = this.addElement.bind(this);
    this.createErrorArr = this.createErrorArr.bind(this);
  }
  state = {
    testMe: '',
    testMeError: []
  }
  handleChange(value) {
    this.setState({
      testMe: value
    });
  }
  handleSubmit(event) {
    event && event.preventDefault();
    this.validateField('testMe', this.state.testMe);
  }
  retrieveState() {
    return this.state;
  }
  addElement(array, element) {
    return array.includes(element)
    ? [...array]
    : [...array, element];
  }
  removeElement(array, element) {
    return array.filter((ele) => ele !== element);
  }
  createErrorArr(validationArr, value) {
    return validationArr.reduce((agg, e) =>
      value.match(e.test)
      ? this.removeElement(agg, e)
      : this.addElement(agg, e)
    , []);
  }
  validateField(fieldName, value, cb) {
    const rules = {
      testMe: {
        validation: [
          {
            error: 'Preferred if TestMe Field is 8 characters',
            test: '^[a-zA-Z]{8,}$',
            type: 'warning'
          },
          {
            error: 'TestMe Field is too short',
            test: '^[a-zA-Z]{6,}$',
            type: 'error'
          },
          {
            error: 'TestMe Field must contain Caps',
            test: '[A-Z]',
            type: 'error'
          },
          {
            error: 'Preferred if TestMe Field has 2 caps',
            test: '[A-Z]{2}',
            type: 'warning'
          }
        ],
        errors: this.state.testMeError
      }
    };
    return (
      this.setState({
        [`${fieldName}Error`]: this.createErrorArr(rules[fieldName].validation, value)
      },
        cb
      )
    );
  }
  render() {
    return (
      <form name='testFrom' onSubmit={this.handleSubmit}>
        <div className='row'>
          <Input
            inputSize='small-5'
            htmlId='testMe'
            value={this.state.testMe}
            name='testMe'
            label='Advanced Validation'
            onChange={this.handleChange}
            inputHelpText='Field Must contain at least 6 characters and 1 capital letter'
            errorArr={this.state.testMeError}
          />
        </div>
          {this.props.children}
      </form>
    );
  }
}