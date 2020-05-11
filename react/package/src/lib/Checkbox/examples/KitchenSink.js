import React from 'react';
import { Checkbox, InputHelper } from '@momentum-ui/react';

export default class CheckboxKitchenSink extends React.PureComponent {
  state = {
    checkboxChecked: true,
    checkboxCheckedDisabled: true,
    checkboxCheckedReadonly: true,
  };
  render() {
    const checkboxes = value => (
      <>
        <Checkbox
          name={`checkbox${value}`}
          label="Checkbox Example"
          htmlId={`checkbox${value}`}
          checked={this.state.checkbox}
          onChange={() => this.setState({ checkbox: !this.state.checkbox })}
          key={`checkbox${value}`}
        />
        <Checkbox
          name={`checkboxChecked${value}`}
          label="Checkbox Checked Example"
          htmlId={`checkboxChecked${value}`}
          checked={this.state.checkboxChecked}
          onChange={() => this.setState({ checkboxChecked: !this.state.checkboxChecked })}
          key={`checkboxChecked${value}`}
        />
        <Checkbox
          name={`checkboxIndeterminate${value}`}
          label="Checkbox Indeterminate Example"
          htmlId={`checkboxIndeterminate${value}`}
          checked={this.state.checkboxIndeterminate}
          onChange={() =>
            this.setState({
              checkboxIndeterminate: !this.state.checkboxIndeterminate,
            })
          }
          key={`checkboxIndeterminate${value}`}
          indeterminate
        />
        <Checkbox
          name={`checkboxHelp${value}`}
          label="Checkbox Example with help text"
          htmlId={`checkboxHelp${value}`}
          checked={this.state.checkboxHelp}
          onChange={() => this.setState({ checkboxHelp: !this.state.checkboxHelp })}
          key={`checkboxHelp${value}`}
        >
          <InputHelper message="This is help text for the Checkbox component" />
        </Checkbox>

        <Checkbox
          name={`checkboxDisabled${value}`}
          label="Disabled Checkbox Example"
          htmlId={`checkboxDisabled${value}`}
          checked={this.state.checkboxDisabled}
          onChange={() => this.setState({ checkbox: !this.state.checkboxDisabled })}
          key={`checkboxDisabled${value}`}
          disabled
        />
        <Checkbox
          name={`checkboxCheckedDisabled${value}`}
          label="Disabled Checkbox Checked Example"
          htmlId={`checkboxCheckedDisabled${value}`}
          checked={this.state.checkboxCheckedDisabled}
          onChange={() =>
            this.setState({
              checkboxCheckedDisabled: !this.state.checkboxCheckedDisabled,
            })
          }
          key={`checkboxCheckedDisabled${value}`}
          disabled
        />
        <Checkbox
          name={`checkboxIndeterminateDisabled${value}`}
          label="Disabled Checkbox Indeterminate Example"
          htmlId={`checkboxIndeterminateDisabled${value}`}
          checked={this.state.checkboxIndeterminateDisabled}
          onChange={() =>
            this.setState({
              checkboxIndeterminateDisabled: !this.state.checkboxIndeterminateDisabled,
            })
          }
          key={`checkboxIndeterminateDisabled${value}`}
          indeterminate
          disabled
        />
        <Checkbox
          name={`checkboxHelpDisabled${value}`}
          label="Disabled Checkbox Example with help text"
          htmlId={`checkboxHelpDisabled${value}`}
          checked={this.state.checkboxHelpDisabled}
          onChange={() => this.setState({ checkboxHelpDisabled: !this.state.checkboxHelpDisabled })}
          key={`checkboxHelpDisabled${value}`}
          disabled
        >
          <InputHelper message="This is help text for the Checkbox component" />
        </Checkbox>

        <Checkbox
          name={`checkboxReadonly${value}`}
          label="Readonly Checkbox Example"
          htmlId={`checkboxReadonly${value}`}
          checked={this.state.checkboxReadonly}
          onChange={() => this.setState({ checkbox: !this.state.checkboxReadonly })}
          key={`checkboxReadonly${value}`}
          readOnly
        />
        <Checkbox
          name={`checkboxCheckedReadonly${value}`}
          label="Readonly Checkbox Checked Example"
          htmlId={`checkboxCheckedReadonly${value}`}
          checked={this.state.checkboxCheckedReadonly}
          onChange={() =>
            this.setState({
              checkboxCheckedReadonly: !this.state.checkboxCheckedReadonly,
            })
          }
          key={`checkboxCheckedReadonly${value}`}
          readOnly
        />
        <Checkbox
          name={`checkboxIndeterminateReadonly${value}`}
          label="Readonly Checkbox Indeterminate Example"
          htmlId={`checkboxIndeterminateReadonly${value}`}
          checked={this.state.checkboxIndeterminateReadonly}
          onChange={() =>
            this.setState({
              checkboxIndeterminateReadonly: !this.state.checkboxIndeterminateReadonly,
            })
          }
          key={`checkboxIndeterminateReadonly${value}`}
          indeterminate
          readOnly
        />
        <Checkbox
          name={`checkboxHelpReadonly${value}`}
          label="Readonly Checkbox Example with help text"
          htmlId={`checkboxHelpReadonly${value}`}
          checked={this.state.checkboxHelpReadonly}
          onChange={() => this.setState({ checkboxHelpReadonly: !this.state.checkboxHelpReadonly })}
          key={`checkboxHelpReadonly${value}`}
          readOnly
        >
          <InputHelper message="This is help text for the Checkbox component" />
        </Checkbox>

        <Checkbox
          name={`checkboxNested0${value}`}
          label="Nested Checkbox Example Level 0"
          htmlId={`checkboxNested0${value}`}
          checked={this.state.checkboxNested0}
          onChange={() => this.setState({ checkboxNested0: !this.state.checkboxNested0 })}
          key={`checkboxNested0${value}`}
          nestedLevel={0}
        />
        <Checkbox
          name={`checkboxNested1${value}`}
          label="Nested Checkbox Example Level 1"
          htmlId={`checkboxNested1${value}`}
          checked={this.state.checkboxNested1}
          onChange={() => this.setState({ checkboxNested1: !this.state.checkboxNested1 })}
          key={`checkboxNested1${value}`}
          nestedLevel={1}
        />
        <Checkbox
          name={`checkboxNestedHelp2${value}`}
          label="Nested Checkbox Example Level 2"
          htmlId={`checkboxNestedHelp2${value}`}
          checked={this.state.checkboxNestedHelp2}
          onChange={() => this.setState({ checkboxNestedHelp2: !this.state.checkboxNestedHelp2 })}
          key={`checkboxNestedHelp2${value}`}
          nestedLevel={2}
        >
          <InputHelper message="This is help text for the nested Checkbox component" />
        </Checkbox>
        <Checkbox
          name={`checkboxNestedHelp3${value}`}
          label="Nested Checkbox Example Level 3"
          htmlId={`checkboxNestedHelp3${value}`}
          checked={this.state.checkboxNestedHelp3}
          onChange={() => this.setState({ checkboxNestedHelp3: !this.state.checkboxNestedHelp3 })}
          key={`checkboxNestedHelp3${value}`}
          nestedLevel={3}
        >
          <InputHelper message="This is help text for the nested Checkbox component" />
        </Checkbox>
      </>
    );
    return (
      <>
        <div className="row" style={{ padding: '1rem' }}>
          {checkboxes(1)}
        </div>
        <div className="md--dark row" style={{ backgroundColor: 'black', padding: '1rem' }}>
          {checkboxes(2)}
        </div>
        <div className="md--contrast">
          <div className="row" style={{ padding: '1rem' }}>
            {checkboxes(3)}
          </div>
          <div className="md--dark row" style={{ backgroundColor: 'black', padding: '1rem' }}>
            {checkboxes(4)}
          </div>
        </div>
      </>
    );
  }
}
