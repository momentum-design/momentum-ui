import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@collab-ui/react';

/**
 * @category controls
 * @component radio
 * @variations collab-ui-react
 */

const Radio = props => {
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
    className,
    nestedLevel,
  } = props;

  return (
    <div
      className={
        'cui-input-group cui-radio' +
        `${(nestedLevel && ` cui-input--nested-${nestedLevel}`) || ''}` +
        ` ${className}`
      }
    >
      <input
        className={'cui-input cui-radio__input'}
        type="radio"
        ref={inputRef}
        disabled={disabled}
        checked={checked}
        required={required}
        name={name}
        value={value}
        id={htmlId}
        onChange={onChange}
        tabIndex={0}
      />
      <Label className='cui-radio__label' label={label} htmlFor={htmlId} />
      {children}
    </div>
  );
};

Radio.propTypes = {
  /** @prop Boolean for whether the Radio button is checked | false */
  checked: PropTypes.bool,
  /** @prop Children nodes to render insdie Radio component | null */
  children: PropTypes.node,
  /** @prop Optional CSS class name | '' */
  className: PropTypes.string,
  /** @prop Sets the attribute disabled to the Radio | false */
  disabled: PropTypes.bool,
  /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  htmlId: PropTypes.string.isRequired,
  /** @prop Optional ref attribute for Radio input element | null */
  inputRef: PropTypes.func,
  /** @prop Radio label text | '' */
  label: PropTypes.string,
  /** @prop Radio name string | '' */
  name: PropTypes.string,
  /** @prop Set the level of nested Radios | 0 */
  nestedLevel: PropTypes.number,
  /** @prop Callback function invoked when user makes a change with the Radio button | null */
  onChange: PropTypes.func,
  /** @prop Requires the user to populate the Radio input | false */
  required: PropTypes.bool,
  /** @prop String value that corresponds with Radio button | '' */
  value: PropTypes.string,
};

Radio.defaultProps = {
  checked: false,
  children: null,
  className: '',
  disabled: false,
  inputRef: null,
  label: '',
  name: '',
  nestedLevel: 0,
  onChange: () => {},
  required: false,
  value: '',
};

Radio.displayName = 'Radio';

export default Radio;

/**
* @component radio
* @section default
* @react

import {
  InputHelper,
  Radio,
  RadioGroup,
} from '@collab-ui/react';

export default class DefaultRadio extends React.Component {
  render() {
    return (
      <Radio
        value='test'
        label='test'
        htmlId='testCheckbox1'
        onChange={()=>{}}
        inputRef={ref=>this.input=ref}
      />
    )
  }
}

**/

/**
* @component radio
* @section disabled
* @react
import { Radio } from '@collab-ui/react';

export default function DisabledRadio() {
  return (
    <Radio
      value='disabledRadio'
      label='Disabled Radio'
      htmlId='disabledRadio'
      disabled
      onChange={()=>{}}
    />
  );
}
**/


/**
* @component radio
* @section nested
* @react
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
**/

/**
* @component radio
* @section group
* @react

import {
  InputHelper,
  Radio,
  RadioGroup,
} from '@collab-ui/react';

export default class DefaultRadio extends React.Component {
  render() {
    return (
      <RadioGroup>
        <Radio
          value='me'
          label='me'
          htmlId='testCheckbox1'
          onChange={()=>{}}
          inputRef={ref=>this.input=ref}
        />
        <Radio
          value='you'
          label='you'
          htmlId='testCheckbox2'
          onChange={()=>{}}
        />
        <Radio
          value='us'
          label='us'
          htmlId='testCheckbox3'
          onChange={()=>{}}
        />
      </RadioGroup>
    )
  }
}
**/
