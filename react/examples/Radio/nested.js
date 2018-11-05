import React from 'react';
import { Radio } from '@collab-ui/react';
export default class RadioNested extends React.PureComponent {
  state = {
    value: 'parent'
  }
  render() {
    return (
      <span>
        <Radio
          value='parent'
          label='Parent Radio Example'
          htmlId='parentRadio'
          name='nestedRadios'
          checked={this.state.value === 'parent'}
          onChange={() => this.setState({ value: 'parent' })}
          key='child-0'
        />
        <Radio
          value='child1'
          label='Child Radio Nested 1 Level'
          htmlId='childRadio1'
          name='nestedRadios'
          nestedLevel={1}
          checked={this.state.value === 'child1'}
          onChange={() => this.setState({ value: 'child1' })}
          key='child-1'
        />
        <Radio
          value='child2'
          label='Child Radio Nested 2 Level'
          htmlId='childRadio2'
          name='nestedRadios'
          nestedLevel={2}
          checked={this.state.value === 'child2'}
          onChange={() => this.setState({ value: 'child2' })}
          key='child-2'
        />
        <Radio
          value='child3'
          label='Child Radio Nested 3 Level'
          htmlId='childRadio3'
          name='nestedRadios'
          nestedLevel={3}
          checked={this.state.value === 'child3'}
          onChange={() => this.setState({ value: 'child3' })}
          key='child-3'
        />
      </span>
    );
  }
}