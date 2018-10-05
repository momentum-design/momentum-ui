/**
 * @category controls
 * @component toggle-switch
 * @variations collab-ui-react
 */

import React from 'react';
import PropTypes from 'prop-types';

class ToggleSwitch extends React.PureComponent {

  state = { 
    isToggleOn: this.props.checked
  };

  handleClick = event => {
    this.setState ({ isToggleOn: !this.state.isToggleOn });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const {
      disabled,
      name,
      label,
      value,
      className,
      htmlId,
      onChange,
    } = this.props;

    return (
      <div
        className={
          `cui-input-group cui-toggle-switch` +
          ` ${className}`
        }
      >
        <input
          className="cui-input cui-toggle-switch__input"
          type="checkbox"
          disabled={disabled}
          aria-checked={this.state.isToggleOn}
          checked={this.state.isToggleOn}
          name={name}
          value={value}
          id={htmlId}
          onChange={onChange}
          tabIndex={0}
          onClick={event => this.handleClick(event)}
        />

        <label className="cui-toggle-switch__label" htmlFor={htmlId}>
          <span className="cui-toggle-switch__label__container" />
          <span className="cui-toggle-switch__label__text">{label}</span>
        </label>
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  /** @prop Set the toggle switch to checked | false */
  checked: PropTypes.bool,
  /** @prop Sets the className for the toggle switch | '' */
  className: PropTypes.string,
  /** @prop Set the toggle switch to disabled | false */
  disabled: PropTypes.bool,
  /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  htmlId: PropTypes.string.isRequired,
  /** @prop Sets the label string for the toggle switch | '' */
  label: PropTypes.string.isRequired,
  /** @prop Sets the name of the toggle switch | '' */
  name: PropTypes.string,
  /** @prop Callback function invoked when state is changed | null */
  onChange: PropTypes.func,
  /** @prop Sets the value of the toggle switch | '' */
  value: PropTypes.string,
};

ToggleSwitch.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  label: '',
  name: '',
  onChange: null,
  value: '',
};

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;

/**
* @name Default Toggle Switch
* @description Toggle Switches are useful.
*
* @category controls
* @component toggle-switch
* @section default
*
* @js

export default class Checkbox extends React.PureComponent {
  render() {
    return (
      <ToggleSwitch
        checked={false}
        label='Toggle Switch'
        htmlId='testToggleSwitch1'
      />
    );
  }
}

*/

/**
* @name Disabled Toggle Switch
* @description Toggle Switches are useful.
*
* @category controls
* @component toggle-switch
* @section disabled
*
* @js

export default function ToggleSwitch() {
  return (
    <ToggleSwitch
      disabled
      label='Toggle Switch'
      htmlId='testToggleSwitch2'
    />
  );
}

**/
