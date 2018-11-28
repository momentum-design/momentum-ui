import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@collab-ui/react';

/**
 * @category controls
 * @component checkbox
 * @variations collab-ui-react
 */

const Checkbox = props => {
  const {
    checked,
    children,
    className,
    disabled,
    htmlId,
    indeterminate,
    inputRef,
    label,
    name,
    nestedLevel,
    onChange,
    required,
    value,
    ...otherProps
  } = props;

  return (
    <div
      className={
        'cui-input-group cui-checkbox' +
        `${(nestedLevel && ` cui-input--nested-${nestedLevel}`) || ''}` +
        ` ${className}`
      }
    >
      <input
        aria-checked={checked}
        className={
          `cui-input cui-checkbox__input` +
          `${(indeterminate && ' indeterminate') || ''}`
        }
        type="checkbox"
        ref={inputRef}
        disabled={disabled}
        checked={checked}
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        tabIndex={0}
        id={htmlId}
        {...otherProps}
      />
      <Label
        className="cui-checkbox__label"
        label={label}
        htmlFor={htmlId}
      />
      {children}
    </div>
  );
};

Checkbox.propTypes = {
  /** @prop Sets Checkbox status as checked | false */
  checked: PropTypes.bool,
  /** @prop Child component to display next to the input | null */
  children: PropTypes.node,
  /** @prop Optional css class string | ''  */
  className: PropTypes.string,
  /** @prop Sets the attribute disabled to the Checkbox | false */
  disabled: PropTypes.bool,
  /** @prop Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing */
  htmlId: PropTypes.string.isRequired,
  /** @prop Optional indeterminate capabilities of checkbox | false */
  indeterminate: PropTypes.bool,
  /** @prop optional ref attribute for Checkbox input element | null */
  inputRef: PropTypes.func,
  /** @prop Required label string for Checkbox */
  label: PropTypes.string.isRequired,
  /** @prop Sets the attribute name to the Checkbox input element | '' */
  name: PropTypes.string,
  /** @prop Set the level of nested checkboxes | 0 */
  nestedLevel: PropTypes.number,
  /** @prop Optional onChange handler invoked when user makes a change within the Checkbox input element | null */
  onChange: PropTypes.func,
  /** @prop Optional required setting for Checkbox input | false */
  required: PropTypes.bool,
  /** @prop sets value of the Checkbox input element | '' */
  value: PropTypes.string,
};

Checkbox.defaultProps = {
  autoFocus: false,
  checked: false,
  className: '',
  disabled: false,
  indeterminate: false,
  inputRef: null,
  label: '',
  name: '',
  nestedLevel: 0,
  onChange: () => {},
  required: false,
  value: '',
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;

/**
* @component checkbox
* @section default
* @react

import { Checkbox, CheckboxGroup, InputHelper } from '@collab-ui/react';

export default function CheckboxDefault() {

  return (
    <CheckboxGroup name='CheckboxGroup1'>
      <Checkbox
        value='me'
        label='me'
        htmlId='testCheckbox1'
        onChange={() => { }}
      />
    </CheckboxGroup>
  );
}
**/

/**
* @component checkbox
* @section group
* @react

import { Checkbox, CheckboxGroup, InputHelper } from '@collab-ui/react';

export default function CheckboxGroupExample() {

  return (
    <CheckboxGroup name='CheckboxGroup1'>
      <Checkbox
        value='me'
        label='me'
        htmlId='testCheckbox1'
        onChange={() => { }}
      />
      <Checkbox
        value='you'
        label='you'
        htmlId='testCheckbox2'
        onChange={() => { }}
      />
      <Checkbox
        value='us'
        label='us'
        htmlId='testCheckbox3'
        onChange={() => { }}
      />
    </CheckboxGroup>
  );
}
**/

/**
* @component checkbox
* @section disabled
* @react
import { Checkbox } from '@collab-ui/react';

export default function CheckboxDisabled() {
  return (
    <Checkbox
      value='disabledChecked'
      label='Disabled Checkbox'
      htmlId='disabledCheckbox'
      disabled
      onChange={()=>{}}
    />
  );
}
**/

/**
* @component checkbox
* @section indeterminate
* @react
import { Checkbox } from '@collab-ui/react';

export default function CheckboxIndeterminate() {
  return (
    <Checkbox
      value='indeterminate'
      label='Indeterminate Checkbox'
      htmlId='indeterminateCheckbox'
      onChange={()=>{}}
      indeterminate
    />
  );
}
**/



/**
* @component checkbox
* @section nested
* @react
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
**/
