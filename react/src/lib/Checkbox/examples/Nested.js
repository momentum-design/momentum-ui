import React from 'react';
import { Checkbox } from '@collab-ui/react';
export default class CheckboxNested extends React.PureComponent {
  state = {
    parent: false,
    child1: false,
    child2: false,
    child3: false,
  }
  render() {
    return (
      <span>
        <Checkbox
          value='parent'
          label='Parent Checkbox Example'
          htmlId='parentCheckbox'
          checked={this.state.parent}
          onChange={() => this.setState({ parent: !this.state.parent })}
          key='child-0'
        />
        <Checkbox
          value='child1'
          label='Child Checkbox Nested 1 Level'
          htmlId='childCheckbox1'
          nestedLevel={1}
          checked={this.state.child1}
          onChange={() => this.setState({ child1: !this.state.child1 })}
          key='child-1'
        />
        <Checkbox
          value='child2'
          label='Child Checkbox Nested 2 Levels'
          htmlId='childCheckbox2'
          nestedLevel={2}
          checked={this.state.child2}
          onChange={() => this.setState({ child2: !this.state.child2 })}
          key='child-2'
        />
        <Checkbox
          value='child3'
          label='Child Checkbox Nested 3 Levels'
          htmlId='childCheckbox3'
          nestedLevel={3}
          checked={this.state.child3}
          onChange={() => this.setState({ child3: !this.state.child3 })}
          key='child-3'
        />
      </span>
    );
  }
}