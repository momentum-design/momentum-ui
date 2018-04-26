import React from 'react';
import PropTypes from 'prop-types';
import Label from '@collab-ui/react/Label';

/**
 * @category controls
 * @component checkbox
 * @variations collab-ui-react
 */

const Checkbox = props => {
  const {
    disabled,
    required,
    checked,
    name,
    label,
    value,
    inputRef,
    htmlId,
    onChange,
    children,
    indeterminate,
    className,
    nestedLevel,
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
        className={
          `cui-input cui-checkbox__input` +
          `${(indeterminate && ' indeterminate') || ''}`
        }
        type="checkbox"
        ref={inputRef}
        disabled={disabled}
        aria-checked={checked}
        checked={checked}
        required={required}
        name={name}
        value={value}
        id={htmlId}
        onChange={onChange}
        tabIndex={0}
        {...otherProps}
      />
      <Label className="cui-checkbox__label" label={label} htmlFor={htmlId} />
      {children}
    </div>
  );
};

Checkbox.propTypes = {
  /**
   * optional nextLevel prop type
   */
  nestedLevel: PropTypes.number,
  /**
   * optional className prop type
   */
  className: PropTypes.string,
  /**
   * optional indeterminate prop type
   */
  indeterminate: PropTypes.bool,
  /**
   * optional disabled prop type
   */
  disabled: PropTypes.bool,
  /**
   * optional required prop type
   */
  required: PropTypes.bool,
  /**
   * optional checked prop type
   */
  checked: PropTypes.bool,
  /**
   * optional name prop type
   */
  name: PropTypes.string,
  /**
   * optional label prop type
   */
  label: PropTypes.string.isRequired,
  /**
   * optional value prop type
   */
  value: PropTypes.string,
  /**
   * optional ref prop type
   */
  inputRef: PropTypes.func,
  /**
   * Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing.
   */
  htmlId: PropTypes.string.isRequired,
  /**
   * optional onChange prop type
   */
  onChange: PropTypes.func,
  /**
   * Child component to display next to the input
   */
  children: PropTypes.node,
};

Checkbox.defaultProps = {
  nestedLevel: 0,
  className: '',
  indeterminate: false,
  disabled: false,
  required: false,
  autoFocus: false,
  checked: false,
  name: '',
  value: '',
  label: '',
  inputRef: null,
  onChange: null,
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;

/**
* @name Default Checkbox Group
*
* @category controls
* @component checkbox
* @section default
*
* @js

import { CheckboxGroup, InputHelper } from '@collab-ui/react';

export default function DefaultCheckboxGroup() {

  return (
    <CheckboxGroup name='CheckboxGroup1'>
      <Checkbox
        value='me'
        label='me'
        htmlId='testCheckbox1'
        onChange={()=>{}}
      />
      <Checkbox
        value='you'
        label='you'
        htmlId='testCheckbox2'
        onChange={()=>{}}
      />
      <Checkbox
        value='us'
        label='us'
        htmlId='testCheckbox3'
        onChange={()=>{}}
      >
        <InputHelper message={'I\'m here to help'} className='cui-checkbox-help' />
      </Checkbox>
    </CheckboxGroup>
  );
}

**/

/**
* @name Indeterminate Checkbox
* @description Checkboxes can be marked as indeterminate by passing in the indeterminate prop.
*
* @category controls
* @component checkbox
* @section indeterminate
*
* @js

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
* @name Disabled Checkbox
* @description Checkboxes can be disabled by passing in the disabled prop.
*
* @category controls
* @component checkbox
* @section disabled
*
* @js

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
* @name Checked Checkbox
* @description Checkboxes can be checked be passing in the checked prop.
*
* @category controls
* @component checkbox
* @section checked
*
* @js

export default function CheckboxChecked() {
  return (
    <Checkbox
      value='checked'
      label='Checked Checkbox'
      htmlId='checkedCheckbox'
      checked
      onChange={()=>{}}
    />
  );
}
**/

/**
* @name Nested Checkboxes
* @description The level of nesting checkboxes is controlled by the nestedLevel prop.  You can have up to 3 nested levels.  Ex. nestedLevel={1} nestedLevel={2} nestedLevel=[3} etc.
*
* @category controls
* @component checkbox
* @section nested
*
* @js

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
